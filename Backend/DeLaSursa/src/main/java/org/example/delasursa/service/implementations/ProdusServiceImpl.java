package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.produs.ProdusGenericSummary;
import org.example.delasursa.service.ProdusService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdusServiceImpl implements ProdusService {

    private final ProdusRepository produsRepository;

    @Override
    public List<String> getAllCategorie() {
        return produsRepository.findDistinctCategorieOrdered();
    }

    @Override
    public List<ProdusGenericSummary> getAllByCategorie(String categorie) {
        return produsRepository.findSummaryByCategorie(categorie);
    }

    @Override
    public List<ProdusGenericSummary> getALl() {
        return produsRepository.findAllSummary();
    }
}
