package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.adresa.AdresaDto;
import org.example.delasursa.model.Adresa;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdresaMapper {
    public AdresaDto toDto(Adresa adresa) {
        return AdresaDto.builder()
                .id(adresa.getId())
                .numeComplet(adresa.getNumeComplet())
                .telefon(adresa.getTelefon())
                .stradaNumeNumar(adresa.getStradaNumeNumar())
                .localitate(adresa.getLocalitate())
                .judet(adresa.getJudet())
                .codPostal(adresa.getCodPostal())
                .build();
    }
}
