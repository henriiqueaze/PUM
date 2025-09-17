package com.PUM.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(IdNotFoundException.class)
    private ResponseEntity<RestErrorMessage> idNotFoundHandler(IdNotFoundException exception, HttpServletRequest request) {
        RestErrorMessage threatMessage = new RestErrorMessage(LocalDateTime.now(), HttpStatus.NOT_FOUND, exception.getMessage(), exception.getLocalizedMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(threatMessage);
    }

    @ExceptionHandler(MandatoryValuesNotFilledInException.class)
    private ResponseEntity<RestErrorMessage> mandatoryValuesNotFilledInExceptionHandler(MandatoryValuesNotFilledInException exception, HttpServletRequest request) {
        RestErrorMessage threatMessage = new RestErrorMessage(LocalDateTime.now(), HttpStatus.BAD_REQUEST, exception.getMessage(), exception.getLocalizedMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatMessage);
    }

    @ExceptionHandler(InvalidJWTAuthenticationException.class)
    private ResponseEntity<RestErrorMessage> invalidJwtAuthenticationHandler (InvalidJWTAuthenticationException exception, HttpServletRequest request) {
        RestErrorMessage threatMessage = new RestErrorMessage(LocalDateTime.now(), HttpStatus.FORBIDDEN, "Invalid JWT Authentication", exception.getLocalizedMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatMessage);
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<RestErrorMessage> exceptionHandler (Exception exception, HttpServletRequest request) {
        RestErrorMessage threatMessage = new RestErrorMessage(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage(), exception.getLocalizedMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(threatMessage);
    }
}
