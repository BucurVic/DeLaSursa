package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ProduseService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusRepository;

@Service
public class ProduseServiceImpl implements ProduseService {

    private final ProdusRepository produsRepository;

    public ProduseServiceImpl(ProdusRepository produsRepository) {
        this.produsRepository = produsRepository;
    }
}
