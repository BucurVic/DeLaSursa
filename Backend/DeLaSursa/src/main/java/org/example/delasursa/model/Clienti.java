package org.example.delasursa.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "clienti", schema = "public")
public class Clienti {
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

    @Column(name = "telefon", length = Integer.MAX_VALUE)
    private String telefon;

    @Column(name = "prenume", length = Integer.MAX_VALUE)
    private String prenume;

    @OneToMany(mappedBy = "idClient")
    private Set<Comenzi> comenzis = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idClient")
    private Set<Subscriptii> subscriptiis = new LinkedHashSet<>();

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

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public Set<Comenzi> getComenzis() {
        return comenzis;
    }

    public void setComenzis(Set<Comenzi> comenzis) {
        this.comenzis = comenzis;
    }

    public Set<Subscriptii> getSubscriptiis() {
        return subscriptiis;
    }

    public void setSubscriptiis(Set<Subscriptii> subscriptiis) {
        this.subscriptiis = subscriptiis;
    }

}