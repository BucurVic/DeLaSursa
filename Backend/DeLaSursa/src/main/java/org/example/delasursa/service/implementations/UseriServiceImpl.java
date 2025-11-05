package org.example.delasursa.service.implementations;

import org.example.delasursa.service.UseriService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.UserRepository;

@Service
public class UseriServiceImpl implements UseriService {

    private final UserRepository userRepository;

    public UseriServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
