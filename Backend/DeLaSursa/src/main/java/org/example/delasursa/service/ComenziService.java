package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComenziRepository;

@Service
public class ComenziService {

    private final ComenziRepository comenziRepository;

    public ComenziService(ComenziRepository comenziRepository) {
        this.comenziRepository = comenziRepository;
    }
}
