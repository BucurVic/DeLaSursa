package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComenziRepository;

@Service
public class ComenziServiceImpl {

    private final ComenziRepository comenziRepository;

    public ComenziServiceImpl(ComenziRepository comenziRepository) {
        this.comenziRepository = comenziRepository;
    }
}
