package org.example.delasursa.common.dto.comanda;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.delasursa.common.dto.enums.ComandaStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateComandaRequest {
    private ComandaStatus newStatus;
}
