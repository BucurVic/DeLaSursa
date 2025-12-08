package org.example.delasursa.common.dto.comanda;

import lombok.*;
import org.example.delasursa.common.dto.ClientDto;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComandaDto {
    Integer id;
    ClientDto client;
    LocalDate dataEfectuarii;
    Set<ComandaProdusDto> comandaProduse;
}