package org.example.delasursa.service;

import org.example.delasursa.common.dto.comanda.ComandaDto;
import org.example.delasursa.common.dto.comanda.CreateComandaRequest;
import org.example.delasursa.common.dto.comanda.CreateComandaResponse;

import java.util.List;

public interface ComandaService {
    CreateComandaResponse createComanda(CreateComandaRequest request);
    List<ComandaDto> getAllComandsByUserId(Integer userId);
    List<ComandaDto> getAllCommandsByProducatorId(Integer id);
    Integer getTotalComenziUltimulAn();
    Double getVenitTotal();
    List<ComandaDto> getComenziIstoric(String email);
}
