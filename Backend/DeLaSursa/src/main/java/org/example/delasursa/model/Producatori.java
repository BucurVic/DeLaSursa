package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "producatori", schema = "public")
@Data
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

}