package org.example.delasursa.repository;

import org.example.delasursa.model.Subscriptie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptieRepository extends JpaRepository<Subscriptie, Integer> {

    Page<Subscriptie> findByClient_Id(Integer clientId, Pageable pageable);
    Page<Subscriptie> findByPachet_Id(Integer pachetId, Pageable pageable);

    @Query("SELECT s FROM Subscriptie s WHERE s.pachet.producator.id = :producatorId")
    Page<Subscriptie> findByProducatorId(Integer producatorId, Pageable pageable);
}