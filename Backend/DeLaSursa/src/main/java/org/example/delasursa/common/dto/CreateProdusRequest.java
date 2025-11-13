package org.example.delasursa.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor @AllArgsConstructor
public class CreateProdusRequest {
    private String nume;
    private String categorie;


    private Double cantitate;
    private String unitateMasura;
    private Double pret;

    private MultipartFile imagine;
}
