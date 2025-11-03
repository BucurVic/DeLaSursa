package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaPachetRepository;

@Service
public class ComandaPachetServiceImpl {

    private final ComandaPachetRepository comandaPachetRepository;

    public ComandaPachetServiceImpl(ComandaPachetRepository comandaPachetRepository) {
        this.comandaPachetRepository = comandaPachetRepository;
    }
}
