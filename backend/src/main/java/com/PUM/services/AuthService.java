package com.PUM.services;

import com.PUM.infra.repositories.UserRepository;
import com.PUM.infra.security.JwtTokenProvider;
import com.PUM.transfer.DTOs.TokenDTO;
import com.PUM.transfer.DTOs.UserCredentialsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    public ResponseEntity<TokenDTO> signIn(UserCredentialsDTO credentials) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentials.getUserName(), credentials.getPassword()));

        var user = repository.findByUserName(credentials.getUserName());
        if (user == null) throw new UsernameNotFoundException("Username not found!");

        var token = tokenProvider.createAccessToken(credentials.getUserName(), user.getRoles());
        return ResponseEntity.ok().body(token);
    }

}