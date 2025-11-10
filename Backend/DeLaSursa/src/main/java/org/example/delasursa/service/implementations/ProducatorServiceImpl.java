package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.service.ProducatorService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProducatorRepository;

@Service
@RequiredArgsConstructor
public class ProducatorServiceImpl implements ProducatorService {

    private final ProducatorRepository producatorRepository;

}
