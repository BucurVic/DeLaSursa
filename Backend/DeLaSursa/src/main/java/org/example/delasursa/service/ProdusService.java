package org.example.delasursa.service;
import org.example.delasursa.common.dto.produs.ProdusGenericSummary;

import java.util.List;

public interface ProdusService {
    List<String> getAllCategorie();

    List<ProdusGenericSummary> getAllByCategorie(String categorie);

    List<ProdusGenericSummary> getALl();
}
