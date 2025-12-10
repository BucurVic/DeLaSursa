package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comanda_produs", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"comanda", "produs"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ComandaProdus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_comanda", nullable = false)
    private Comanda comanda;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private ProdusProducator produs;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "pret_unitar")
    private Double pretUnitar;

}