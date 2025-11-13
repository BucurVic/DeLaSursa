package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.service.ProdusProducatorService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusProducatorRepository;

@Service
@RequiredArgsConstructor
public class ProdusProducatorServiceImpl implements ProdusProducatorService {

    private final ProdusProducatorRepository produsProducatorRepository;
}
