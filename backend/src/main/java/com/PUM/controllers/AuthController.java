package com.PUM.controllers;

import com.PUM.services.AuthService;
import com.PUM.transfer.DTOs.TokenDTO;
import com.PUM.transfer.DTOs.UserCredentialsDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Endpoints for authentication and token refresh")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping(value = "/signIn")
    @Operation(
            summary = "Sign in",
            description = "Authenticate user and return access and refresh tokens.",
            tags = {"Authentication"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = TokenDTO.class))),
                    @ApiResponse(description = "Forbidden", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    public ResponseEntity<?> signIn(@RequestBody UserCredentialsDTO credentials) {
        if (validateCredentials(credentials)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request");

        var token = service.signIn(credentials);
        if (token == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request");

        return ResponseEntity.ok().body(token);
    }

    @PutMapping(value = "/refresh/{userName}")
    @Operation(
            summary = "Refresh token",
            description = "Refresh access token using a refresh token provided in the Authorization header (Bearer <refreshToken>).",
            tags = {"Authentication"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = TokenDTO.class))),
                    @ApiResponse(description = "Forbidden", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    public ResponseEntity<?> signIn(@PathVariable String userName, @RequestHeader("Authorization") String refreshToken) {
        if (validateFields(userName, refreshToken)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request");

        var token = service.refreshToken(userName, refreshToken);
        if (token == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request");

        return ResponseEntity.ok().body(token);
    }

    private boolean validateFields(String userName, String refreshToken) {
        return StringUtils.isBlank(userName) || StringUtils.isBlank(refreshToken);
    }

    private boolean validateCredentials(UserCredentialsDTO credentials) {
        return credentials == null || StringUtils.isBlank(credentials.getPassword()) || StringUtils.isBlank(credentials.getUserName());
    }
}
