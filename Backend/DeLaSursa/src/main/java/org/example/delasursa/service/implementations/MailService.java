package org.example.delasursa.service.implementations;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.VerifyEmailResponse;
import org.example.delasursa.common.exceptions.EmailException;
import org.example.delasursa.common.exceptions.UserNotFoundException;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class MailService {


    private final JavaMailSenderImpl mailSender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.mail.username}")
    private String username;


    @Value("${mail.confirmation.url}")
    private String mailConfirmationBaseUrl;

    public MailService(JavaMailSenderImpl mailSender, UserRepository userRepository,  PasswordEncoder passwordEncoder) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private SimpleMailMessage createGenericMessageToUser(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(this.username);
        message.setTo(to);
        return message;
    }

    @Async
    public void sendMailToConfirm(String to, String verificationToken) {
        log.info("Sending mail to {}", to);
        String url = mailConfirmationBaseUrl + "?token=" + verificationToken;
        log.info("FRONTEND URL: {}", url);
        SimpleMailMessage message = createGenericMessageToUser(to);
        message.setSubject("DeLaSursa - New Account");
        message.setText("Your new account has been created successfully.\n" +
                "Please click on the following link to activate your account: " + url + "\n"+
                "Best regards,\n" +
                "DeLaSursa Team");
        this.mailSender.send(message);
        log.info("Mail sent to {} successfully", to);
    }


    public VerifyEmailResponse verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token);
        if (user == null) {
            log.warn("Verification token {} not found", token);
            throw new UserNotFoundException("The user with the specified verify token does not exist", HttpStatus.NOT_FOUND);
        }
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);
        return new VerifyEmailResponse(true);
    }

    @Async
    public void sendResetPasswordMail(String email) {
        log.info("Attempting to send password reset email to {}", email);

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            log.warn("No user found with email: {}", email);
            return new UserNotFoundException("User with this email does not exist", HttpStatus.NOT_FOUND);
        });


        String newPassword = generateRandomPassword();
        user.setParola(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        SimpleMailMessage message = createGenericMessageToUser(email);
        message.setSubject("DeLaSursa - Password Reset");
        message.setText(
                "Hello, " + user.getUsername() + "!\n\n" +
                        "Your password has been reset successfully.\n" +
                        "Here is your new password: " + newPassword + "\n\n" +
                        "Please log in and change it as soon as possible.\n\n" +
                        "Best regards,\n" +
                        "DeLaSursa Team"
        );

        this.mailSender.send(message);
        log.info("Password reset email sent to {}", email);
        user.setParola(passwordEncoder.encode(newPassword));
    }

    private String generateRandomPassword() {
        int length = 10;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        StringBuilder password = new StringBuilder();
        java.util.Random random = new java.util.Random();

        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }

        return password.toString();
    }


}
