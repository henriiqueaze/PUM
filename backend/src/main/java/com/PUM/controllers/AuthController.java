package com.PUM.controllers;

import com.PUM.services.AuthService;
import com.PUM.transfer.DTOs.security.TokenDTO;
import com.PUM.transfer.response.ApiResponseBody;
import com.PUM.transfer.DTOs.security.UserCredentialsDTO;
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

    @PostMapping("/signIn")
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
    public ResponseEntity<ApiResponseBody<TokenDTO>> signIn(@RequestBody UserCredentialsDTO credentials) {
        if (validateCredentials(credentials)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiResponseBody<>(403, "Invalid client request", null));
        }

        TokenDTO token = service.signIn(credentials);
        // se quiser manter um guard:
        if (token == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiResponseBody<>(403, "Invalid client request", null));
        }

        var response = new ApiResponseBody<>(200, "Success", token);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/refresh/{userName}")
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
    public ResponseEntity<ApiResponseBody<TokenDTO>> refreshToken(
        @PathVariable String userName,
        @RequestHeader("Authorization") String refreshToken
    ) {
        if (validateFields(userName, refreshToken)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiResponseBody<>(403, "Invalid client request", null));
        }

        TokenDTO token = service.refreshToken(userName, refreshToken);
        var response = new ApiResponseBody<>(200, "Success", token);
        return ResponseEntity.ok(response);
    }


    @PostMapping(value = "/createUser")
    @Operation(
            summary = "Create user",
            description = "Create a new user with username and password. Returns the created user credentials (without sensitive data).",
            tags = {"Authentication"},
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User credentials payload",
                    required = true,
                    content = @Content(schema = @Schema(implementation = UserCredentialsDTO.class))
            ),
            responses = {
                    @ApiResponse(description = "Created", responseCode = "201",
                            content = @Content(schema = @Schema(implementation = UserCredentialsDTO.class))),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Conflict", responseCode = "409", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    public ResponseEntity<UserCredentialsDTO> createUser(@RequestBody UserCredentialsDTO credentials) {
        if (validateCredentials(credentials)) return ResponseEntity.badRequest().build();

        var user = service.createUser(credentials);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);

    }

    private boolean validateFields(String userName, String refreshToken) {
        return org.apache.commons.lang3.StringUtils.isBlank(userName)
            || org.apache.commons.lang3.StringUtils.isBlank(refreshToken);
    }

    private boolean validateCredentials(UserCredentialsDTO credentials) {
        return credentials == null
            || org.apache.commons.lang3.StringUtils.isBlank(credentials.getPassword())
            || org.apache.commons.lang3.StringUtils.isBlank(credentials.getUserName());
    }
}
