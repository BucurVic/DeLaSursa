package org.example.delasursa.common.dto.auth;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.AllArgsConstructor;
import org.example.delasursa.model.Role;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SignupRequest {

    private String email;
    private String username;
    private String password;
    private Role role;
}
