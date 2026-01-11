package org.example.delasursa.common.dto.subscriptie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptieDTO {
    private Integer id;
    private Integer clientId;
    private Integer pachetId;
    private LocalDate dataInceput;
    private Integer freceventa;
    private String status;
}

