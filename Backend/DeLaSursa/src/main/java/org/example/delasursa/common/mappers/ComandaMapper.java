package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.comanda.ComandaDto;
import org.example.delasursa.model.Comanda;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ComandaMapper {

    private final ClientMapper clientMapper;
    private final ComandaProdusMapper comandaProdusMapper;
    private final AdresaMapper adresaMapper;
    private final MetodaLivrarePretMapper metodaLivrarePretMapper;
    private final ComandaPachetMapper comandaPachetMapper;

    public ComandaDto toDto(Comanda entity) {
        return ComandaDto.builder()
                .id(entity.getId())
                .dataEfectuarii(entity.getDataEfectuarii())
                .client(clientMapper.toDto(entity.getClient()))
                .comandaProduse(entity.getComandaProduse()
                        .stream()
                        .map(comandaProdusMapper::toDto)
                        .collect(Collectors.toSet()))
                .statusComanda(entity.getStatusComanda())
                .adresaLivrare(adresaMapper.toDto(entity.getAdresaLivrare()))
                .adresaFacturare(adresaMapper.toDto(entity.getAdresaFacturare()))
                .metodaLivrare(metodaLivrarePretMapper.toDto(entity.getMetodaLivrare()))
                .metodaPlata(entity.getMetodaPlata())
                .observatii(entity.getObservatii())
                .comandaPachete(entity.getComandaPachete()
                        .stream()
                        .map(comandaPachetMapper::toDto)
                        .collect(Collectors.toSet())
                )
                .build();
    }
}
