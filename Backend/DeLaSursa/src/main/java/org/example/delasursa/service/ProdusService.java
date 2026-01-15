package org.example.delasursa.service;
import org.example.delasursa.common.dto.produs.ProdusDTO;
import org.example.delasursa.common.dto.produs.ProdusGenericSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProdusService {
    List<String> getAllCategorie();

    List<ProdusGenericSummary> getAllByCategorie(String categorie);

    List<ProdusGenericSummary> getALl();

    Page<ProdusDTO> getAllByProducator(Integer id, Pageable pageable);
}
