package org.example.delasursa.repository;

import org.example.delasursa.model.Adresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdresaRepository extends JpaRepository<Adresa, Integer> {
    @Query("""
        SELECT a FROM Adresa a
        WHERE a.numeComplet = :#{#adresa.numeComplet}
          AND a.judet = :#{#adresa.judet}
          AND a.codPostal = :#{#adresa.codPostal}
          AND a.localitate = :#{#adresa.localitate}
          AND a.telefon = :#{#adresa.telefon}
    """)
    Optional<Adresa> findByAdresa(@Param("adresa") Adresa adresa);}
