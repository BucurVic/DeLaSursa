package org.example.delasursa.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.pachet.CreatePachetRequest;
import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.UpdatePachetRequest;
import org.example.delasursa.repository.PachetRepository;
import org.example.delasursa.service.PachetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/pachete")
@Validated
@AllArgsConstructor
public class PachetController {
    private PachetService pachetService;


    @GetMapping
    public ResponseEntity<Page<PachetDTO>> getAllPachete(
            @PageableDefault(size = 6) Pageable pageable
    ) {
        log.info("Get all pachete request received | page {} | size = {}",
                pageable.getPageNumber(),pageable.getPageSize());

        Page<PachetDTO> page = pachetService.getAll(pageable);

        log.info("Fetched {} pachete successfully (total pages: {})",
                page.getNumberOfElements(), page.getTotalPages());

        return ResponseEntity.ok(page);
    }

    @GetMapping("/producator/{idProducator}")
    public ResponseEntity<Page<PachetDTO>> getPacheteByProducator(
            @PathVariable Integer idProducator,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        log.info("Get pachete for producator {} request received | page={} | size={}",
                idProducator, pageable.getPageNumber(), pageable.getPageSize());

        Page<PachetDTO> page = pachetService.getAllForProducator(idProducator, pageable);

        log.info("Fetched {} pachete for producator {} successfully (total pages: {})",
                page.getNumberOfElements(), idProducator, page.getTotalPages());

        return ResponseEntity.ok(page);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<PachetDTO> createPachet(
            @ModelAttribute @Valid CreatePachetRequest request
    ) {
        log.info("Create pachet request received: '{}' with {} products",
                request.getNume(),
                request.getProduse() != null ? request.getProduse().size() : 0);

        PachetDTO result = pachetService.create(request);

        log.info("Pachet created successfully with id {}", result.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<PachetDTO> updatePachet(
            @PathVariable Integer id,
            @ModelAttribute @Valid UpdatePachetRequest request
    ) {
        log.info("Update pachet id {} request received", id);

        PachetDTO result = pachetService.update(id, request);

        log.info("Pachet {} updated successfully", id);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Void> deletePachet(@PathVariable Integer id) {
        log.info("Delete pachet id {} request received", id);

        pachetService.delete(id);

        log.info("Pachet {} deleted successfully", id);

        return ResponseEntity.noContent().build();
    }
}
