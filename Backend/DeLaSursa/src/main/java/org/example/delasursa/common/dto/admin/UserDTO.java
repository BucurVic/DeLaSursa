package org.example.delasursa.common.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    Integer id;
    String email;
    List<String> roles;
    String avatar;
    Boolean status;
    LocalDate registrationDate;
    UserDetailsDTO userDetails;
}
