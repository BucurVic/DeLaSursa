package org.example.delasursa.common.dto.auth;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyEmailResponse {

    private Boolean isVerified;
}
