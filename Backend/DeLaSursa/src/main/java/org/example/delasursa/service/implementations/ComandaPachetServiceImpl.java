package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ComandaPachetService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaPachetRepository;

@Service
public class ComandaPachetServiceImpl implements ComandaPachetService {

    private final ComandaPachetRepository comandaPachetRepository;

    public ComandaPachetServiceImpl(ComandaPachetRepository comandaPachetRepository) {
        this.comandaPachetRepository = comandaPachetRepository;
    }
}
