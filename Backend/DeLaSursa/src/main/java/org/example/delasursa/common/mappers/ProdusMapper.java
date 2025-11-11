package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProdusMapper {
    @Value("${app.base.url}")
    private static String baseUrl;

    public static ProdusDTO toDTO(ProdusProducator entity){
        if(entity==null) return null;

        return ProdusDTO.builder()
                .id(entity.getId())
                .produsName(entity.getProdus().getNume())
                .producatorName(entity.getProducator().getNume() + ' ' + entity.getProducator().getPrenume())
                .categorie(entity.getProdus().getCategorie())
                .pret(entity.getPret())
                .unitate_masura(entity.getUnitateMasura())
                .produsImagine(
                        entity.getImagine() != null
                            ? baseUrl + entity.getImagine()
                            : null
                )
                .build();
    }

}
