package org.example.delasursa.service;

import org.example.delasursa.common.dto.pachet.CreatePachetRequest;
import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.UpdatePachetRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PachetService {

    public Page<PachetDTO> getAll(Pageable pageable);
    public Page<PachetDTO> getAllForProducator(Integer producatorId,Pageable pageable);

    PachetDTO create(CreatePachetRequest request);

    PachetDTO update(Integer id, UpdatePachetRequest request);

    void delete(Integer id);
}
