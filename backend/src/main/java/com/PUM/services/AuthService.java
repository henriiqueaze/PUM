package com.PUM.services;

import com.PUM.infra.repositories.UserRepository;
import com.PUM.infra.security.JwtTokenProvider;
import com.PUM.model.entities.User;
import com.PUM.transfer.DTOs.security.TokenDTO;
import com.PUM.transfer.DTOs.security.UserCredentialsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    public TokenDTO signIn(UserCredentialsDTO credentials) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(credentials.getUserName(), credentials.getPassword())
        );

        var user = repository.findByUserName(credentials.getUserName());
        if (user == null) throw new UsernameNotFoundException("Username not found!");

        return tokenProvider.createAccessToken(credentials.getUserName(), user.getRoles());
    }

    public TokenDTO refreshToken(String userName, String refreshToken) {
        var user = repository.findByUserName(userName);
        if (user == null) throw new UsernameNotFoundException("Username not found!");
        return tokenProvider.refreshToken(refreshToken);
    }

    public UserCredentialsDTO createUser(UserCredentialsDTO user) {
        var entity = new User();

        entity.setFullName(user.getFullName());
        entity.setUserName(user.getUserName());
        entity.setPassword(generateHashedPassword(user.getPassword()));
        entity.setAccountNonExpired(true);
        entity.setAccountNonLocked(true);
        entity.setCredentialsNonExpired(true);
        entity.setEnabled(true);

        var dto = repository.save(entity);
        return new UserCredentialsDTO(dto.getUserName(), dto.getFullName(), dto.getPassword());
    }

    private String generateHashedPassword(String password) {
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        PasswordEncoder pbkdf2Encoder = new Pbkdf2PasswordEncoder("", 8, 185000, Pbkdf2PasswordEncoder.SecretKeyFactoryAlgorithm.PBKDF2WithHmacSHA256);
        encoders.put("pbkdf2", pbkdf2Encoder);
        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("pbkdf2", encoders);

        passwordEncoder.setDefaultPasswordEncoderForMatches(pbkdf2Encoder);
        return passwordEncoder.encode(password);
    }

}
