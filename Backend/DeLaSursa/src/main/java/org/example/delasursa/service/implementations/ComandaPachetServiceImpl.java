package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.service.ComandaPachetService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaPachetRepository;

@Service
@RequiredArgsConstructor
public class ComandaPachetServiceImpl implements ComandaPachetService {

    private final ComandaPachetRepository comandaPachetRepository;
}
