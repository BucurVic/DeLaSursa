package org.example.delasursa.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "producatori", schema = "public")
public class Producatori {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id", nullable = false)
    private Useri useri;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "prenume", length = Integer.MAX_VALUE)
    private String prenume;

    @Column(name = "adresa", length = Integer.MAX_VALUE)
    private String adresa;

    @Column(name = "telefon", length = Integer.MAX_VALUE)
    private String telefon;

    @Column(name = "regiune", length = Integer.MAX_VALUE)
    private String regiune;

    @OneToMany(mappedBy = "idProducator")
    private Set<Pachete> pachetes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProducator")
    private Set<ProdusProducator> produsProducators = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Useri getUseri() {
        return useri;
    }

    public void setUseri(Useri useri) {
        this.useri = useri;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getRegiune() {
        return regiune;
    }

    public void setRegiune(String regiune) {
        this.regiune = regiune;
    }

    public Set<Pachete> getPachetes() {
        return pachetes;
    }

    public void setPachetes(Set<Pachete> pachetes) {
        this.pachetes = pachetes;
    }

    public Set<ProdusProducator> getProdusProducators() {
        return produsProducators;
    }

    public void setProdusProducators(Set<ProdusProducator> produsProducators) {
        this.produsProducators = produsProducators;
    }

}