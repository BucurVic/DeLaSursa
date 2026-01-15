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

    @Column(name = "imagine", length = Integer.MAX_VALUE)
    private String imagine;

    // --- CÂMPURI NOI PENTRU ABONAMENTE ---

    @Column(name = "descriere", length = 1000)
    private String descriere;

    @Column(name = "pret_total")
    private Double pretTotal; // Acesta lipsea din entitatea ta inițială

    @Column(name = "pret_abonament")
    private Double pretAbonament;

    @Column(name = "e_abonament")
    private Boolean eAbonament = false; // Default false (pachet normal)

    @Column(name = "frecventa_livrare")
    private Integer frecventaLivrare; // 7, 14, 30 zile

    // --- RELAȚII ---

    @OneToMany(mappedBy = "pachet", cascade = CascadeType.ALL)
    private Set<PachetProdus> pachetProduse = new LinkedHashSet<>();

    @OneToMany(mappedBy = "pachet")
    private Set<ComandaPachet> comandaPachete = new LinkedHashSet<>();

    @OneToMany(mappedBy = "pachet")
    private Set<Subscriptie> subscriptii = new LinkedHashSet<>();
}