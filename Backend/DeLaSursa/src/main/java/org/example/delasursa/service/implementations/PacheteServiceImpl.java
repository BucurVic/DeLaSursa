package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PacheteRepository;

@Service
public class PacheteServiceImpl {

    private final PacheteRepository pacheteRepository;

    public PacheteServiceImpl(PacheteRepository pacheteRepository) {
        this.pacheteRepository = pacheteRepository;
    }
}
