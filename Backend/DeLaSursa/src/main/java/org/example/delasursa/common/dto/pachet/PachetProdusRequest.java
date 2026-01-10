package org.example.delasursa.common.dto.pachet;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PachetProdusRequest {

    @NotNull(message = "ID-ul produsului este obligatoriu")
    private Integer idProdus;

    @NotNull(message = "Cantitatea este obligatorie")
    @Min(value = 0, message = "Cantitatea trebuie să fie pozitivă")
    private Double cantitate;

    @NotNull(message = "Prețul unitar este obligatoriu")
    @Min(value = 0, message = "Prețul trebuie să fie pozitiv")
    private Double pretUnitar;
}