package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaPachetRepository;

@Service
public class ComandaPachetService {

    private final ComandaPachetRepository comandaPachetRepository;

    public ComandaPachetService(ComandaPachetRepository comandaPachetRepository) {
        this.comandaPachetRepository = comandaPachetRepository;
    }
}
