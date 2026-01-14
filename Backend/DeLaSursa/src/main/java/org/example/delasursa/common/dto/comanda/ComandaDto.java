package org.example.delasursa.common.dto.comanda;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.delasursa.common.dto.ClientDto;
import org.example.delasursa.common.dto.adresa.AdresaDto;
import org.example.delasursa.common.dto.enums.ComandaStatus;
import org.example.delasursa.common.dto.enums.MetodaPlata;
import org.example.delasursa.common.dto.metoda_livrare.MetodaLivrarePretDto;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComandaDto {
    Integer id;
    ClientDto client;
    LocalDate dataEfectuarii;
    Set<ComandaProdusDto> comandaProduse;
    ComandaStatus statusComanda;
    AdresaDto adresaLivrare;
    AdresaDto adresaFacturare;
    MetodaLivrarePretDto metodaLivrare;
    MetodaPlata metodaPlata;
    String observatii;
}