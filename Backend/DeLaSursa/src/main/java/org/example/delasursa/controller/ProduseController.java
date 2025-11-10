package org.example.delasursa.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.model.Produs;
import org.example.delasursa.service.ProdusService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    private  final ProdusService produsService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProdusDTO>> getAllProduse(){
        log.info("Get all produse request received ");

        List<ProdusDTO> all = produsService.getAll();

        log.info("Fetched {} produse successfully", all.size());

        return ResponseEntity.ok(all);
    }

    @GetMapping("/populare")
    public ResponseEntity<List<ProdusDTO>> getPopularProduse(@PageableDefault(size = 12) Pageable pageable){
        log.info("Get all popular produse request received ");

        Page<ProdusDTO> page = produsService.getAll(pageable);

        log.info("Fetched {} pages with {} popular produse successfully", page.getTotalPages(),page.getSize());

        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping("/recomandate")
    public ResponseEntity<List<ProdusDTO>> getRecomendedProduse(@PageableDefault(size = 8) Pageable pageable){
        log.info("Get all recomended produse request received ");

        Page<ProdusDTO> page = produsService.getAll(pageable);

        log.info("Fetched {} pages with {} recomended produse successfully", page.getTotalPages(),page.getSize());

        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping("/random")
    public ResponseEntity<List<ProdusDTO>> getRandom(@RequestParam() Integer count){
        log.info("Get random {} produse request received ", count);

        List<ProdusDTO> random = produsService.getRandom(count);

        log.info("Fetched {} random produse successfully", random.size());

        return ResponseEntity.ok(random);
    }




    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProdusDTO> getProdusById(@PathVariable Integer id){
        log.info("Find produs by id {} request received ", id);

        ProdusDTO produs = produsService.getOne(id);
        log.info("Fetched produs with id {}", id);
        return ResponseEntity.ok(produs);
    }

    @PostMapping
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produs> addProdus(@RequestBody Produs produs){
        log.info("Add produs request received  {}", produs.getNume());

        Produs result = produsService.add(produs);

        log.info("Product created successfully with id {}", result.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produs> updateProdus(@PathVariable Integer id, @RequestBody Produs produs){
        log.info("Update produs with id {} request received  ", id);

        Produs result = produsService.update(id, produs);

        log.info("Product updated successfully with id {}", id);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produs> deleteProdus(@PathVariable Integer id){
        log.info("Delete produs with id {} request received", id);

        produsService.delete(id);
        log.info("Product deleted successfully with id {}", id);
        return ResponseEntity.noContent().build();
    }
}
