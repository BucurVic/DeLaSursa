package org.example.delasursa.common.dto.pachet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePachetRequest {


    @NotBlank(message = "Numele pachetului este obligatoriu")
    private String nume;

    private MultipartFile imagine;

    @NotEmpty(message = "Pachetul trebuie să conțină cel puțin un produs")
    private List<PachetProdusRequest> produse;
}