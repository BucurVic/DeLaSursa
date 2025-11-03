package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "produs_producator", schema = "public")
@Data
public class ProdusProducator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producator", nullable = false)
    private Producatori idProducator;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private Produse idProdus;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "unitate_masura", length = Integer.MAX_VALUE)
    private String unitateMasura;

    @Column(name = "pret")
    private Double pret;


}