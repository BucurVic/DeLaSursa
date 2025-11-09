package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProduseRepository;

@Service
public class ProduseService {

    private final ProduseRepository produseRepository;

    public ProduseService(ProduseRepository produseRepository) {
        this.produseRepository = produseRepository;
    }
}
