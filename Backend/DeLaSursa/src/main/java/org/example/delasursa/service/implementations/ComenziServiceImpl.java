package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ComenziService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaRepository;

@Service
public class ComenziServiceImpl implements ComenziService {

    private final ComandaRepository comenziRepository;

    public ComenziServiceImpl(ComandaRepository comenziRepository) {
        this.comenziRepository = comenziRepository;
    }
}
