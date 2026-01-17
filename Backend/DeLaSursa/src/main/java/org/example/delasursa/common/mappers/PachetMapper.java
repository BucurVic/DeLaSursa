package org.example.delasursa.common.mappers;

import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.PachetProdusItemDTO;
import org.example.delasursa.model.Pachet;
import org.example.delasursa.model.PachetProdus;
import org.example.delasursa.model.Producator;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.beans.factory.annotation.Value; // IMPORT NOU
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class PachetMapper {

    // 1. Injectăm URL-ul serverului (definit în application.properties)
    // Asigură-te că ai linia: app.base.url=http://localhost:8080
    @Value("${app.base.url}")
    private String baseUrl;

    public PachetDTO toDTO(Pachet pachet) {
        if (pachet == null)
            return null;

        // 2. Procesăm imaginea principală a Pachetului
        String fullPachetImage = processImageUrl(pachet.getImagine());

        List<PachetProdusItemDTO> produseDTO = pachet.getPachetProduse() != null
                ? pachet.getPachetProduse().stream()
                .map(this::toProdusItemDTO)
                .toList()
                : Collections.emptyList();

        return PachetDTO.builder()
                .id(pachet.getId())
                .producatorId(pachet.getProducator() != null ? pachet.getProducator().getId() : null)
                .producatorNume(pachet.getProducator() != null ? pachet.getProducator().getNume() : null)
                .nume(pachet.getNume())

                // Folosim URL-ul procesat (absolut)
                .imagine(fullPachetImage)

                .produse(produseDTO)
                .pretTotal(pachet.getPretTotal())
                .pretAbonament(pachet.getPretAbonament())
                .descriere(pachet.getDescriere())
                .eAbonament(pachet.getEAbonament())
                .frecventaLivrare(pachet.getFrecventaLivrare())
                .build();
    }

    public Pachet toEntity(PachetDTO dto) {
        if (dto == null) {
            return null;
        }

        Pachet pachet = new Pachet();
        pachet.setId(dto.getId());
        pachet.setNume(dto.getNume());

        // La salvare păstrăm calea relativă (sau cum vine din frontend)
        // De obicei frontend-ul trimite înapoi exact ce a primit sau calea relativă de la upload
        pachet.setImagine(dto.getImagine());

        pachet.setPretTotal(dto.getPretTotal());
        pachet.setPretAbonament(dto.getPretAbonament());
        pachet.setDescriere(dto.getDescriere());
        pachet.setEAbonament(dto.getEAbonament()); // Nu uita să mapezi și astea la entity
        pachet.setFrecventaLivrare(dto.getFrecventaLivrare());

        if (dto.getProducatorId() != null) {
            Producator producator = new Producator();
            producator.setId(dto.getProducatorId());
            pachet.setProducator(producator);
        }

        Set<PachetProdus> pachetProduse = new HashSet<>();

        if (dto.getProduse() != null) {
            for (PachetProdusItemDTO itemDTO : dto.getProduse()) {

                PachetProdus pachetProdus = new PachetProdus();
                pachetProdus.setId(itemDTO.getIdPachetProdus());
                pachetProdus.setCantitate(itemDTO.getCantitate());
                pachetProdus.setPretUnitar(itemDTO.getPretUnitar());
                pachetProdus.setPachet(pachet);

                // 🔗 ProdusProducator (referință by id)
                if (itemDTO.getIdProdusProducator() != null) {
                    ProdusProducator produs = new ProdusProducator();
                    produs.setId(itemDTO.getIdProdusProducator());
                    pachetProdus.setProdus(produs);
                }

                pachetProduse.add(pachetProdus);
            }
        }

        pachet.setPachetProduse(pachetProduse);

        return pachet;
    }

    private PachetProdusItemDTO toProdusItemDTO(PachetProdus pachetProdus) {
        if (pachetProdus == null)
            return null;

        ProdusProducator produsSursa = pachetProdus.getProdus();

        String numeAfisat = "Produs necunoscut";
        if (produsSursa != null) {
            if (produsSursa.getDenumirePersonalizata() != null && !produsSursa.getDenumirePersonalizata().isEmpty()) {
                numeAfisat = produsSursa.getDenumirePersonalizata();
            } else if (produsSursa.getProdus() != null) {
                numeAfisat = produsSursa.getProdus().getNume();
            }
        }

        double cantitate = pachetProdus.getCantitate() != null ? pachetProdus.getCantitate() : 0.0;
        double pretUnitar = pachetProdus.getPretUnitar() != null ? pachetProdus.getPretUnitar() : 0.0;

        return PachetProdusItemDTO.builder()
                .idPachetProdus(pachetProdus.getId())
                .idProdusProducator(produsSursa != null ? produsSursa.getId() : null)
                .numeProdus(numeAfisat)

                // Opțional: Aplicăm logica și la produsele din interior, ca să nu fie link-uri moarte
                .imagineProdus(produsSursa != null ? processImageUrl(produsSursa.getImagine()) : null)

                .unitateMasura(produsSursa != null ? produsSursa.getUnitateMasura() : null)
                .cantitate(cantitate)
                .pretUnitar(pretUnitar)
                .pretTotalProdus(cantitate * pretUnitar)
                .build();
    }

    // --- METODĂ AJUTĂTOARE PENTRU URL ---
    private String processImageUrl(String imagePath) {
        if (imagePath == null || imagePath.isBlank()) {
            return null;
        }
        if (imagePath.startsWith("http")) {
            return imagePath;
        }
        return baseUrl + imagePath;
    }
}