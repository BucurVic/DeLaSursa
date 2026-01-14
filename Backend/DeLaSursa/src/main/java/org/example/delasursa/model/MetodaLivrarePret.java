package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.example.delasursa.common.dto.enums.MetodaLivrare;

@Entity
@Getter
@Setter
public class MetodaLivrarePret {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;


    @Column(unique = true)
    @Enumerated(EnumType.ORDINAL)
    private MetodaLivrare metodaLivrare;
    private Double pret;
}
