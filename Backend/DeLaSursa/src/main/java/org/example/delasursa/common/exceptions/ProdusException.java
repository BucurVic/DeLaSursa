package org.example.delasursa.common.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ProdusException extends RuntimeException {

    private final HttpStatus httpStatus;

    public ProdusException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}

