package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Pachete;

public interface PachetRepository extends JpaRepository<Pachete, Integer> {
}
