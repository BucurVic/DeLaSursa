package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "pachete", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"pachetProduse", "comandaPachete", "subscriptii"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Pachet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producator", nullable = false)
    private Producator producator;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "categorie", length = Integer.MAX_VALUE)
    private String categorie;

    @Column(name = "cantitate")
    private Integer cantitate;

    @Column(name = "pret")
    private Double pret;

    @OneToMany(mappedBy = "pachet")
    private Set<PachetProdus> pachetProduse = new LinkedHashSet<>();

    @OneToMany(mappedBy = "pachet")
    private Set<ComandaPachet> comandaPachete = new LinkedHashSet<>();

    @OneToMany(mappedBy = "pachet")
    private Set<Subscriptie> subscriptii = new LinkedHashSet<>();


}