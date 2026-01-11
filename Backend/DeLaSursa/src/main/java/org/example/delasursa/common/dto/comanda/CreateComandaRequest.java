package org.example.delasursa.common.dto.comanda;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.delasursa.common.dto.enums.MetodaLivrare;
import org.example.delasursa.common.dto.enums.MetodaPlata;
import org.example.delasursa.model.Adresa;
import org.example.delasursa.model.MetodaLivrarePret;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateComandaRequest {
    private Integer clientId;
    private List<CreateComandaProdusDto> comandaProduseList;
    private MetodaPlata metodaPlata;
    private Adresa adresaLivrare;
    private Adresa adresaFacturare;
    private MetodaLivrare metodaLivrare;
    private String observatii;
}
