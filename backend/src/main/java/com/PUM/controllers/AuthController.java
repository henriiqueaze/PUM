package com.PUM.controllers;

import com.PUM.services.AuthService;
import com.PUM.transfer.DTOs.UserCredentialsDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping(value = "/signIn")
    public ResponseEntity<?> signIn(@RequestBody UserCredentialsDTO credentials) {
        if (validateCredentials(credentials)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request");

        var token = service.signIn(credentials);
        if (token == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request");

        return ResponseEntity.ok().body(token);
    }

    private boolean validateCredentials(UserCredentialsDTO credentials) {
        return credentials == null || StringUtils.isBlank(credentials.getPassword()) || StringUtils.isBlank(credentials.getUserName());
    }
}