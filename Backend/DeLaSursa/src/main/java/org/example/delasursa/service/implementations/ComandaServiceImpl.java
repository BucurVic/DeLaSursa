package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.repository.ComandaProdusRepository;
import org.example.delasursa.service.ComandaService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ComandaRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ComandaServiceImpl implements ComandaService {

    private final ComandaRepository comenziRepository;
    private final ComandaProdusRepository comandaProdusRepository;


    @Override
    public Integer getTotalComenziUltimulAn() {
        return comenziRepository.countByDataEfectuariiAfter(LocalDate.now().minusYears(1));
    }

    @Override
    public Double getVenitTotal() {
        return comandaProdusRepository.getVenitTotal();
    }
}
