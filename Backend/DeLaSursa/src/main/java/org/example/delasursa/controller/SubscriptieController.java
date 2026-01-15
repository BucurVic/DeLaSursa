package org.example.delasursa.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.subscriptie.CreateSubscriptieRequest;
import org.example.delasursa.common.dto.subscriptie.SubscriptieDTO;
import org.example.delasursa.service.SubscriptieService;
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
@RequestMapping("/api/subscriptii")
@Validated
@AllArgsConstructor
public class SubscriptieController {

    private final SubscriptieService subscriptieService;

    // --- GET ALL (Admin) ---
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<SubscriptieDTO>> getAll(
            @PageableDefault(size = 10) Pageable pageable
    ) {
        log.info("Get all subscriptii request received | page {} | size = {}",
                pageable.getPageNumber(), pageable.getPageSize());

        // Returnăm Page direct, ca frontend-ul să aibă 'totalPages' și 'totalElements'
        Page<SubscriptieDTO> page = subscriptieService.getAll(pageable);
        return ResponseEntity.ok(page);
    }

    // --- GET BY CLIENT (Clientul își vede abonamentele) ---
    @GetMapping("/client/{clientId}")
    public ResponseEntity<Page<SubscriptieDTO>> getByClient(
            @PathVariable Integer clientId,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        log.info("Get subscriptii for client {} request received", clientId);
        // Service-ul returnează Page, deci și controller-ul trebuie să returneze Page
        Page<SubscriptieDTO> subs = subscriptieService.getAllForClient(clientId, pageable);
        return ResponseEntity.ok(subs);
    }

    // --- GET BY PRODUCATOR (Producătorul își vede abonații - NOU) ---
    @GetMapping("/producator/{producatorId}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Page<SubscriptieDTO>> getByProducator(
            @PathVariable Integer producatorId,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        log.info("Get subscriptii for producator {} request received", producatorId);
        Page<SubscriptieDTO> subs = subscriptieService.getAllForProducator(producatorId, pageable);
        return ResponseEntity.ok(subs);
    }

    // --- GET BY ID ---
    @GetMapping("/{id}")
    public ResponseEntity<SubscriptieDTO> getById(@PathVariable Integer id) {
        log.info("Get subscriptie {} request received", id);
        SubscriptieDTO dto = subscriptieService.getById(id);
        return ResponseEntity.ok(dto);
    }

    // --- CREATE ---
    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<SubscriptieDTO> create(@RequestBody @Valid CreateSubscriptieRequest request) {
        // Corectare: Nu mai logăm clientId pentru că nu vine în request (se ia din token)
        // Corectare: Folosim getIdPachet()
        log.info("Create subscriptie request received for pachet {}", request.getIdPachet());

        SubscriptieDTO created = subscriptieService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // --- UPDATE ---
    @PutMapping("/{id}")
    public ResponseEntity<SubscriptieDTO> update(
            @PathVariable Integer id,
            @RequestBody @Valid SubscriptieDTO request
    ) {
        log.info("Update subscriptie {} request received", id);
        SubscriptieDTO updated = subscriptieService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    // --- CANCEL (Anulare abonament) ---
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable Integer id) {
        log.info("Cancel subscriptie {} request received", id);
        subscriptieService.cancel(id);
        return ResponseEntity.noContent().build();
    }

    // --- DELETE ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')") // De obicei doar adminul sterge fizic, restul dau cancel
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("Delete subscriptie {} request received", id);
        subscriptieService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pachet/{pachetId}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Page<SubscriptieDTO>> getByPachet(
            @PathVariable Integer pachetId,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return ResponseEntity.ok(subscriptieService.getAllForPachet(pachetId, pageable));
    }
}