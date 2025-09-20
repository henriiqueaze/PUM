package com.PUM.transfer.response;

import java.time.Instant;

public record ApiResponseBody<T>(int status, String message, T data, Instant timestamp) {
    public ApiResponseBody(int status, String message, T data) {
        this(status, message, data, Instant.now());
    }
}
