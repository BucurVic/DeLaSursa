package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.admin.UserDTO;
import org.example.delasursa.common.dto.admin.UserDetailsDTO;
import org.example.delasursa.common.mappers.UserMapper;
import org.example.delasursa.model.Role;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.AdminRepository;
import org.example.delasursa.repository.ClientRepository;
import org.example.delasursa.repository.ProducatorRepository;
import org.example.delasursa.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.UserRepository;


import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final ProducatorRepository producatorRepository;
    private final AdminRepository adminRepository;
    private final UserMapper userMapper;

    @Override
    public Integer countUsersNotAdmin() {
        return userRepository.countUsersNotAdmin();
    }

    @Override
    public Page<UserDTO> getAllUsers(Pageable pageable) {

        Page<User> usersPage = userRepository.findAll(pageable);

        return usersPage.map(user -> {
                    List<String> roles = user.getRole()
                            .stream()
                            .map(Role::getName)
                            .toList();

                    UserDetailsDTO userDetailsDTO = extractDetails(user.getId(),roles);

                    return userMapper.toDTO(user,roles,userDetailsDTO);
                });
    }

    private UserDetailsDTO extractDetails(Integer userId, List<String> roles) {

        if(roles.contains("client")) {
            return clientRepository.findById(userId)
                    .map(c -> UserDetailsDTO.builder()
                            .nume(c.getNume())
                            .prenume(c.getPrenume())
                            .build())
                    .orElse(null);
        }

        if(roles.contains("producator")){
            return producatorRepository.findById(userId)
                    .map(p -> UserDetailsDTO.builder()
                            .nume(p.getNume())
                            .prenume(p.getPrenume())
                            .build())
                    .orElse(null);
        }

        if(roles.contains("admin")){
            return adminRepository.findById(userId)
                    .map(a -> UserDetailsDTO.builder()
                            .nume(a.getNume())
                            .prenume(a.getPrenume())
                            .build())
                    .orElse(null);
        }

        return null;
    }
}
