package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Adresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    private String numeComplet;

    private String telefon;

    private String stradaNumeNumar;

    private String localitate;

    private String judet;

    private String codPostal;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Adresa adresa = (Adresa) o;
        return Objects.equals(numeComplet, adresa.getNumeComplet()) && Objects.equals(telefon, adresa.telefon) && Objects.equals(localitate, adresa.localitate) && Objects.equals(judet, adresa.judet) && Objects.equals(codPostal, adresa.codPostal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(numeComplet, telefon, localitate, judet, codPostal);
    }
}
