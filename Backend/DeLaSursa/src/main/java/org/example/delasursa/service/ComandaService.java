package org.example.delasursa.service;

import org.example.delasursa.common.dto.ComandaDto;
import org.example.delasursa.common.dto.CreateComandaRequest;
import org.example.delasursa.common.dto.CreateComandaResponse;

import java.util.List;

public interface ComandaService {
    CreateComandaResponse createComanda(CreateComandaRequest request);
    List<ComandaDto> getAllComandsByUserId(Integer userId);
    List<ComandaDto> getAllCommandsByProducatorId(Integer id);
    Integer getTotalComenziUltimulAn();
    Double getVenitTotal();
}
