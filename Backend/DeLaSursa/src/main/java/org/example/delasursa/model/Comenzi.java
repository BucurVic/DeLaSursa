package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "comenzi", schema = "public")
@Data
public class Comenzi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    private Clienti idClient;

    @Column(name = "data_efectuarii")
    private LocalDate dataEfectuarii;

    @OneToMany(mappedBy = "idComanda")
    private Set<ComandaPachet> comandaPachets = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idComanda")
    private Set<ComandaProdus> comandaProduses = new LinkedHashSet<>();

}