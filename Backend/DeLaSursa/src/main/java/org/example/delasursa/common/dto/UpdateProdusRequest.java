package org.example.delasursa.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class UpdateProdusRequest {
    private Double pret;
    private Double cantiate;
    private String unitateMasura;
}
