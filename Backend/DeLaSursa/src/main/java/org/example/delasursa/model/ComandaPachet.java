package org.example.delasursa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "comanda_pachet", schema = "public")
public class ComandaPachet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_comanda", nullable = false)
    private Comenzi idComanda;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_produs", nullable = false)
    private Produse idProdus;

    @Column(name = "cantitate")
    private Double cantitate;

    @Column(name = "pret_unitar")
    private Double pretUnitar;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Comenzi getIdComanda() {
        return idComanda;
    }

    public void setIdComanda(Comenzi idComanda) {
        this.idComanda = idComanda;
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

    public Double getPretUnitar() {
        return pretUnitar;
    }

    public void setPretUnitar(Double pretUnitar) {
        this.pretUnitar = pretUnitar;
    }

}