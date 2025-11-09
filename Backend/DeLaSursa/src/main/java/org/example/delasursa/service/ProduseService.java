package org.example.delasursa.service;

import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.model.Produs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProduseService {
    List<ProdusDTO> getAll();
    Page<ProdusDTO> getAll(Pageable pageable);
    List<ProdusDTO> getRandom(Integer count);
    ProdusDTO getOne(Integer id);
    Produs add(Produs produs);
    Produs update(Integer id, Produs produs);
    void delete(Integer id);
}
