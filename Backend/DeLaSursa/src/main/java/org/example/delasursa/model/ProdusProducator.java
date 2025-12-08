package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produs_producator", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"producator", "produs"})
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

}