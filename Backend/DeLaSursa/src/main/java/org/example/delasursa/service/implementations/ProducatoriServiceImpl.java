package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ProducatoriService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProducatorRepository;

@Service
public class ProducatoriServiceImpl implements ProducatoriService {

    private final ProducatorRepository producatorRepository;

    public ProducatoriServiceImpl(ProducatorRepository producatorRepository) {
        this.producatorRepository = producatorRepository;
    }
}
