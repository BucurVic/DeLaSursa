package org.example.delasursa.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "comenzi", schema = "public")
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Clienti getIdClient() {
        return idClient;
    }

    public void setIdClient(Clienti idClient) {
        this.idClient = idClient;
    }

    public LocalDate getDataEfectuarii() {
        return dataEfectuarii;
    }

    public void setDataEfectuarii(LocalDate dataEfectuarii) {
        this.dataEfectuarii = dataEfectuarii;
    }

    public Set<ComandaPachet> getComandaPachets() {
        return comandaPachets;
    }

    public void setComandaPachets(Set<ComandaPachet> comandaPachets) {
        this.comandaPachets = comandaPachets;
    }

    public Set<ComandaProdus> getComandaProduses() {
        return comandaProduses;
    }

    public void setComandaProduses(Set<ComandaProdus> comandaProduses) {
        this.comandaProduses = comandaProduses;
    }

}