package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaProdusRepository;

@Service
public class ComandaProdusService {

    private final ComandaProdusRepository comandaProdusRepository;

    public ComandaProdusService(ComandaProdusRepository comandaProdusRepository) {
        this.comandaProdusRepository = comandaProdusRepository;
    }
}
