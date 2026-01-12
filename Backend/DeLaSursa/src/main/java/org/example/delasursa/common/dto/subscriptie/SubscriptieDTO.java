package org.example.delasursa.common.dto.subscriptie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.delasursa.common.dto.pachet.PachetDTO;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptieDTO {
    private Integer id;
    private Integer clientId;
    private PachetDTO pachet;
    private LocalDate dataInceput;
    private Integer freceventa;
    private String status;
}

