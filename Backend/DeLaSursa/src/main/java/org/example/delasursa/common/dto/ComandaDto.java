package org.example.delasursa.common.dto;

import lombok.*;

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