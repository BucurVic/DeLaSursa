package org.example.delasursa.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor @AllArgsConstructor
public class UpdateProdusRequest {
    private Double pret;
    private Double cantiate;
    private String unitateMasura;
    private MultipartFile imagine;
}
