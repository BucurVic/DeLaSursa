package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdusProducatorRepository extends JpaRepository<ProdusProducator, Integer>, JpaSpecificationExecutor<ProdusProducator> {

    @Query(value = "SELECT * FROM produs_producator ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<ProdusProducator> findRandom(@Param("count") Integer count);

    List<ProdusProducator> findByProducator_Id(Integer prodducatorId);

    boolean existsByProdus_IdAndProducator_Id(Integer produsId, Integer producatorId);

    Optional<ProdusProducator> findByProdus_IdAndProducator_Id(Integer produsId, Integer producatorId);

    void deleteByProdus_IdAndProducator_Id(Integer produsId, Integer producatorId);
}
