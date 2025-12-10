package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "produs_producator", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"producator", "produs","comandaProduse", "pachetProduse"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
public class ProdusProducator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producator", nullable = false)
    private Producator producator;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private Produs produs;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "unitate_masura", length = Integer.MAX_VALUE)
    private String unitateMasura;

    @Column(name = "pret")
    private Double pret;

    @Column(name = "imagine", length = Integer.MAX_VALUE)
    private String imagine;

    @Column(name = "denumire_personalizata")
    private String denumirePersonalizata;

    @OneToMany(mappedBy = "produs")
    private Set<ComandaProdus> comandaProduse = new LinkedHashSet<>();

    @OneToMany(mappedBy = "produs")
    private Set<PachetProdus> pachetProduse = new LinkedHashSet<>();

}