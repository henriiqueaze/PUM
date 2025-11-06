package com.PUM.exceptions;

public class MandatoryValuesNotFilledInException extends RuntimeException {
    public MandatoryValuesNotFilledInException(String message) {
        super(message);
    }
}
