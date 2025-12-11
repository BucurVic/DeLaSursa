package org.example.delasursa.common.mappers;

import org.example.delasursa.common.dto.comanda.ComandaProdusDto;
import org.example.delasursa.model.ComandaProdus;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ComandaProdusMapper {
    @Value("${app.base.url}")
    private String baseUrl;

    public ComandaProdusDto toDto(ComandaProdus entity) {
        return ComandaProdusDto.builder()
                .id(entity.getId())
                .produs(toDto(entity.getProdus()))
                .pretUnitar(entity.getPretUnitar())
                .cantitate(entity.getCantitate())
                .build();
    }

    public ComandaProdusDto.ProdusComandaProdusDto toDto(ProdusProducator entity) {
        return ComandaProdusDto.ProdusComandaProdusDto
                .builder()
                .produsProducatorId(entity.getId())
                .numeProdus(entity.getProdus().getNume())
                .categorie(entity.getProdus().getCategorie())
                .numeProducator(entity.getProducator().getNume())
                .pret(entity.getPret())
                .imagineProdus(
                        entity.getImagine() != null
                                ? baseUrl + entity.getImagine()
                                : null
                )
                .unitateDeMasura(entity.getUnitateMasura())
                .build();
    }
}
