package org.example.delasursa.service;

import org.example.delasursa.common.dto.DailyIncomeDto;
import org.example.delasursa.common.dto.admin.ComandaSummary;
import org.example.delasursa.common.dto.comanda.ComandaDto;
import org.example.delasursa.common.dto.comanda.CreateComandaRequest;
import org.example.delasursa.common.dto.comanda.CreateComandaResponse;
import org.example.delasursa.common.dto.enums.ComandaStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ComandaService {
    CreateComandaResponse createComanda(CreateComandaRequest request);

    List<ComandaDto> getAllComandsByUserId(Integer userId);

    List<ComandaDto> getAllCommandsByProducatorId(Integer id);

    Integer getTotalComenziUltimulAn();

    Double getTotalComenziForProducatorUltimulAn(Integer id);

    Double getVenitTotal();

    List<ComandaDto> getComenziIstoric(String email);

    Page<ComandaSummary> getAllComenziSummary(Pageable pageable);

    ComandaDto updateStatus(Integer comandaId, ComandaStatus status, Integer prodId);

    List<DailyIncomeDto> getVenitPeZiProducator(Integer id);
}