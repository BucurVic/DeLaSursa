package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.produs.ProdusDTO;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProdusMapper {
    @Value("${app.base.url}")
    private  String baseUrl;

    public ProdusDTO toDTO(ProdusProducator entity){
        if(entity==null) return null;

        String produsName = (entity.getDenumirePersonalizata() != null && !entity.getDenumirePersonalizata().isBlank())
                ? entity.getDenumirePersonalizata()
                : entity.getProdus().getNume();

        return ProdusDTO.builder()
                .id(entity.getId())
                .produsName(produsName)
                .producatorName(entity.getProducator().getNume() + ' ' + entity.getProducator().getPrenume())
                .categorie(entity.getProdus().getCategorie())
                .pret(entity.getPret())
                .unitate_masura(entity.getUnitateMasura())
                .produsImagine(
                        entity.getImagine() != null
                            ? baseUrl + entity.getImagine()
                            : null
                )
                .cantitate(entity.getCantitate())
                .build();
    }

}
