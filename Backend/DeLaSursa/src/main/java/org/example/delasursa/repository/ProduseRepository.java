package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Produse;

public interface ProduseRepository extends JpaRepository<Produse, Integer> {
}
