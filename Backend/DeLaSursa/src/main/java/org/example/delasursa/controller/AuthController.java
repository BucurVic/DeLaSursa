package org.example.delasursa.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.ConfirmNewPasswordRequest;
import org.example.delasursa.common.dto.auth.*;
import org.example.delasursa.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@Validated
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        log.info("Login request received : {}", loginRequest);

        LoginResponse loginResponse = authService.login(loginRequest);
        log.info("Logged in user: {}", loginResponse);

        return ResponseEntity.status(HttpStatus.CREATED).body(loginResponse);
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordRessetRequest request) {
        log.info("Reset password request received : {}", request);
        authService.resetPassword(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Reset password has been sent");
    }

    @PostMapping("/confirm-password")
    public ResponseEntity<String> confirmNewPassword(@RequestBody ConfirmNewPasswordRequest request) {
        log.info("Confirm password request received : {}", request);
        authService.confirmNewPassword(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("New password has been set");
    }

    @PostMapping("/register")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest){
        log.info("Signup request received : {}", signupRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(signupRequest));
    }

}
