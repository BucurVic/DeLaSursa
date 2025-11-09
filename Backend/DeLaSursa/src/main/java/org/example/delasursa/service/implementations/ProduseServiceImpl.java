package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.mappers.ProdusMapper;
import org.example.delasursa.model.Produs;
import org.example.delasursa.repository.ProdusProducatorRepository;
import org.example.delasursa.service.ProduseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProduseServiceImpl implements ProduseService {

    private final ProdusProducatorRepository produsProducatorRepository;
    private final ProdusRepository produsRepository;
    private final ProductAuthorizationService productAuthorizationService;



    @Override
    public List<ProdusDTO> getAll() {
        return produsProducatorRepository.findAll()
                .stream()
                .map(ProdusMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProdusDTO> getAll(Pageable pageable){
        return produsProducatorRepository
                .findAll(pageable)
                .map(ProdusMapper::toDTO);
    }

    @Override
    public List<ProdusDTO> getRandom(Integer count) {
        return produsProducatorRepository.findRandom(count)
                .stream()
                .map(ProdusMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProdusDTO getOne(Integer id) {
        return produsProducatorRepository.findById(id)
                .map(ProdusMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + id + " nu a fost gasit!"));
    }

    @Override
    @Transactional
    public Produs add(Produs produs) {
        try{
            return produsRepository.save(produs);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la adaugarea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Produs update(Integer id, Produs produs) {
        productAuthorizationService.authorizeProdusOwnership(id);

        Produs existing = produsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + id + " nu a fost gasit!"));
        try{
            existing.setNume(produs.getNume());
            existing.setCategorie(produs.getCategorie());

            return produsRepository.save(existing);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la actualizarea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        productAuthorizationService.authorizeProdusOwnership(id);

        Produs existing = produsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + id + " nu a fost gasit!"));;
        try{
            produsRepository.delete(existing);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la stergerea produsului. " + e.getMessage());
        }
    }
}
