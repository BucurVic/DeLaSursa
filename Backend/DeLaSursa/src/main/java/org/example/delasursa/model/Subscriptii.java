package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "subscriptii", schema = "public")
@Data
public class Subscriptii {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    private Clienti idClient;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pachet", nullable = false)
    private Pachete idPachet;

    @Column(name = "data_inceput")
    private LocalDate dataInceput;

    @Column(name = "freceventa")
    private Integer freceventa;

    @Column(name = "status", length = Integer.MAX_VALUE)
    private String status;


}