package org.example.delasursa.service;

import org.example.delasursa.common.dto.CreateProdusRequest;
import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.common.dto.UpdateProdusRequest;
import org.example.delasursa.model.Produs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProdusService {
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
