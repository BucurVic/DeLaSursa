package org.example.delasursa.common.dto.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {
    private Integer id;
    private String nume;
    private String prenume;
    private String telefon;
    private String email; // Luat din tabela User
}