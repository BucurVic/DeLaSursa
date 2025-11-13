package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "producatori", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"produsProducatori", "pachete"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Producator {
    @Id
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id", nullable = false)
    private User user;

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

    @OneToMany(mappedBy = "producator")
    private Set<Pachet> pachete = new LinkedHashSet<>();

    @OneToMany(mappedBy = "producator")
    private Set<ProdusProducator> produsProducatori = new LinkedHashSet<>();

}