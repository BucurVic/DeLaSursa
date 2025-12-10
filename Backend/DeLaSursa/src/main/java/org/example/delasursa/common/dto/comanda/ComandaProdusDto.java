package org.example.delasursa.common.dto.comanda;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComandaProdusDto {
    Integer id;
    ProdusComandaProdusDto produs;
    Double cantitate;
    Double pretUnitar;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ProdusComandaProdusDto implements Serializable {
        Integer produsProducatorId;
        String numeProdus;
        String categorie;
        String numeProducator;
        Double pret;
    }
}