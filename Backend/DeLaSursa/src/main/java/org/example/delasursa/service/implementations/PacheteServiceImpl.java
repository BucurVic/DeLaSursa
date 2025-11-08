package org.example.delasursa.service.implementations;

import org.example.delasursa.service.PacheteService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PachetRepository;

@Service
public class PacheteServiceImpl implements PacheteService {

    private final PachetRepository pachetRepository;

    public PacheteServiceImpl(PachetRepository pachetRepository) {
        this.pachetRepository = pachetRepository;
    }
}
