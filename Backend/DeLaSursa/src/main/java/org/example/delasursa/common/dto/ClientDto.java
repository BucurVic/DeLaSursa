package org.example.delasursa.common.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDto {
    Integer id;
    String nume;
    String telefon;
    String prenume;
}