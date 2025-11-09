package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "clienti", schema = "public")
@Getter @Setter
@ToString(exclude = {"comenzi", "subscriptii"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor @AllArgsConstructor
public class Client {
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

    @Column(name = "telefon", length = Integer.MAX_VALUE)
    private String telefon;

    @Column(name = "prenume", length = Integer.MAX_VALUE)
    private String prenume;

    @OneToMany(mappedBy = "client")
    private Set<Comanda> comenzi = new LinkedHashSet<>();

    @OneToMany(mappedBy = "client")
    private Set<Subscriptie> subscriptii = new LinkedHashSet<>();

}