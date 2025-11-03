package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "pachete", schema = "public")
@Data
public class Pachete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producator", nullable = false)
    private Producatori idProducator;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "categorie", length = Integer.MAX_VALUE)
    private String categorie;

    @Column(name = "cantitate")
    private Integer cantitate;

    @Column(name = "pret")
    private Double pret;

    @OneToMany(mappedBy = "idPachet")
    private Set<PachetProdus> pachetProduses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idPachet")
    private Set<Subscriptii> subscriptiis = new LinkedHashSet<>();


}