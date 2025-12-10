package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.auth.VerifyEmailResponse;
import org.example.delasursa.common.dto.enums.TokenType;
import org.example.delasursa.common.exceptions.UserNotFoundException;
import org.example.delasursa.common.util.TokenUtil;
import org.example.delasursa.model.Token;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.TokenRepository;
import org.example.delasursa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSenderImpl mailSender;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${mail.confirmation.url}")
    private String mailConfirmationBaseUrl;

    @Value("${mail.reset.password.url}")
    private String mailResetPasswordUrl;

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


    @Transactional
    public VerifyEmailResponse verifyEmail(String token) {

        Token emailToken = tokenRepository.findByToken(token);
        User user = emailToken.getUser();
        if (user == null) {
            log.warn("Verification token {} not found", token);
            throw new UserNotFoundException("The user with the specified verify token does not exist", HttpStatus.NOT_FOUND);
        }
        user.setEmailVerified(true);
        userRepository.save(user);
        tokenRepository.delete(emailToken);
        return new VerifyEmailResponse(true);
    }

    @Async
    public void sendResetPasswordMail(String email) {
        log.info("Attempting to send password reset email to {}", email);

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            log.warn("No user found with email: {}", email);
            return new UserNotFoundException("User with this email does not exist", HttpStatus.NOT_FOUND);
        });

        TokenUtil.TokenPair tokenPair = TokenUtil.generatePasswordResetToken();
        String url = mailResetPasswordUrl + "/" + tokenPair.rawToken();
        Token token = createResetPasswordToken(user, tokenPair.hashedToken());


        SimpleMailMessage message = createGenericMessageToUser(email);
        message.setSubject("DeLaSursa - Password Reset");
        message.setText(
                "Hello, " + user.getUsername() + "!\n\n" +
                        "Your password reset request has been received.\n" +
                        "Here is the link for resetting the password: " + "\n" +
                        url + "\n" +
                        "Please log in and change it as soon as possible.\n\n" +
                        "Best regards,\n" +
                        "DeLaSursa Team"
        );

        this.tokenRepository.save(token);
        this.mailSender.send(message);
        log.info("Password reset email sent to {}", email);
    }

    @Async
    public void sendPasswordChangedMail(String email) {
        log.info("Sending password changed notification to {}", email);

        User user = userRepository.findByEmail(email).orElse(null);

        SimpleMailMessage message = createGenericMessageToUser(email);
        message.setSubject("DeLaSursa - Password Changed");
        String greeting = user != null ? "Hello, " + user.getUsername() + "!\n\n" : "";
        message.setText(
                greeting +
                        "Your password has been changed successfully.\n" +
                        "If you did not perform this change, please contact support immediately or reset your password.\n\n" +
                        "Best regards,\n" +
                        "DeLaSursa Team"
        );

        this.mailSender.send(message);
        log.info("Password changed notification sent to {}", email);
    }

    private Token createResetPasswordToken(User user, String hashedToken) {
        Token token = new Token();
        token.setType(TokenType.RESET_PASSWORD);
        token.setUser(user);
        token.setToken(hashedToken);
        return token;
    }
}
