package org.example.delasursa.common.dto.pachet;

import jakarta.validation.constraints.NotEmpty;
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
public class UpdatePachetRequest {

    private String nume;

    private MultipartFile imagine;

    @NotEmpty(message = "Lista de produse nu poate fi goală la actualizare")
    private List<PachetProdusRequest> produse;
}