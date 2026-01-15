package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.PachetProdusItemDTO;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.mappers.PachetMapper; // Import Mapper-ul tău
import org.example.delasursa.model.*;
import org.example.delasursa.repository.PachetProdusRepository;
import org.example.delasursa.repository.PachetRepository;
import org.example.delasursa.repository.ProdusProducatorRepository;
import org.example.delasursa.repository.UserRepository;
import org.example.delasursa.service.PachetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PachetServiceImpl implements PachetService {

    private final PachetRepository pachetRepository;
    private final PachetProdusRepository pachetProdusRepository;
    private final ProdusProducatorRepository produsProducatorRepository;
    private final UserRepository userRepository;

    // Injectăm Mapper-ul tău
    private final PachetMapper pachetMapper;

    // --- AM ȘTERS METODA MANUALĂ mapToDto ---

    @Override
    @Transactional(readOnly = true)
    public Page<PachetDTO> getAll(Pageable pageable) {
        Page<Pachet> pachetePage = pachetRepository.findAll(pageable);
        // Folosim mapper-ul
        List<PachetDTO> dtos = pachetePage.stream().map(pachetMapper::toDTO).collect(Collectors.toList());
        return new PageImpl<>(dtos, pageable, pachetePage.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PachetDTO> getAllForProducator(Integer producatorId, Pageable pageable) {
        Page<Pachet> pachetePage = pachetRepository.findByProducator_Id(producatorId, pageable);
        List<PachetDTO> dtos = pachetePage.stream().map(pachetMapper::toDTO).collect(Collectors.toList());
        return new PageImpl<>(dtos, pageable, pachetePage.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public PachetDTO getById(Integer id) {
        Pachet pachet = pachetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pachetul cu id " + id + " nu a fost găsit."));
        // Folosim mapper-ul
        return pachetMapper.toDTO(pachet);
    }

    @Override
    @Transactional
    public PachetDTO create(PachetDTO request) {
        try {
            User user = userRepository.findByUsername(
                    SecurityContextHolder.getContext().getAuthentication().getName()
            ).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

            Producator producator = user.getProducator();
            if (producator == null) {
                throw new OperationFailedException("Utilizatorul curent nu este un producător valid.");
            }

            Pachet pachet = new Pachet();
            pachet.setNume(request.getNume());
            pachet.setImagine(request.getImagine());
            pachet.setProducator(producator);

            // Setăm manual prețul venit din Frontend (nu calculăm automat)
            pachet.setPretTotal(request.getPretTotal() != null ? request.getPretTotal() : 0.0);

            pachet.setPretAbonament(request.getPretAbonament());
            pachet.setDescriere(request.getDescriere());
            pachet.setEAbonament(request.getEAbonament() != null ? request.getEAbonament() : false);
            pachet.setFrecventaLivrare(request.getFrecventaLivrare());

            Pachet savedPachet = pachetRepository.save(pachet);

            // Gestionare produse
            List<PachetProdus> pachetProduseList = new ArrayList<>();
            if (request.getProduse() != null) {
                for (PachetProdusItemDTO itemRequest : request.getProduse()) {
                    // Aici folosim getIdProdusProducator() conform DTO-ului tău
                    ProdusProducator produsExistent = produsProducatorRepository.findById(itemRequest.getIdProdusProducator())
                            .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + itemRequest.getIdProdusProducator() + " nu a fost găsit."));

                    if (!produsExistent.getProducator().getId().equals(producator.getId())) {
                        throw new OperationFailedException("Nu puteți adăuga în pachet un produs care nu vă aparține.");
                    }

                    PachetProdus legatura = new PachetProdus();
                    legatura.setPachet(savedPachet);
                    legatura.setProdus(produsExistent);
                    legatura.setCantitate(itemRequest.getCantitate());
                    // Prețul unitar: îl luăm pe cel curent al produsului (sau din request dacă vrei preț înghețat)
                    legatura.setPretUnitar(produsExistent.getPret());

                    pachetProduseList.add(legatura);
                }
                pachetProdusRepository.saveAll(pachetProduseList);

                // Actualizăm lista în obiectul salvat pentru ca mapper-ul să o vadă la returnare
                savedPachet.setPachetProduse(new HashSet<>(pachetProduseList));
            }

            // Returnăm prin mapper
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
    public PachetDTO update(Integer id, PachetDTO request) {
        try {
            Pachet pachet = authorizeAndGetPachet(id);
            Producator producator = pachet.getProducator();

            // 1. Actualizare câmpuri simple
            if (request.getNume() != null && !request.getNume().isBlank()) pachet.setNume(request.getNume());
            if (request.getImagine() != null) pachet.setImagine(request.getImagine());
            if (request.getDescriere() != null) pachet.setDescriere(request.getDescriere());

            // 2. Actualizare Prețuri & Setări (Manual override)
            if (request.getPretTotal() != null) pachet.setPretTotal(request.getPretTotal());
            if (request.getPretAbonament() != null) pachet.setPretAbonament(request.getPretAbonament());
            if (request.getEAbonament() != null) pachet.setEAbonament(request.getEAbonament());
            if (request.getFrecventaLivrare() != null) pachet.setFrecventaLivrare(request.getFrecventaLivrare());

            // 3. Actualizare Produse (Ștergere completă vechi -> Adăugare noi)
            if (request.getProduse() != null) {
                // Ștergem legăturile vechi
                pachetProdusRepository.deleteAll(pachet.getPachetProduse());
                pachet.getPachetProduse().clear();
                pachetRepository.flush();

                List<PachetProdus> newLinks = new ArrayList<>();
                for (PachetProdusItemDTO item : request.getProduse()) {
                    ProdusProducator produs = produsProducatorRepository.findById(item.getIdProdusProducator())
                            .orElseThrow(() -> new ResourceNotFoundException("Produsul cu ID " + item.getIdProdusProducator() + " nu există"));

                    if (!produs.getProducator().getId().equals(producator.getId())) {
                        throw new OperationFailedException("Produsul nu vă aparține.");
                    }

                    PachetProdus link = new PachetProdus();
                    link.setPachet(pachet);
                    link.setProdus(produs);
                    link.setCantitate(item.getCantitate());
                    link.setPretUnitar(produs.getPret());
                    newLinks.add(link);
                }
                pachetProdusRepository.saveAll(newLinks);
                pachet.setPachetProduse(new HashSet<>(newLinks));
            }

            Pachet updatedPachet = pachetRepository.save(pachet);
            // Returnăm prin mapper
            return pachetMapper.toDTO(updatedPachet);

        } catch (Exception e) {
            throw new OperationFailedException("Eroare la actualizarea pachetului: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        try {
            Pachet pachet = authorizeAndGetPachet(id);

            // 1. Ștergem legăturile cu produsele (copiii)
            pachetProdusRepository.deleteByPachet_Id(pachet.getId());
            pachetProdusRepository.flush(); // Execută imediat

            // 2. Ștergem Pachetul (părintele)
            pachetRepository.delete(pachet);

            // --- FIX CRITIC AICI ---
            // Forțăm DB să execute ștergerea ACUM, pentru a prinde eroarea în acest try-catch
            pachetRepository.flush();

        } catch (DataIntegrityViolationException e) {
            // Acum vom ajunge aici corect!
            throw new OperationFailedException("Nu puteți șterge acest pachet deoarece este folosit în abonamente sau comenzi active. Dezactivați-l în schimb.");
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

        if (user.getProducator() == null || !pachet.getProducator().getId().equals(user.getProducator().getId())) {
            throw new OperationFailedException("Nu aveți permisiunea de a modifica acest pachet.");
        }
        return pachet;
    }
}