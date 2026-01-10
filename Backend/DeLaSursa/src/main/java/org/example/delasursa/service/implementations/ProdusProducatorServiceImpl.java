package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.enums.ImageCategory;
import org.example.delasursa.common.dto.produs.CreateProdusRequest;
import org.example.delasursa.common.dto.produs.ProdusDTO;
import org.example.delasursa.common.dto.produs.UpdateProdusRequest;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.mappers.ProdusMapper;
import org.example.delasursa.model.Producator;
import org.example.delasursa.model.Produs;
import org.example.delasursa.model.ProdusProducator;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.ProdusRepository;
import org.example.delasursa.repository.UserRepository;
import org.example.delasursa.service.ProdusProducatorService;
import org.example.delasursa.specification.ProdusProducatorSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ProdusProducatorRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdusProducatorServiceImpl implements ProdusProducatorService {

    private final ProdusProducatorRepository produsProducatorRepository;
    private final ProdusRepository produsRepository;
    private final ProductAuthorizationService productAuthorizationService;
    private final UserRepository userRepository;
    private final ImageStoreService imageStoreService;
    private final ProdusMapper produsMapper;


    @Override
    public List<ProdusDTO> getAll() {
        return produsProducatorRepository.findAll()
                .stream()
                .map(produsMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProdusDTO> getAll(Pageable pageable){
        return produsProducatorRepository
                .findAll(pageable)
                .map(produsMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProdusDTO> getAllProducator() {
        User user = userRepository.findByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName()
        ).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        Producator producator = user.getProducator();

        return produsProducatorRepository.findByProducator_Id(producator.getId())
                .stream()
                .map(produsMapper::toDTO)
                .toList();
    }

    @Override
    public List<ProdusDTO> getRandom(Integer count) {
        return produsProducatorRepository.findRandom(count)
                .stream()
                .map(produsMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProdusDTO getOne(Integer id) {
        return produsProducatorRepository.findById(id)
                .map(produsMapper::toDTO)
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

            Produs produs;

            if(request.getIdProdusGeneric() != null){
                produs = produsRepository.findById(request.getIdProdusGeneric())
                        .orElseThrow(() -> new ResourceNotFoundException("Produsul generic nu a fost gasit"));
            } else if (request.getNumeProdusGenericNou() != null && !request.getNumeProdusGenericNou().isBlank()) {
                produs = new Produs();
                produs.setNume(request.getNumeProdusGenericNou());
                produs.setCategorie(request.getCategorie());
                produs = produsRepository.save(produs);
            }
            else
                throw new OperationFailedException("Trebuie trimis fie un produs generic existent, fie un nume pentru un produs nou");

            boolean alreadyLinked = produsProducatorRepository.existsByProdus_IdAndProducator_Id(produs.getId(),producator.getId());

            if (alreadyLinked) {
                throw new OperationFailedException("Producer already sells this product");
            }

            String imagine = imageStoreService.saveImage(
                    request.getImagine(),
                    producator.getId(),
                    ImageCategory.PRODUS);

            String denumirePersonalizata = (request.getNume() != null &&
                    !request.getNume().isBlank())
                    ? request.getNume()
                    : produs.getNume();

            ProdusProducator join = ProdusProducator.builder()
                    .produs(produs)
                    .producator(producator)
                    .imagine(imagine)
                    .pret(request.getPret())
                    .unitateMasura(request.getUnitateMasura())
                    .cantitate(request.getCantitate())
                    .denumirePersonalizata(denumirePersonalizata)
                    .build();

            produsProducatorRepository.save(join);

            return  produsMapper.toDTO(join);
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
            produsProducator.setDenumirePersonalizata(request.getDenumirePersonalizata());

            if(request.getImagine() != null && !request.getImagine().isEmpty()){
                String newImagine = imageStoreService.replaceImage(
                        request.getImagine(),
                        produsProducator.getImagine(),
                        produsProducator.getProducator().getId(),
                        ImageCategory.PRODUS
                );
                produsProducator.setImagine(newImagine);
            }

            ProdusProducator updated = produsProducatorRepository.save(produsProducator);

            return produsMapper.toDTO(updated);
        } catch (Exception e){
            throw new OperationFailedException("Eroare la actualizarea produsului. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {

        try{
            ProdusProducator produsProducator = productAuthorizationService.authorizeAndGetProdusOwnership(id);
            imageStoreService.deleteImage(produsProducator.getImagine());
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
        return page.map(produsMapper::toDTO);
    }
}
