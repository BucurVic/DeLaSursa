package org.example.delasursa.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProdusDTO {

    private Integer id;
    private String produsName;
    private String categorie;
    private String produsImagine;

    private String producatorName;
    private Double pret;
    private String unitate_masura;

}
