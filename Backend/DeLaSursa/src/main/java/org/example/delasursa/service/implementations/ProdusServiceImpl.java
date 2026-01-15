package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.produs.ProdusDTO;
import org.example.delasursa.common.dto.produs.ProdusGenericSummary;
import org.example.delasursa.common.mappers.ProdusMapper;
import org.example.delasursa.model.ProdusProducator; // <--- Importam entitatea corecta
import org.example.delasursa.repository.ProdusProducatorRepository; // <--- Repo-ul corect
import org.example.delasursa.repository.ProdusRepository;
import org.example.delasursa.service.ProdusService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdusServiceImpl implements ProdusService {

    private final ProdusRepository produsRepository;
    private final ProdusProducatorRepository produsProducatorRepository; // <--- Injectam asta
    private final ProdusMapper produsMapper;

    @Override
    public List<String> getAllCategorie() {
        return produsRepository.findDistinctCategorieOrdered();
    }

    @Override
    public List<ProdusGenericSummary> getAllByCategorie(String categorie) {
        return produsRepository.findSummaryByCategorie(categorie);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProdusDTO> getAllByProducator(Integer id, Pageable pageable) {
        Page<ProdusProducator> stocPage = produsProducatorRepository.findAllByProducator_Id(id, pageable);
        return stocPage.map(produsMapper::toDTO);
    }

    @Override
    public List<ProdusGenericSummary> getALl() {
        return produsRepository.findAllSummary();
    }
}