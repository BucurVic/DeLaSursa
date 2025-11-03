package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaProdusRepository;

@Service
public class ComandaProdusServiceImpl {

    private final ComandaProdusRepository comandaProdusRepository;

    public ComandaProdusServiceImpl(ComandaProdusRepository comandaProdusRepository) {
        this.comandaProdusRepository = comandaProdusRepository;
    }
}
