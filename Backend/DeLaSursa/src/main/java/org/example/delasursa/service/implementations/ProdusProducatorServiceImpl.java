package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusProducatorRepository;

@Service
public class ProdusProducatorServiceImpl {

    private final ProdusProducatorRepository produsProducatorRepository;

    public ProdusProducatorServiceImpl(ProdusProducatorRepository produsProducatorRepository) {
        this.produsProducatorRepository = produsProducatorRepository;
    }
}
