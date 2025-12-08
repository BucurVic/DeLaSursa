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

    public ComandaDto toDto(Comanda entity){
        return ComandaDto.builder()
                .id(entity.getId())
                .dataEfectuarii(entity.getDataEfectuarii())
                .client(clientMapper.toDto(entity.getClient()))
                .comandaProduse(entity.getComandaProduse()
                        .stream()
                        .map(comandaProdusMapper::toDto)
                        .collect(Collectors.toSet()))
                .build();

    }
}
