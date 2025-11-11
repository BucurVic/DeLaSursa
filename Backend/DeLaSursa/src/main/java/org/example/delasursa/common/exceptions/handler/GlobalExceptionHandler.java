package org.example.delasursa.common.exceptions.handler;

import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.exceptions.ImageStorageException;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.exceptions.UserException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleValidationExceptions(ConstraintViolationException e) {
        log.error("Validation failed: {}", e.getMessage());
        return ResponseEntity.badRequest().body("Invalid parameters: " + e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException e) {
        log.error("Validation failed: {}", e.getMessage());
        return ResponseEntity.badRequest().body("Invalid parameters: " + e.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String>  handleValidationExceptions(BadCredentialsException e) {
        log.error("Log in failed: {}", e.getMessage());
        return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("Invalid argument: {}", e.getMessage());
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AuthorizationDeniedException e) {
        log.warn("Access denied: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to access this resource.");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralExceptions(Exception e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<String> handleUserException(UserException e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<String> handleSignatureException(SignatureException e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity.status(401).body("Invalid or expired authentication token. Please log in again.");
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity.status(404).body("Resource not found: " + e.getMessage());
    }

    @ExceptionHandler(OperationFailedException.class)
    public ResponseEntity<String> handleOperationFailedException(OperationFailedException e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity.status(500).body("Operation failed: " + e.getMessage());
    }

    @ExceptionHandler(ImageStorageException.class)
    public ResponseEntity<String> handleImageStorageException(ImageStorageException e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity.status(500).body("Image storage error: " + e.getMessage());
    }
}