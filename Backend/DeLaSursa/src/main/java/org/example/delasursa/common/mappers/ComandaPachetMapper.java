package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.dto.comanda.ComandaPachetDto;
import org.example.delasursa.model.ComandaPachet;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ComandaPachetMapper {
    private final PachetMapper pachetMapper;

    public ComandaPachetDto toDto(ComandaPachet comandaPachet) {
        return ComandaPachetDto.builder()
                .id(comandaPachet.getId())
                .pachet(pachetMapper.toDTO(comandaPachet.getPachet()))
                .cantitate(comandaPachet.getCantitate())
                .build();
    }
}
