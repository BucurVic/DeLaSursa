package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.enums.ImageCategory;
import org.example.delasursa.common.dto.pachet.CreatePachetRequest;
import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.PachetProdusRequest;
import org.example.delasursa.common.dto.pachet.UpdatePachetRequest;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.mappers.PachetMapper;
import org.example.delasursa.model.*;
import org.example.delasursa.repository.PachetProdusRepository;
import org.example.delasursa.repository.PachetRepository;
import org.example.delasursa.repository.ProdusProducatorRepository;
import org.example.delasursa.repository.UserRepository;
import org.example.delasursa.service.PachetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PachetServiceImpl implements PachetService {

    private final PachetRepository pachetRepository;
    private final PachetProdusRepository pachetProdusRepository;
    private final ProdusProducatorRepository produsProducatorRepository;
    private final UserRepository userRepository;
    private final ImageStoreService imageStoreService;
    private final PachetMapper pachetMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<PachetDTO> getAll(Pageable pageable) {
        Page<Pachet> pachetePage = pachetRepository.findAll(pageable);

        return pachetePage.map(pachetMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PachetDTO> getAllForProducator(Integer producatorId, Pageable pageable) {
        Page<Pachet> pachetePage = pachetRepository.findByProducator_Id(producatorId, pageable);

        return pachetePage.map(pachetMapper::toDTO);

    }

    @Override
    @Transactional
    public PachetDTO create(CreatePachetRequest request) {
        try {
            User user = userRepository.findByUsername(
                    SecurityContextHolder.getContext().getAuthentication().getName()
            ).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

            Producator producator = user.getProducator();
            if (producator == null) {
                throw new OperationFailedException("Utilizatorul curent nu este un producător valid.");
            }

            String imaginePath = null;
            if (request.getImagine() != null && !request.getImagine().isEmpty()) {
                imaginePath = imageStoreService.saveImage(
                        request.getImagine(),
                        producator.getId(),
                        ImageCategory.PACHET);
            }

            Pachet pachet = new Pachet();
            pachet.setNume(request.getNume());
            pachet.setImagine(imaginePath);
            pachet.setProducator(producator);

            Pachet savedPachet = pachetRepository.save(pachet);

            List<PachetProdus> pachetProduseList = new ArrayList<>();

            for (PachetProdusRequest itemRequest : request.getProduse()) {
                ProdusProducator produsExistent = produsProducatorRepository.findById(itemRequest.getIdProdus())
                        .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + itemRequest.getIdProdus() + " nu a fost găsit."));

                if (!produsExistent.getProducator().getId().equals(producator.getId())) {
                    throw new OperationFailedException("Nu puteți adăuga în pachet un produs care nu vă aparține (ID: " + itemRequest.getIdProdus() + ")");
                }

                PachetProdus legatura = new PachetProdus();
                legatura.setPachet(savedPachet);
                legatura.setProdus(produsExistent);
                legatura.setCantitate(itemRequest.getCantitate());
                legatura.setPretUnitar(itemRequest.getPretUnitar());

                pachetProduseList.add(legatura);
            }

            pachetProdusRepository.saveAll(pachetProduseList);

            savedPachet.setPachetProduse(new HashSet<>(pachetProduseList));

            return pachetMapper.toDTO(savedPachet);

        } catch (ResourceNotFoundException | OperationFailedException e) {
            throw e;
        } catch (Exception e) {
            throw new OperationFailedException("Eroare la crearea pachetului: " + e.getMessage());
        }
    }

    @Override
    public PachetDTO findById(Integer id) {
        Pachet pachet = pachetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pachet not found!"));
        return pachetMapper.toDTO(pachet);
    }

    @Override
    @Transactional
    public PachetDTO update(Integer id, UpdatePachetRequest request) {
        try {
            // 1. Verificăm că pachetul există și aparține producătorului logat
            Pachet pachet = authorizeAndGetPachet(id);
            Producator producator = pachet.getProducator();

            // 2. Actualizare Nume
            if (request.getNume() != null && !request.getNume().isBlank()) {
                pachet.setNume(request.getNume());
            }

            // 3. Actualizare Imagine (dacă e trimisă una nouă)
            if (request.getImagine() != null && !request.getImagine().isEmpty()) {
                // Ștergem vechea imagine folosind serviciul, dacă există
                if (pachet.getImagine() != null) {
                    // imageStoreService.deleteImage(pachet.getImagine()); // Optional: cleanup
                    String newPath = imageStoreService.replaceImage(
                            request.getImagine(),
                            pachet.getImagine(),
                            producator.getId(),
                            ImageCategory.PACHET
                    );
                    pachet.setImagine(newPath);
                } else {
                    String path = imageStoreService.saveImage(
                            request.getImagine(),
                            producator.getId(),
                            ImageCategory.PACHET);
                    pachet.setImagine(path);
                }
            }

            // 4. Actualizare Produse (Strategia: Șterge tot ce era -> Adaugă noile produse)
            // 4.1. Ștergem legăturile vechi
            List<PachetProdus> oldProduse = new ArrayList<>(pachet.getPachetProduse());
            pachet.getPachetProduse().clear(); // Golim set-ul din entitate
            pachetProdusRepository.deleteAll(oldProduse); // Ștergem fizic din DB

            // 4.2. Creăm noile legături
            List<PachetProdus> newLinks = new ArrayList<>();
            for (PachetProdusRequest item : request.getProduse()) {
                ProdusProducator produs = produsProducatorRepository.findById(item.getIdProdus())
                        .orElseThrow(() -> new ResourceNotFoundException("Produsul " + item.getIdProdus() + " nu există"));

                // Validare ownership produs
                if (!produs.getProducator().getId().equals(producator.getId())) {
                    throw new OperationFailedException("Produsul " + item.getIdProdus() + " nu vă aparține.");
                }

                PachetProdus link = new PachetProdus();
                link.setPachet(pachet);
                link.setProdus(produs);
                link.setCantitate(item.getCantitate());
                link.setPretUnitar(item.getPretUnitar());
                newLinks.add(link);
            }

            pachetProdusRepository.saveAll(newLinks);

            // 4.3 Refacem legătura în obiect pentru returnare corectă
            pachet.setPachetProduse(new HashSet<>(newLinks));

            // Salvăm pachetul (pentru nume/imagine)
            Pachet updatedPachet = pachetRepository.save(pachet);

            return pachetMapper.toDTO(updatedPachet);

        } catch (Exception e) {
            throw new OperationFailedException("Eroare la actualizarea pachetului: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        try {
            // 1. Verificare ownership
            Pachet pachet = authorizeAndGetPachet(id);

            // 2. Ștergere imagine de pe disk
            if (pachet.getImagine() != null) {
                imageStoreService.deleteImage(pachet.getImagine());
            }

            // 3. Ștergere produse componente (orphan removal manual)
            // Deoarece nu avem CascadeType.ALL/REMOVE pe relație în entitate, ștergem manual
            pachetProdusRepository.deleteAll(pachet.getPachetProduse());

            // 4. Ștergere pachet
            pachetRepository.delete(pachet);

        } catch (Exception e) {
            throw new OperationFailedException("Eroare la ștergerea pachetului: " + e.getMessage());
        }
    }

    private Pachet authorizeAndGetPachet(Integer pachetId) {
        User user = userRepository.findByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName()
        ).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        Pachet pachet = pachetRepository.findById(pachetId)
                .orElseThrow(() -> new ResourceNotFoundException("Pachetul cu ID " + pachetId + " nu există"));

        // Verificăm dacă producătorul userului este același cu producătorul pachetului
        if (user.getProducator() == null || !pachet.getProducator().getId().equals(user.getProducator().getId())) {
            throw new OperationFailedException("Nu aveți permisiunea de a modifica acest pachet.");
        }
        return pachet;
    }
}
