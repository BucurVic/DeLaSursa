package org.example.delasursa.common.mappers;

import org.example.delasursa.common.dto.ProdusDTO;
import org.example.delasursa.model.Produs;
import org.example.delasursa.model.ProdusProducator;

public class ProdusMapper {

    public static ProdusDTO toDTO(ProdusProducator entity){
        if(entity==null) return null;

        return ProdusDTO.builder()
                .id(entity.getId())
                .produsName(entity.getProdus().getNume())
                .producatorName(entity.getProducator().getNume() + ' ' + entity.getProducator().getPrenume())
                .categorie(entity.getProdus().getCategorie())
                .pret(entity.getPret())
                .unitate_masura(entity.getUnitateMasura())
                .build();
    }

}
