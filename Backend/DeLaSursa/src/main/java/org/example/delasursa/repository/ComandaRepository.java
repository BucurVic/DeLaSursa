package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Comanda;

public interface ComandaRepository extends JpaRepository<Comanda, Integer> {
}
