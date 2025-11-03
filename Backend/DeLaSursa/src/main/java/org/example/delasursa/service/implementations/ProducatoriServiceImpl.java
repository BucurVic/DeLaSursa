package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProducatoriRepository;

@Service
public class ProducatoriServiceImpl {

    private final ProducatoriRepository producatoriRepository;

    public ProducatoriServiceImpl(ProducatoriRepository producatoriRepository) {
        this.producatoriRepository = producatoriRepository;
    }
}
