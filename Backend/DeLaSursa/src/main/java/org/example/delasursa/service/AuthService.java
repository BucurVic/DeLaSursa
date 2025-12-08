package org.example.delasursa.service;

import org.example.delasursa.common.dto.auth.*;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    SignupResponse signup(SignupRequest signupRequest);
    void resetPassword(PasswordRessetRequest email);
}