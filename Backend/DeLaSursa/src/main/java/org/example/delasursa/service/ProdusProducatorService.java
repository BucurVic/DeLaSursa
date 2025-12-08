package org.example.delasursa.service;

import org.example.delasursa.common.dto.produs.CreateProdusRequest;
import org.example.delasursa.common.dto.produs.ProdusDTO;
import org.example.delasursa.common.dto.produs.UpdateProdusRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProdusProducatorService {
    List<ProdusDTO> getAll();
    Page<ProdusDTO> getAll(Pageable pageable);
    List<ProdusDTO> getRandom(Integer count);
    Page<ProdusDTO> getFiltered(String categorie, String regiune,
                                Double pretMin, Double pretMax,
                                Boolean doarDisponibile,Pageable pageable);
    List<ProdusDTO> getAllProducator();
    ProdusDTO getOne(Integer id);
    ProdusDTO add(CreateProdusRequest request);
    ProdusDTO update(Integer id, UpdateProdusRequest request);
    void delete(Integer id);
}
