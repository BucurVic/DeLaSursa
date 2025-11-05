package org.example.delasursa.service.implementations;

import org.example.delasursa.service.PachetProdusService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PachetProdusRepository;

@Service
public class PachetProdusServiceImpl implements PachetProdusService {

    private final PachetProdusRepository pachetProdusRepository;

    public PachetProdusServiceImpl(PachetProdusRepository pachetProdusRepository) {
        this.pachetProdusRepository = pachetProdusRepository;
    }
}
