package org.example.delasursa.common.dto.pachet;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private Double pretAbonament;

    // --- CÂMPURI NOI ADĂUGATE ---
    private String descriere;
    @JsonProperty("eAbonament")
    private Boolean eAbonament;
    private Integer frecventaLivrare;

    private List<PachetProdusItemDTO> produse;
}