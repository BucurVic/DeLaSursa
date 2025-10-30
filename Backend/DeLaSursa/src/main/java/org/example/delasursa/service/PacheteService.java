package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PacheteRepository;

@Service
public class PacheteService {

    private final PacheteRepository pacheteRepository;

    public PacheteService(PacheteRepository pacheteRepository) {
        this.pacheteRepository = pacheteRepository;
    }
}
