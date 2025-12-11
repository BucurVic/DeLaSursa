package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "produse", schema = "public")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"produsProducatori",})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Produs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @Column(name = "nume", length = Integer.MAX_VALUE)
    private String nume;

    @Column(name = "categorie", length = Integer.MAX_VALUE)
    private String categorie;


    @OneToMany(mappedBy = "produs")
    private Set<ProdusProducator> produsProducatori = new LinkedHashSet<>();


}