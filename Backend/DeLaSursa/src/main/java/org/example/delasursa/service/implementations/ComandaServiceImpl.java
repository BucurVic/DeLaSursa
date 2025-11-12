package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.service.ComandaService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaRepository;

@Service
@RequiredArgsConstructor
public class ComandaServiceImpl implements ComandaService {

    private final ComandaRepository comenziRepository;

}
