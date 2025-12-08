package org.example.delasursa.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateComandaProdusDto {
    private Double cantitate;
    private Double pretUnitar;
    private Integer produsId;
}
