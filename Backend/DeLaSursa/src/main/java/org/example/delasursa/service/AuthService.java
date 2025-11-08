package org.example.delasursa.service;

import org.example.delasursa.common.dto.LoginRequest;
import org.example.delasursa.common.dto.LoginResponse;
import org.example.delasursa.common.dto.SignupRequest;
import org.example.delasursa.common.dto.SignupResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    SignupResponse signup(SignupRequest signupRequest);
}