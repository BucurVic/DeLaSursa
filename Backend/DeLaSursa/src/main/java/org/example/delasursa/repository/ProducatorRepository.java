package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Producatori;

public interface ProducatorRepository extends JpaRepository<Producatori, Integer> {
}
