package org.example.delasursa.common.dto.adresa;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdresaDto {
    Integer id;
    String numeComplet;
    String telefon;
    String stradaNumeNumar;
    String localitate;
    String judet;
    String codPostal;
}
