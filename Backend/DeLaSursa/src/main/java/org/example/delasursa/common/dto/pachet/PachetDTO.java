package org.example.delasursa.common.dto.pachet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PachetDTO {
    private Integer id;

    private Integer producatorId;
    private String producatorNume;

    private String nume;
    private String imagine;


    private Double pretTotal;

    private List<PachetProdusItemDTO> produse;
}
