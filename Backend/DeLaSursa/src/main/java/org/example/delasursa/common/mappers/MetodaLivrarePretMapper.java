package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.enums.MetodaLivrare;
import org.example.delasursa.common.dto.metoda_livrare.MetodaLivrarePretDto;
import org.example.delasursa.model.MetodaLivrarePret;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MetodaLivrarePretMapper {
    public MetodaLivrarePretDto toDto(MetodaLivrarePret metodaLivrarePret) {
        return MetodaLivrarePretDto.builder()
                .id(metodaLivrarePret.getId())
                .metodaLivrare(metodaLivrarePret.getMetodaLivrare())
                .pret(metodaLivrarePret.getPret())
                .build();
    }

    private Integer mapMetodaToInt(MetodaLivrare metodaLivrare) {
        return switch (metodaLivrare) {
            case HOME_DELIVERY -> 0;
            case SELF_PICKUP -> 1;
        };
    }
}
