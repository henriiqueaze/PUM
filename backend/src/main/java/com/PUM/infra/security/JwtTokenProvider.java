package com.PUM.infra.security;


import com.PUM.exceptions.InvalidJWTAuthenticationException;
import com.PUM.transfer.DTOs.TokenDTO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class JwtTokenProvider {

    @Value("${security.jwt.token.secret-key: 53cr37}")
    private String secretKey;

    @Value("${security.jwt.token.expiration-length: 3600000}")
    private long durationInMilliseconds;

    @Autowired
    private UserDetailsService userDetailsService;

    Algorithm algorithm = null;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        algorithm = Algorithm.HMAC256(secretKey.getBytes());
    }

    public TokenDTO createAccessToken(String userName, List<String> roles) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + durationInMilliseconds);
        String accessToken = getAccessToken(userName, roles, now, validity);
        String refreshToken = getRefreshToken(userName, roles, now);;
        return new TokenDTO(userName, true, now, validity, accessToken, refreshToken);
    }

    public TokenDTO refreshToken(String refreshToken) {
        var token = "";

        if (StringUtils.isNotBlank(refreshToken) && refreshToken.startsWith("Bearer ")) token = refreshToken.substring("Bearer ".length());

        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);

        String userName = decodedJWT.getSubject();
        List<String> roles = decodedJWT.getClaim("roles").asList(String.class);
        return createAccessToken(userName, roles);
    }

    private String getAccessToken(String userName, List<String> roles, Date now, Date validity) {
        String issuerURL = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        return JWT.create()
                .withSubject(userName)
                .withClaim("roles", roles)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withIssuer(issuerURL)
                .sign(algorithm);
    }

    private String getRefreshToken(String userName, List<String> roles, Date now) {
        String issuerURL = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        Date refreshTokenValidity = new Date(now.getTime() + (durationInMilliseconds * 3));
        return JWT.create()
                .withSubject(userName)
                .withClaim("roles", roles)
                .withIssuedAt(now)
                .withExpiresAt(refreshTokenValidity)
                .withIssuer(issuerURL)
                .sign(algorithm);
    }

    public Authentication getAuthentication(String token) {
        DecodedJWT decodedJWT = decodeToken(token);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private DecodedJWT decodeToken(String token) {
        Algorithm alg = Algorithm.HMAC256(secretKey.getBytes());
        JWTVerifier verifier = JWT.require(alg).build();
        return verifier.verify(token);
    }

    public String resolveToken(HttpServletRequest request) {
        var bearerToken = request.getHeader("Authorization");

        if (StringUtils.isNotBlank(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring("Bearer ".length());
        }

        return null;
    }

    public boolean validateToken(String token) {
        DecodedJWT decodedJWT = decodeToken(token);
        try {
            if (decodedJWT.getExpiresAt().before(new Date())) {
                return false;
            }

            return true;
        }

        catch (Exception e) {
            throw new InvalidJWTAuthenticationException("Invalid or Expired JWT Token");
        }

    }
}
