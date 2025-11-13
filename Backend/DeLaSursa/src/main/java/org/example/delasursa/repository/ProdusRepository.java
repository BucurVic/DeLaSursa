package org.example.delasursa.repository;

import org.example.delasursa.model.Produs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdusRepository extends JpaRepository<Produs, Integer> {
    Optional<Produs> findByNumeAndCategorie(String nume, String categorie);
}
