package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pachet_produs", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"pachet", "produs"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PachetProdus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pachet", nullable = false)
    private Pachet pachet;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private Produs produs;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "pret_unitar")
    private Double pretUnitar;


}