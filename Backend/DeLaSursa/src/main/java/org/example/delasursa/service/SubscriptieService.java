package org.example.delasursa.service;

import org.example.delasursa.common.dto.subscriptie.CreateSubscriptieRequest;
import org.example.delasursa.common.dto.subscriptie.SubscriptieDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscriptieService {

    Page<SubscriptieDTO> getAll(Pageable pageable);

    SubscriptieDTO getById(Integer id);

    SubscriptieDTO create(CreateSubscriptieRequest request);

    SubscriptieDTO update(Integer id, SubscriptieDTO request);

    void delete(Integer id);

    void cancel(Integer id);

    Page<SubscriptieDTO> getAllForClient(Integer clientId, Pageable pageable);
    Page<SubscriptieDTO> getAllForProducator(Integer producatorId, Pageable pageable);
    Page<SubscriptieDTO> getAllForPachet(Integer pachetId, Pageable pageable);
}