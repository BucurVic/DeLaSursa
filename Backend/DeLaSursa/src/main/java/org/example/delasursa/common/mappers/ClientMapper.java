package org.example.delasursa.common.mappers;

import org.example.delasursa.common.dto.ClientDto;
import org.example.delasursa.model.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public ClientDto toDto(Client client){
        return ClientDto.builder()
                .id(client.getId())
                .nume(client.getNume())
                .prenume(client.getPrenume())
                .telefon(client.getTelefon())
                .build();
    }
}
