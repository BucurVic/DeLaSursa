package org.example.delasursa.model;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "pachete", schema = "public")
public class Pachete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producator", nullable = false)
    private Producatori idProducator;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "categorie", length = Integer.MAX_VALUE)
    private String categorie;

    @Column(name = "cantitate")
    private Integer cantitate;

    @Column(name = "pret")
    private Double pret;

    @OneToMany(mappedBy = "idPachet")
    private Set<PachetProdus> pachetProduses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idPachet")
    private Set<Subscriptii> subscriptiis = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Producatori getIdProducator() {
        return idProducator;
    }

    public void setIdProducator(Producatori idProducator) {
        this.idProducator = idProducator;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public Integer getCantitate() {
        return cantitate;
    }

    public void setCantitate(Integer cantitate) {
        this.cantitate = cantitate;
    }

    public Double getPret() {
        return pret;
    }

    public void setPret(Double pret) {
        this.pret = pret;
    }

    public Set<PachetProdus> getPachetProduses() {
        return pachetProduses;
    }

    public void setPachetProduses(Set<PachetProdus> pachetProduses) {
        this.pachetProduses = pachetProduses;
    }

    public Set<Subscriptii> getSubscriptiis() {
        return subscriptiis;
    }

    public void setSubscriptiis(Set<Subscriptii> subscriptiis) {
        this.subscriptiis = subscriptiis;
    }

}