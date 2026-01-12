package org.example.delasursa.repository;

import org.example.delasursa.model.Subscriptie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptieRepository extends JpaRepository<Subscriptie, Integer> {
    List<Subscriptie> findSubscriptieByClient_Id(Integer id);
}
