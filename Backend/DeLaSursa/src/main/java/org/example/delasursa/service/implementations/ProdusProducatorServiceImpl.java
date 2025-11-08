package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ProdusProducatorService;
import org.example.delasursa.service.ProduseService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusProducatorRepository;

@Service
public class ProdusProducatorServiceImpl implements ProdusProducatorService {

    private final ProdusProducatorRepository produsProducatorRepository;

    public ProdusProducatorServiceImpl(ProdusProducatorRepository produsProducatorRepository) {
        this.produsProducatorRepository = produsProducatorRepository;
    }
}
