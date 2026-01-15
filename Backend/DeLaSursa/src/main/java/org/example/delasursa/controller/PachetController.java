package org.example.delasursa.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.service.PachetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
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

    private final PachetService pachetService;

    // --- GET ALL ---
    @GetMapping
    public ResponseEntity<Page<PachetDTO>> getAllPachete(
            @PageableDefault(size = 6) Pageable pageable
    ) {
        log.info("Get all pachete request received | page {} | size = {}",
                pageable.getPageNumber(), pageable.getPageSize());
        Page<PachetDTO> page = pachetService.getAll(pageable);
        return ResponseEntity.ok(page);
    }

    // --- GET BY PRODUCATOR ---
    @GetMapping("/producator/{idProducator}")
    public ResponseEntity<Page<PachetDTO>> getPacheteByProducator(
            @PathVariable Integer idProducator,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        log.info("Get pachete for producator {} request received", idProducator);
        Page<PachetDTO> page = pachetService.getAllForProducator(idProducator, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PachetDTO> getPachetById(@PathVariable Integer id) {
        return ResponseEntity.ok(pachetService.getById(id));
    }

    // --- CREATE (Modificat pentru JSON) ---
    @PostMapping
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<PachetDTO> createPachet(
            @RequestBody @Valid PachetDTO request // Folosim @RequestBody pentru JSON
    ) {
        log.info("Create pachet request received: '{}' (Abonament: {})",
                request.getNume(), request.getEAbonament());

        // Aici presupunem că pachetService.create acceptă acum un PachetDTO
        // Dacă service-ul tău cerea CreatePachetRequest, va trebui să adaptezi service-ul
        // sau să mapezi DTO-ul la Request.
        PachetDTO result = pachetService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // --- UPDATE (Modificat pentru JSON) ---
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<PachetDTO> updatePachet(
            @PathVariable Integer id,
            @RequestBody @Valid PachetDTO request // Folosim @RequestBody pentru JSON
    ) {
        log.info("Update pachet id {} request received", id);

        // La fel, service-ul trebuie să accepte PachetDTO
        PachetDTO result = pachetService.update(id, request);

        return ResponseEntity.ok(result);
    }

    // --- DELETE ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Void> deletePachet(@PathVariable Integer id) {
        log.info("Delete pachet id {} request received", id);
        pachetService.delete(id);
        return ResponseEntity.noContent().build();
    }
}