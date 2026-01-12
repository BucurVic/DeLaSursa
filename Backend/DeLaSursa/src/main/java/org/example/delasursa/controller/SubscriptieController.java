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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/subscriptii")
@Validated
@AllArgsConstructor
public class SubscriptieController {

    private final SubscriptieService subscriptieService;

    @GetMapping
    public ResponseEntity<List<SubscriptieDTO>> getAll(
            @PageableDefault(size = 10) Pageable pageable
    ) {
        log.info("Get all subscriptii request received | page {} | size = {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<SubscriptieDTO> page = subscriptieService.getAll(pageable);
        List<SubscriptieDTO> content = page.getContent();
        if (content.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<SubscriptieDTO>> getByClient(
            @PathVariable Integer clientId
    ) {
        List<SubscriptieDTO> subs = subscriptieService.getAllForClient(clientId);

        if (subs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(subs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptieDTO> getById(@PathVariable Integer id) {
        log.info("Get subscriptie {} request received", id);
        SubscriptieDTO dto = subscriptieService.getById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<SubscriptieDTO> create(@RequestBody @Valid CreateSubscriptieRequest request) {
        log.info("Create subscriptie request received for client {} and pachet {}",
                request.getClientId(), request.getPachetId());
        SubscriptieDTO created = subscriptieService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptieDTO> update(
            @PathVariable Integer id,
            @RequestBody @Valid SubscriptieDTO request
    ) {
        log.info("Update subscriptie {} request received", id);
        SubscriptieDTO updated = subscriptieService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("Delete subscriptie {} request received", id);
        subscriptieService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
