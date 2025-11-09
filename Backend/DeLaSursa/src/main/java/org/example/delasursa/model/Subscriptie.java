package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "subscriptii", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"client", "pachet"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Subscriptie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pachet", nullable = false)
    private Pachet pachet;

    @Column(name = "data_inceput")
    private LocalDate dataInceput;

    @Column(name = "freceventa")
    private Integer freceventa;

    @Column(name = "status", length = Integer.MAX_VALUE)
    private String status;


}