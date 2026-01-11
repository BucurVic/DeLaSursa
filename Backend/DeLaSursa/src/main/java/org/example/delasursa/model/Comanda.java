package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.delasursa.common.dto.enums.ComandaStatus;
import org.example.delasursa.common.dto.enums.MetodaLivrare;
import org.example.delasursa.common.dto.enums.MetodaPlata;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "comenzi", schema = "public")
@Getter
@Setter
@ToString(exclude = {"comandaPachete", "comandaProduse"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor @AllArgsConstructor
public class Comanda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @Column(name = "data_efectuarii")
    private LocalDate dataEfectuarii;

    @OneToMany(mappedBy = "comanda")
    private Set<ComandaPachet> comandaPachete = new LinkedHashSet<>();

    @OneToMany(mappedBy = "comanda", cascade = CascadeType.PERSIST)
    private Set<ComandaProdus> comandaProduse = new LinkedHashSet<>();

    private ComandaStatus statusComanda;

    @ManyToOne
    private Adresa adresaLivrare;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Adresa adresaFacturare;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private MetodaLivrarePret metodaLivrare;

    private MetodaPlata metodaPlata;

    private String observatii;
}