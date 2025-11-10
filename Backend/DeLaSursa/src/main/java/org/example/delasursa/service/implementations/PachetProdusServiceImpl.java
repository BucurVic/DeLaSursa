package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.service.PachetProdusService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.PachetProdusRepository;

@Service
@RequiredArgsConstructor
public class PachetProdusServiceImpl implements PachetProdusService {

    private final PachetProdusRepository pachetProdusRepository;
}
