package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Comanda;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface ComandaRepository extends JpaRepository<Comanda, Integer> {

    Integer countByDataEfectuariiAfter(LocalDate dataEfectuariiAfter);
}
