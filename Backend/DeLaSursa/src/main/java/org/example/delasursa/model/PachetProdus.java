package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pachet_produs", schema = "public")
@Data
public class PachetProdus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pachet", nullable = false)
    private Pachete idPachet;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private Produse idProdus;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "pret_unitar")
    private Double pretUnitar;


}