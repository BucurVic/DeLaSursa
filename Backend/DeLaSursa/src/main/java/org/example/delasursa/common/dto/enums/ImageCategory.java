package org.example.delasursa.common.dto.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ImageCategory {
    PRODUS("produse"),
    PACHET("pachete");

    private final String folderName;
}
