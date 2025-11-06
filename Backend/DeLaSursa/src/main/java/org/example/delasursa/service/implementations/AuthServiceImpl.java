package org.example.delasursa.service.implementations;

import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.LoginRequest;
import org.example.delasursa.common.dto.LoginResponse;
import org.example.delasursa.common.dto.SignupRequest;
import org.example.delasursa.common.dto.SignupResponse;
import org.example.delasursa.common.exceptions.UserAlreadyExistsException;
import org.example.delasursa.common.exceptions.UserSaveFailedException;
import org.example.delasursa.jwt.JwtTokenProvider;
import org.example.delasursa.model.Role;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.UserRepository;
import org.example.delasursa.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        log.info("Log in request received: {}", loginRequest);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        log.info("Generated token: {}", token);
        return new LoginResponse(token);
    }


    private void checkUserExists(String email) throws UserAlreadyExistsException {
        if(userRepository.findByEmail(email).isPresent()
        ){
            log.warn("User with email {}  already exists in DB", email);
            throw new UserAlreadyExistsException("User with email "+
                    email + " already exists in DB", HttpStatus.CONFLICT);        }
    }

    @Override
    public SignupResponse signup(SignupRequest signupRequest) {

        log.info("Signup request received: {}", signupRequest);

        checkUserExists(signupRequest.getEmail());

        User user = User.builder()
                .email(signupRequest.getEmail())
                .username(signupRequest.getUsername())
                .parola(signupRequest.getPassword())
                .role(new HashSet<>())
                .build();
        String password = user.getParola();
        user.setParola(passwordEncoder.encode(password));
        Set<Role> roles = new HashSet<Role>();
        user.setRole(roles);
        user =  Optional.ofNullable(userRepository.save(user)).orElseThrow(() ->{
            log.error("An unexpected error occurred while saving user");
            return new UserSaveFailedException("An unexpected error occurred while saving user", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        log.info("User {} saved successfully", user.getEmail());
        LoginRequest loginRequest = new LoginRequest(signupRequest.getUsername(), signupRequest.getPassword());
        LoginResponse loginResponse = login(loginRequest);
        SignupResponse signupResponse = new SignupResponse(loginResponse.getToken());
        return signupResponse;

    }
}
