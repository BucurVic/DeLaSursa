package org.example.delasursa.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "subscriptii", schema = "public")
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

    public Pachete getIdPachet() {
        return idPachet;
    }

    public void setIdPachet(Pachete idPachet) {
        this.idPachet = idPachet;
    }

    public LocalDate getDataInceput() {
        return dataInceput;
    }

    public void setDataInceput(LocalDate dataInceput) {
        this.dataInceput = dataInceput;
    }

    public Integer getFreceventa() {
        return freceventa;
    }

    public void setFreceventa(Integer freceventa) {
        this.freceventa = freceventa;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}