package org.example.delasursa.common.util;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class TokenUtil {

    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRawToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(rawToken.getBytes());
            return Base64.getEncoder().encodeToString(hashed);
        } catch (Exception e) {
            throw new RuntimeException("Could not hash token", e);
        }
    }

    public static TokenPair generatePasswordResetToken() {
        String raw = generateRawToken();
        String hashed = hashToken(raw);
        return new TokenPair(raw, hashed);
    }

    public record TokenPair(String rawToken, String hashedToken) {}
}

