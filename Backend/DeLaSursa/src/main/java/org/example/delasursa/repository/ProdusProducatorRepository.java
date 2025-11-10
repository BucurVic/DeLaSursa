package org.example.delasursa.repository;

import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdusProducatorRepository extends JpaRepository<ProdusProducator, Integer> {

    @Query(value = "SELECT * FROM produs_producator ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<ProdusProducator> findRandom(@Param("count") Integer count);

    boolean existsByProdus_IdAndProducator_Id(Integer produsId, Integer producatorId);
}
