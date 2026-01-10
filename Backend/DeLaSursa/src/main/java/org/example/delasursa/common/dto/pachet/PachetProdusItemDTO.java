package org.example.delasursa.common.dto.pachet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PachetProdusItemDTO {
    private Integer idPachetProdus;
    private Integer idProdusProducator;

    private String numeProdus;
    private String imagineProdus;

    private Double cantitate;
    private String unitateMasura;
    private Double pretUnitar;
    private Double pretTotalProdus;

}
