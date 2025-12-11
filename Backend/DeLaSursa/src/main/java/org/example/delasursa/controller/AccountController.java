package org.example.delasursa.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.ClientDto;
import org.example.delasursa.common.dto.comanda.ComandaDto;
import org.example.delasursa.service.ClientService;
import org.example.delasursa.service.ComandaService;
import org.example.delasursa.service.ProducatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/account")
@AllArgsConstructor
public class AccountController {

    private final ClientService clientService;
    private final ComandaService comandaService;
   

   
    @GetMapping("/client")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<ClientDto> getMyClientProfile(Authentication authentication) {
        String email = authentication.getName();
        log.info("Fetching profile for client: {}", email);
        
        ClientDto clientDto = clientService.getClientProfile(email);
        return ResponseEntity.ok(clientDto);
    }

    
    @GetMapping("/client/comenzi")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<ComandaDto>> getMyOrders(Authentication authentication) {
        String email = authentication.getName();
        log.info("Request istoric comenzi pentru clientul: {}", email);

        List<ComandaDto> comenzi = comandaService.getComenziIstoric(email);

        return ResponseEntity.ok(comenzi);
    }

    @PutMapping("/client")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<ClientDto> updateMyClientProfile(Authentication authentication, @RequestBody ClientDto clientDto) {
        String email = authentication.getName(); 
        ClientDto updatedClient = clientService.updateClientProfile(email, clientDto);

        return ResponseEntity.ok(updatedClient);
    }
   
    
}