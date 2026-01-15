package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.PachetProdus;
import org.springframework.stereotype.Repository;

@Repository
public interface PachetProdusRepository extends JpaRepository<PachetProdus, Integer> {
    void deleteByPachet_Id(Integer pachetId);
}
