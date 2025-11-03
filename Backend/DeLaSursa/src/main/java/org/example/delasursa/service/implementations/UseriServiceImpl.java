package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.UseriRepository;

@Service
public class UseriServiceImpl {

    private final UseriRepository useriRepository;

    public UseriServiceImpl(UseriRepository useriRepository) {
        this.useriRepository = useriRepository;
    }
}
