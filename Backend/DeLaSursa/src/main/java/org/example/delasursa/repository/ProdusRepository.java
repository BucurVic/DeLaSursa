package org.example.delasursa.repository;

import org.example.delasursa.common.dto.produs.ProdusGenericSummary;
import org.example.delasursa.model.Produs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdusRepository extends JpaRepository<Produs, Integer> {
    Optional<Produs> findByNumeAndCategorie(String nume, String categorie);

    @Query("SELECT DISTINCT p.categorie  FROM Produs p ORDER BY p.categorie ASC")
    List<String> findDistinctCategorieOrdered();



    @Query("SELECT p.id as id, p.nume as nume, p.categorie as categorie FROM Produs p WHERE p.categorie = :categorie")
    List<ProdusGenericSummary> findSummaryByCategorie(@Param("categorie") String categorie);

    @Query("SELECT p.id as id, p.nume as nume, p.categorie as categorie FROM Produs p")
    List<ProdusGenericSummary> findAllSummary();
}
