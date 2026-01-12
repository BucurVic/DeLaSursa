package org.example.delasursa.common.mappers;

import org.example.delasursa.common.dto.pachet.PachetDTO;
import org.example.delasursa.common.dto.pachet.PachetProdusItemDTO;
import org.example.delasursa.model.Pachet;
import org.example.delasursa.model.PachetProdus;
import org.example.delasursa.model.Producator;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class PachetMapper {
    public PachetDTO toDTO(Pachet pachet) {
        if (pachet == null)
            return null;

        List<PachetProdusItemDTO> produseDTO = pachet.getPachetProduse() != null
                ? pachet.getPachetProduse().stream()
                .map(this::toProdusItemDTO)
                .toList()
                : Collections.emptyList();

        double pretTotalCalculat = produseDTO.stream()
                .mapToDouble(item -> item.getPretTotalProdus() != null ? item.getPretTotalProdus() : 0.0)
                .sum();

        return PachetDTO.builder()
                .id(pachet.getId())
                .producatorId(pachet.getProducator() != null ? pachet.getProducator().getId() : null)
                .producatorNume(pachet.getProducator() != null ? pachet.getProducator().getNume() : null)
                .nume(pachet.getNume())
                .imagine(pachet.getImagine())
                .produse(produseDTO)
                .pretTotal(pretTotalCalculat)
                .build();
    }

    public Pachet toEntity(PachetDTO dto) {
        if (dto == null) {
            return null;
        }

        Pachet pachet = new Pachet();
        pachet.setId(dto.getId());
        pachet.setNume(dto.getNume());
        pachet.setImagine(dto.getImagine());

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
                .imagineProdus(produsSursa != null ? produsSursa.getImagine() : null)
                .unitateMasura(produsSursa != null ? produsSursa.getUnitateMasura() : null)
                .cantitate(cantitate)
                .pretUnitar(pretUnitar)
                .pretTotalProdus(cantitate * pretUnitar)
                .build();
    }
}
