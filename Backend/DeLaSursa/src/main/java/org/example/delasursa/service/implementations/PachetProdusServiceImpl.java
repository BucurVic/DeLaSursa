package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PachetProdusRepository;

@Service
public class PachetProdusServiceImpl {

    private final PachetProdusRepository pachetProdusRepository;

    public PachetProdusServiceImpl(PachetProdusRepository pachetProdusRepository) {
        this.pachetProdusRepository = pachetProdusRepository;
    }
}
