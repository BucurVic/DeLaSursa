package org.example.delasursa.model;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "produse", schema = "public")
public class Produse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "categorie", length = Integer.MAX_VALUE)
    private String categorie;

    @OneToMany(mappedBy = "idProdus")
    private Set<ComandaPachet> comandaPachets = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProdus")
    private Set<ComandaProdus> comandaProduses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProdus")
    private Set<PachetProdus> pachetProduses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProdus")
    private Set<ProdusProducator> produsProducators = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Set<PachetProdus> getPachetProduses() {
        return pachetProduses;
    }

    public void setPachetProduses(Set<PachetProdus> pachetProduses) {
        this.pachetProduses = pachetProduses;
    }

    public Set<ProdusProducator> getProdusProducators() {
        return produsProducators;
    }

    public void setProdusProducators(Set<ProdusProducator> produsProducators) {
        this.produsProducators = produsProducators;
    }

}