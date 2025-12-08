package org.example.delasursa.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateComandaRequest {
    private Integer clientId;
    private List<CreateComandaProdusDto> comandaProduseList;
}
