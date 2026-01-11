package org.example.delasursa.common.dto.subscriptie;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSubscriptieRequest {
    private Integer clientId;
    private Integer pachetId;
    private LocalDate dataInceput;
    private Integer freceventa;
    private String status;
}

