package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.subscriptie.CreateSubscriptieRequest;
import org.example.delasursa.common.dto.subscriptie.SubscriptieDTO;
import org.example.delasursa.common.exceptions.SubscriptieException;
import org.example.delasursa.common.mappers.SubscriptieMapper;
import org.example.delasursa.model.Subscriptie;
import org.example.delasursa.repository.SubscriptieRepository;
import org.example.delasursa.service.SubscriptieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptieServiceImpl implements SubscriptieService {

    private final SubscriptieRepository subscriptieRepository;
    private final SubscriptieMapper subscriptieMapper;

    @Override
    public Page<SubscriptieDTO> getAll(Pageable pageable) {
        log.info("Fetching all subscriptii | page={} | size={}", pageable.getPageNumber(), pageable.getPageSize());
        Page<SubscriptieDTO> page = subscriptieRepository.findAll(pageable)
                .map(subscriptieMapper::toDto);
        log.info("Fetched {} subscriptii (total pages: {})", page.getNumberOfElements(), page.getTotalPages());
        return page;
    }

    @Override
    public SubscriptieDTO getById(Integer id) {
        log.info("Fetching subscriptie with id={}", id);
        Subscriptie entity = subscriptieRepository.findById(id)
                .orElseThrow(() -> new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND));
        log.info("Subscriptie with id={} fetched successfully", id);
        return subscriptieMapper.toDto(entity);
    }

    @Override
    public SubscriptieDTO create(CreateSubscriptieRequest request) {
        log.info("Creating subscriptie for clientId={} and pachetId={}", request.getClientId(), request.getPachetId());
        Subscriptie entity = subscriptieMapper.toEntity(request);
        entity = subscriptieRepository.save(entity);
        log.info("Subscriptie created successfully with id={}", entity.getId());
        return subscriptieMapper.toDto(entity);
    }

    @Override
    public SubscriptieDTO update(Integer id, SubscriptieDTO request) {
        log.info("Updating subscriptie with id={}", id);
        Subscriptie existing = subscriptieRepository.findById(id)
                .orElseThrow(() -> new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND));
        existing = subscriptieMapper.toEntity(request, existing);
        existing = subscriptieRepository.save(existing);
        log.info("Subscriptie with id={} updated successfully", id);
        return subscriptieMapper.toDto(existing);
    }

    @Override
    public void delete(Integer id) {
        log.info("Deleting subscriptie with id={}", id);
        if (!subscriptieRepository.existsById(id)) {
            log.warn("Attempted to delete non-existent subscriptie with id={}", id);
            throw new SubscriptieException("Subscriptie not found", HttpStatus.NOT_FOUND);
        }
        subscriptieRepository.deleteById(id);
        log.info("Subscriptie with id={} deleted successfully", id);
    }

    @Override
    public List<SubscriptieDTO> getAllForClient(Integer clientId) {
        return subscriptieRepository.findSubscriptieByClient_Id(clientId).stream().map(subscriptieMapper::toDto).toList();
    }
}
