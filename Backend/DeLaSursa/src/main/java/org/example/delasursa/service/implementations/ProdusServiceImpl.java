package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.CreateProdusRequest;
import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.common.dto.UpdateProdusRequest;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.mappers.ProdusMapper;
import org.example.delasursa.model.Producator;
import org.example.delasursa.model.Produs;
import org.example.delasursa.model.ProdusProducator;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.ProdusProducatorRepository;
import org.example.delasursa.repository.UserRepository;
import org.example.delasursa.service.ProdusService;
import org.example.delasursa.specification.ProdusProducatorSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdusServiceImpl implements ProdusService {

    private final ProdusProducatorRepository produsProducatorRepository;
    private final ProdusRepository produsRepository;
    private final ProductAuthorizationService productAuthorizationService;
    private final UserRepository userRepository;


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
    public ProdusDTO add(CreateProdusRequest request) {
        try{
            User user = userRepository.findByUsername(
                    SecurityContextHolder.getContext().getAuthentication().getName()
            ).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

            Producator producator = user.getProducator();

            Produs produs = produsRepository.findByNumeAndCategorie(request.getNume(), request.getCategorie()).orElseGet(
                    () -> {
                        Produs newProdus = new Produs();
                        newProdus.setNume(request.getNume());
                        newProdus.setCategorie(request.getCategorie());
                        return produsRepository.save(newProdus);
                    }
            );

            boolean alreadyLinked = produsProducatorRepository.existsByProdus_IdAndProducator_Id(produs.getId(),produs.getId());

            if (alreadyLinked) {
                throw new OperationFailedException("Producer already sells this product");
            }

            String imagine = ImageStoreService.saveImage(request.getImagine(),producator.getId());

            ProdusProducator join = ProdusProducator.builder()
                    .produs(produs)
                    .producator(producator)
                    .imagine(imagine)
                    .pret(request.getPret())
                    .unitateMasura(request.getUnitateMasura())
                    .cantitate(request.getCantitate())
                    .build();

            produsProducatorRepository.save(join);

            return  ProdusMapper.toDTO(join);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la adaugarea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public ProdusDTO update(Integer id, UpdateProdusRequest request) {

        try{
            ProdusProducator produsProducator = productAuthorizationService.authorizeAndGetProdusOwnership(id);

            produsProducator.setPret(request.getPret());
            produsProducator.setUnitateMasura(request.getUnitateMasura());
            produsProducator.setCantitate(request.getCantiate());

            if(request.getImagine() != null && !request.getImagine().isEmpty()){
                String newImagine = ImageStoreService.replaceImage(
                        request.getImagine(),
                        produsProducator.getImagine(),
                        produsProducator.getId()
                );
                produsProducator.setImagine(newImagine);
            }

            ProdusProducator updated = produsProducatorRepository.save(produsProducator);

            return ProdusMapper.toDTO(updated);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la actualizarea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {

        try{
            ProdusProducator produsProducator = productAuthorizationService.authorizeAndGetProdusOwnership(id);
            ImageStoreService.deleteImage(produsProducator.getImagine());
            produsProducatorRepository.deleteByProdus_IdAndProducator_Id(produsProducator.getProdus().getId(),
                    produsProducator.getProducator().getId());
        } catch (Exception e){
            throw new OperationFailedException("Eroare la stergerea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProdusDTO> getFiltered(String categorie, String regiune, Double pretMin, Double pretMax, Boolean doarDisponibile, Pageable pageable) {
        Specification<ProdusProducator> spec = Specification.allOf(
                ProdusProducatorSpecification.hasCategorie(categorie),
                ProdusProducatorSpecification.hasRegiune(regiune),
                ProdusProducatorSpecification.hasPretBetween(pretMin, pretMax),
                ProdusProducatorSpecification.doarDisponibile(doarDisponibile)
        );

        Page<ProdusProducator> page = produsProducatorRepository.findAll(spec, pageable);
        return page.map(ProdusMapper::toDTO);
    }
}
