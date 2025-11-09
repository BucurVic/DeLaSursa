package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProducatoriRepository;

@Service
public class ProducatoriService {

    private final ProducatoriRepository producatoriRepository;

    public ProducatoriService(ProducatoriRepository producatoriRepository) {
        this.producatoriRepository = producatoriRepository;
    }
}
