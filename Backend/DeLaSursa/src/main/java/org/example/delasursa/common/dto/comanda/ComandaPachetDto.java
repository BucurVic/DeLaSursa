package org.example.delasursa.common.dto.comanda;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.delasursa.common.dto.pachet.PachetDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComandaPachetDto {
    Integer id;
    PachetDTO pachet;
    Double cantitate;
}
