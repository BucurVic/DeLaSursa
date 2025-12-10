package org.example.delasursa.common.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComandaSummary {
    private Integer id;
    private String numeClient;
    private LocalDate dataEfectuarii;
    private Integer numarProduse;
    private Double valoareTotala;
}
