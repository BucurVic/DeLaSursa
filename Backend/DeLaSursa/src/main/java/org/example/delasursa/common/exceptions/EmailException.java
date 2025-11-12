package org.example.delasursa.common.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class EmailException extends RuntimeException {

    private final HttpStatus httpStatus;

    public EmailException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }



}
