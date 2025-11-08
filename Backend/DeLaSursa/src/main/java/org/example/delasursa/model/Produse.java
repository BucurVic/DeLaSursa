package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "produse", schema = "public")
@Data
public class Produse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "categorie", length = Integer.MAX_VALUE)
    private String categorie;

    @OneToMany(mappedBy = "idProdus")
    private Set<ComandaPachet> comandaPachets = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProdus")
    private Set<ComandaProdus> comandaProduses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProdus")
    private Set<PachetProdus> pachetProduses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProdus")
    private Set<ProdusProducator> produsProducators = new LinkedHashSet<>();


}