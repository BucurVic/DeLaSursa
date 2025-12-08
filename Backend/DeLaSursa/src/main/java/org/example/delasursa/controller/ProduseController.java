package org.example.delasursa.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.produs.CreateProdusRequest;
import org.example.delasursa.common.dto.produs.ProdusDTO;
import org.example.delasursa.common.dto.produs.ProdusGenericSummary;
import org.example.delasursa.common.dto.produs.UpdateProdusRequest;
import org.example.delasursa.model.Produs;
import org.example.delasursa.service.ProdusProducatorService;
import org.example.delasursa.service.ProdusService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/produse")
@AllArgsConstructor
public class ProduseController {
    private  final ProdusProducatorService produsProducatorService;
    private final ProdusService produsService;

    @GetMapping
    public ResponseEntity<List<ProdusDTO>> getAllProduse(){
        log.info("Get all produse request received ");

        List<ProdusDTO> all = produsProducatorService.getAll();

        log.info("Fetched {} produse successfully", all.size());

        return ResponseEntity.ok(all);
    }

    @GetMapping("/producator")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<List<ProdusDTO>> getAllProducator(){
        log.info("Get all produse for producator request received ");

        List<ProdusDTO> all = produsProducatorService.getAllProducator();

        log.info("Fetched {} produse for producator successfully", all.size());

        return ResponseEntity.ok(all);
    }

    @GetMapping("/populare")
    public ResponseEntity<Page<ProdusDTO>> getPopularProduse(@PageableDefault(size = 12) Pageable pageable){
        log.info("Get all popular produse request received ");

        Page<ProdusDTO> page = produsProducatorService.getAll(pageable);

        log.info("Fetched {} pages with {} popular produse successfully", page.getTotalPages(),page.getSize());

        return ResponseEntity.ok(page);
    }

    @GetMapping("/recomandate")
    public ResponseEntity<Page<ProdusDTO>> getRecomendedProduse(@PageableDefault(size = 8) Pageable pageable){
        log.info("Get all recomended produse request received ");

        Page<ProdusDTO> page = produsProducatorService.getAll(pageable);

        log.info("Fetched {} pages with {} recomended produse successfully", page.getTotalPages(),page.getSize());

        return ResponseEntity.ok(page);
    }

    @GetMapping("/random")
    public ResponseEntity<List<ProdusDTO>> getRandom(@RequestParam() Integer count){
        log.info("Get random {} produse request received ", count);

        List<ProdusDTO> random = produsProducatorService.getRandom(count);

        log.info("Fetched {} random produse successfully", random.size());

        return ResponseEntity.ok(random);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ProdusDTO>> getFiltered(
            @RequestParam(required = false) String categorie,
            @RequestParam(required = false) String regiune,
            @RequestParam(required = false) Double pretMin,
            @RequestParam(required = false) Double pretMax,
            @RequestParam(required = false, defaultValue = "false") Boolean doarDisponibile,
            @PageableDefault(size = 10, sort = "pret") Pageable pageable)
    {
        log.info("Received filtered produse request | categorie='{}' | regiune='{}' | pretMin={} | pretMax={} | doarDisponibile={} | page={} | size={} | sort={}",
                categorie, regiune, pretMin, pretMax, doarDisponibile,
                pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());

        Page<ProdusDTO> page = produsProducatorService.getFiltered(categorie, regiune, pretMin, pretMax, doarDisponibile, pageable);

        log.info("Fetched {} filtered produse across {} total pages (page size: {})",
                page.getNumberOfElements(), page.getTotalPages(), page.getSize());

        return ResponseEntity.ok(page);
    }


    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProdusDTO> getProdusById(@PathVariable Integer id){
        log.info("Find produs by id {} request received ", id);

        ProdusDTO produs = produsProducatorService.getOne(id);
        log.info("Fetched produs with id {}", id);
        return ResponseEntity.ok(produs);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<ProdusDTO> addProdus(@ModelAttribute CreateProdusRequest request){
        log.info("Add produs request received  {}", request.getNume());

        ProdusDTO result = produsProducatorService.add(request);

        log.info("Product created successfully with id {}", result.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<ProdusDTO> updateProdus(
            @PathVariable Integer id,
            @ModelAttribute UpdateProdusRequest request
    ){
        log.info("Update produs with id {} request received  ", id);

        ProdusDTO result = produsProducatorService.update(id, request);

        log.info("Product updated successfully with id {}", id);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRODUCATOR')")
    public ResponseEntity<Produs> deleteProdus(@PathVariable Integer id){
        log.info("Delete produs from producator with id {} request received", id);

        produsProducatorService.delete(id);
        log.info("Product deleted from producator successfully with id {}", id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categorii")
    public ResponseEntity<List<String>> getAllCategorie(){
        log.info("Get all categorie request received ");

        List<String> categorii = produsService.getAllCategorie();

        log.info("Fetched {} categorie successfully", categorii.size());

        return ResponseEntity.ok(categorii);
    }

    @GetMapping(params = "categorie")
    public ResponseEntity<List<ProdusGenericSummary>> getAllProduseByCategorie(@RequestParam(required = false) String categorie){
        List<ProdusGenericSummary> produse;

        if(categorie != null)
            produse = produsService.getAllByCategorie(categorie);
        else
            produse = produsService.getALl();

        return ResponseEntity.ok(produse);
    }
}
