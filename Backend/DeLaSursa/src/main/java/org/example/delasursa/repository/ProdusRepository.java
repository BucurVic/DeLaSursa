package org.example.delasursa.repository;

import org.example.delasursa.model.Produs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdusRepository extends JpaRepository<Produs, Integer> {
}
