package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.UseriRepository;

@Service
public class UseriService {

    private final UseriRepository useriRepository;

    public UseriService(UseriRepository useriRepository) {
        this.useriRepository = useriRepository;
    }
}
