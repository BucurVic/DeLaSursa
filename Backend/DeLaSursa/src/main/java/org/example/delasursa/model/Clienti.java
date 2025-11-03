package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "clienti", schema = "public")
@Data
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

}