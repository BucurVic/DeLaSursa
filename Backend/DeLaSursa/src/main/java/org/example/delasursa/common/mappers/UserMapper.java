package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.admin.UserDTO;
import org.example.delasursa.common.dto.admin.UserDetailsDTO;
import org.example.delasursa.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

    @Value("${app.base.url}")
    private String baseUrl;

    public UserDTO toDTO(User user, List<String> roles, UserDetailsDTO userDetailsDTO) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .roles(roles)
                .avatar(
                        user.getAvatar() != null
                        ? baseUrl + user.getAvatar()
                        : null
                )
                .status(true)
                .userDetails(userDetailsDTO)
                .registrationDate(user.getDataInregistrare())
                .build();

    }
}
