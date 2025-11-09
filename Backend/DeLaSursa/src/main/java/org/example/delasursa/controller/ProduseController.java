package org.example.delasursa.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.model.Produse;
import org.example.delasursa.service.ProduseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/produse")
@AllArgsConstructor
public class ProduseController {
    private  final ProduseService produseService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Produse>> getAllProduse(){
        log.info("Get all produse request received ");

        List<Produse> all = produseService.getALl();
        log.info("Fetched {} produse successfully", all.size());

        return ResponseEntity.ok(all);
    }


    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Produse> getProdusById(@PathVariable Integer id){
        log.info("Find produs by id {} request received ", id);

        Produse produs = produseService.getOne(id);
        log.info("Fetched produs with id {}", id);
        return ResponseEntity.ok(produs);
    }

    @PostMapping
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produse> addProdus(@RequestBody Produse produs){
        log.info("Add produs request received  {}", produs.getNume());

        Produse result = produseService.add(produs);

        log.info("Product created successfully with id {}", result.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produse> updateProdus(@PathVariable Integer id, @RequestBody Produse produs){
        log.info("Update produs with id {} request received  ", id);

        Produse result = produseService.update(id, produs);

        log.info("Product updated successfully with id {}", id);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produse> deleteProdus(@PathVariable Integer id){
        log.info("Delete produs with id {} request received", id);

        produseService.delete(id);
        log.info("Product deleted successfully with id {}", id);
        return ResponseEntity.noContent().build();
    }
}
