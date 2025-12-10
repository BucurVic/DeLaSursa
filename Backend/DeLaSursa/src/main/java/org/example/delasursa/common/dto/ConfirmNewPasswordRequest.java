package org.example.delasursa.common.dto;

import lombok.Data;

@Data
public class ConfirmNewPasswordRequest {
    private String token;
    private String password;
}
