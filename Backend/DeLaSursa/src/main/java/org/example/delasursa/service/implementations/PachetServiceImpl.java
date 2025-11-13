package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.service.PachetService;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PachetRepository;

@Service
@RequiredArgsConstructor
public class PachetServiceImpl implements PachetService {

    private final PachetRepository pachetRepository;
}
