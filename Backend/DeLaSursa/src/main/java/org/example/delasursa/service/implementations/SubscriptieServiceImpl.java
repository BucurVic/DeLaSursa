package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.subscriptie.CreateSubscriptieRequest;
import org.example.delasursa.common.dto.subscriptie.SubscriptieDTO;
import org.example.delasursa.common.exceptions.OperationFailedException;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.common.exceptions.SubscriptieException;
import org.example.delasursa.common.mappers.SubscriptieMapper;
import org.example.delasursa.model.Client;
import org.example.delasursa.model.Pachet;
import org.example.delasursa.model.Subscriptie;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.PachetRepository;
import org.example.delasursa.repository.SubscriptieRepository;
import org.example.delasursa.repository.UserRepository;
import org.example.delasursa.service.SubscriptieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptieServiceImpl implements SubscriptieService {

    private final SubscriptieRepository subscriptieRepository;
    private final SubscriptieMapper subscriptieMapper;
    private final UserRepository userRepository;    // ADAUGAT
    private final PachetRepository pachetRepository; // ADAUGAT

    @Override
    @Transactional(readOnly = true)
    public Page<SubscriptieDTO> getAll(Pageable pageable) {
        log.info("Fetching all subscriptii");
        return subscriptieRepository.findAll(pageable)
                .map(subscriptieMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public SubscriptieDTO getById(Integer id) {
        log.info("Fetching subscriptie id={}", id);
        Subscriptie entity = subscriptieRepository.findById(id)
                .orElseThrow(() -> new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND));
        return subscriptieMapper.toDto(entity);
    }

    @Override
    @Transactional
    public SubscriptieDTO create(CreateSubscriptieRequest request) {
        // 1. Identificare Client din Token
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Client client = user.getClient();
        if (client == null) {
            throw new OperationFailedException("Doar utilizatorii de tip Client pot crea abonamente.");
        }

        // 2. Validare Pachet
        Pachet pachet = pachetRepository.findById(request.getIdPachet())
                .orElseThrow(() -> new ResourceNotFoundException("Pachetul nu există"));

        if (!Boolean.TRUE.equals(pachet.getEAbonament())) {
            throw new OperationFailedException("Acest pachet nu este un abonament.");
        }

        log.info("Creating subscriptie for Client={} and Pachet={}", client.getId(), pachet.getId());

        // 3. Mapare si Setare
        // Mapperul se ocupa de data, frecventa, pachet
        Subscriptie entity = subscriptieMapper.toEntity(request);

        // Setam manual campurile critice
        entity.setClient(client);
        entity.setStatus("ACTIV");

        // Setam data de azi daca nu e trimisa
        if (entity.getDataInceput() == null) {
            entity.setDataInceput(LocalDate.now());
        }
        // Setam frecventa default a pachetului daca nu e trimisa
        if (entity.getFrecventa() == null) {
            entity.setFrecventa(pachet.getFrecventaLivrare());
        }

        entity = subscriptieRepository.save(entity);
        log.info("Subscriptie created id={}", entity.getId());

        return subscriptieMapper.toDto(entity);
    }

    @Override
    @Transactional
    public SubscriptieDTO update(Integer id, SubscriptieDTO request) {
        log.info("Updating subscriptie id={}", id);
        Subscriptie existing = subscriptieRepository.findById(id)
                .orElseThrow(() -> new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND));

        existing = subscriptieMapper.toEntity(request, existing);
        existing = subscriptieRepository.save(existing);

        return subscriptieMapper.toDto(existing);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        log.info("Deleting subscriptie id={}", id);
        if (!subscriptieRepository.existsById(id)) {
            throw new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND);
        }
        subscriptieRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void cancel(Integer id) {
        log.info("Canceling subscriptie id={}", id);
        Subscriptie sub = subscriptieRepository.findById(id)
                .orElseThrow(() -> new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND));

        sub.setStatus("ANULAT");
        subscriptieRepository.save(sub);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SubscriptieDTO> getAllForClient(Integer clientId, Pageable pageable) {
        return subscriptieRepository.findByClient_Id(clientId, pageable)
                .map(subscriptieMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SubscriptieDTO> getAllForProducator(Integer producatorId, Pageable pageable) {
        return subscriptieRepository.findByProducatorId(producatorId, pageable)
                .map(subscriptieMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SubscriptieDTO> getAllForPachet(Integer pachetId, Pageable pageable) {
        return subscriptieRepository.findByPachet_Id(pachetId, pageable)
                .map(subscriptieMapper::toDto);
    }
}