package org.example.delasursa.service;

import org.example.delasursa.common.dto.admin.UserDTO;
import org.example.delasursa.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    Integer countUsersNotAdmin();
    Page<UserDTO> getAllUsers(Pageable pageable);
}
