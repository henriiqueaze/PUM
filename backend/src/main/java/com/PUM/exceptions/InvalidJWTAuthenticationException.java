package com.PUM.exceptions;

public class InvalidJWTAuthenticationException extends RuntimeException {
    public InvalidJWTAuthenticationException(String message) {
        super(message);
    }
}
