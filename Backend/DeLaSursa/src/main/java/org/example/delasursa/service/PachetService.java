package org.example.delasursa.service;

import org.example.delasursa.common.dto.pachet.CreatePachetRequest;
import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.UpdatePachetRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PachetService {
    Page<PachetDTO> getAll(Pageable pageable);
    Page<PachetDTO> getAllForProducator(Integer producatorId, Pageable pageable);
    PachetDTO getById(Integer id);
    PachetDTO create(PachetDTO request);
    PachetDTO update(Integer id, PachetDTO request);

    void delete(Integer id);
}
