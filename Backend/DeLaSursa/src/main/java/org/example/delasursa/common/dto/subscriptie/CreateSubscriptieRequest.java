package org.example.delasursa.common.dto.subscriptie;

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
    // Scoatem clientId - il luam automat din Userul logat
    private Integer idPachet;
    private LocalDate dataInceput;
    private Integer frecventa;
}