package org.example.delasursa.common.dto.metoda_livrare;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.delasursa.common.dto.enums.MetodaLivrare;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MetodaLivrarePretDto {
    Integer id;
    MetodaLivrare metodaLivrare;
    Double pret;
}
