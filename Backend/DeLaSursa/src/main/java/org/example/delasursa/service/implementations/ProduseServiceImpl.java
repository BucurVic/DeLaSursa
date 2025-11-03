package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProduseRepository;

@Service
public class ProduseServiceImpl {

    private final ProduseRepository produseRepository;

    public ProduseServiceImpl(ProduseRepository produseRepository) {
        this.produseRepository = produseRepository;
    }
}
