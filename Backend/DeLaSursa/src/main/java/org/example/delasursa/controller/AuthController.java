package org.example.delasursa.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.LoginRequest;
import org.example.delasursa.common.dto.LoginResponse;
import org.example.delasursa.common.dto.SignupRequest;
import org.example.delasursa.common.dto.SignupResponse;
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




    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest){
        log.info("Signup request received : {}", signupRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(signupRequest));
    }

}
