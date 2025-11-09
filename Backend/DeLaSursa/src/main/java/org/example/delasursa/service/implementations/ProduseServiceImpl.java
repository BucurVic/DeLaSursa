package org.example.delasursa.service.implementations;

import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.model.Produse;
import org.example.delasursa.service.ProduseService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProduseServiceImpl implements ProduseService {

    private final ProdusRepository produsRepository;

    public ProduseServiceImpl(ProdusRepository produsRepository) {
        this.produsRepository = produsRepository;
    }

    @Override
    public List<Produse> getALl() {
        return produsRepository.findAll();
    }

    @Override
    public Produse getOne(Integer id) {
        return produsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + id + " nu a fost gasit!"));
    }

    @Override
    public Produse add(Produse produs) {
        try{
            return produsRepository.save(produs);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la adaugarea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Produse update(Integer id, Produse produs) {
        Produse existing = getOne(id);
        try{
            existing.setNume(produs.getNume());
            existing.setCategorie(produs.getCategorie());

            return produsRepository.save(existing);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la actualizarea produsului. " + e.getMessage());
        }
    }

    @Override
    public void delete(Integer id) {
        Produse existing = getOne(id);
        try{
            produsRepository.delete(existing);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la stergerea produsului. " + e.getMessage());
        }
    }
}
