package org.example.delasursa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "produs_producator", schema = "public")
public class ProdusProducator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producator", nullable = false)
    private Producatori idProducator;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private Produse idProdus;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "unitate_masura", length = Integer.MAX_VALUE)
    private String unitateMasura;

    @Column(name = "pret")
    private Double pret;

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

    public Produse getIdProdus() {
        return idProdus;
    }

    public void setIdProdus(Produse idProdus) {
        this.idProdus = idProdus;
    }

    public Double getCantitate() {
        return cantitate;
    }

    public void setCantitate(Double cantitate) {
        this.cantitate = cantitate;
    }

    public String getUnitateMasura() {
        return unitateMasura;
    }

    public void setUnitateMasura(String unitateMasura) {
        this.unitateMasura = unitateMasura;
    }

    public Double getPret() {
        return pret;
    }

    public void setPret(Double pret) {
        this.pret = pret;
    }

}