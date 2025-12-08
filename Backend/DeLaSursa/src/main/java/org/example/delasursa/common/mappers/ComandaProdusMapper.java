package org.example.delasursa.common.mappers;

import org.example.delasursa.common.dto.comanda.ComandaProdusDto;
import org.example.delasursa.model.ComandaProdus;
import org.example.delasursa.model.Produs;
import org.springframework.stereotype.Component;

@Component
public class ComandaProdusMapper {

    public ComandaProdusDto toDto(ComandaProdus entity){
        return ComandaProdusDto.builder()
                .id(entity.getId())
                .produs(toDto(entity.getProdus()))
                .pretUnitar(entity.getPretUnitar())
                .cantitate(entity.getCantitate())
                .build();
    }

    public ComandaProdusDto.ProdusComandaProdusDto toDto(Produs entity){
        return ComandaProdusDto.ProdusComandaProdusDto
                .builder()
                .nume(entity.getNume())
                .categorie(entity.getCategorie())
                .build();
    }
}
