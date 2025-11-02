package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PachetProdusRepository;

@Service
public class PachetProdusService {

    private final PachetProdusRepository pachetProdusRepository;

    public PachetProdusService(PachetProdusRepository pachetProdusRepository) {
        this.pachetProdusRepository = pachetProdusRepository;
    }
}
