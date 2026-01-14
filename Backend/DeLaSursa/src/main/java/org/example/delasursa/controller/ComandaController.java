package org.example.delasursa.controller;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.comanda.*;
import org.example.delasursa.jwt.CustomUserDetails;
import org.example.delasursa.service.ComandaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Validated
@AllArgsConstructor
@RequestMapping("/api/comanda")
public class ComandaController {

    private final ComandaService comandaService;

    @PostMapping
    public ResponseEntity<CreateComandaResponse> createComanda(@RequestBody CreateComandaRequest requst) {
        return ResponseEntity.status(HttpStatus.CREATED).body(comandaService.createComanda(requst));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ComandaDto>> getAllComenzi(@PathVariable Integer id) {

        List<ComandaDto> comenzi = comandaService.getAllComandsByUserId(id);
        if (comenzi.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

        return ResponseEntity.status(HttpStatus.OK).body(comenzi);
    }

    @GetMapping("/producator/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<List<ComandaDto>> getAllComenziForProducator(@PathVariable Integer id) {
        List<ComandaDto> comenzi = comandaService.getAllCommandsByProducatorId(id);
        return ResponseEntity.status(HttpStatus.OK).body(comenzi);

    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<UpdateComandaResponse> updateComanda(@PathVariable Integer id, @RequestBody UpdateComandaRequest request, @AuthenticationPrincipal CustomUserDetails userDetails) {
        comandaService.updateStatus(id, request.getNewStatus(), userDetails.getUserId());
        return ResponseEntity.ok().build();
    }
}

