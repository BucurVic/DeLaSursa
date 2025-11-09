package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusProducatorRepository;

@Service
public class ProdusProducatorService {

    private final ProdusProducatorRepository produsProducatorRepository;

    public ProdusProducatorService(ProdusProducatorRepository produsProducatorRepository) {
        this.produsProducatorRepository = produsProducatorRepository;
    }
}
