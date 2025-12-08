package org.example.delasursa.repository;

import org.example.delasursa.model.ProdusProducator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Comanda;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

import java.util.List;

public interface ComandaRepository extends JpaRepository<Comanda, Integer> {
    List<Comanda> findByClient_Id(Integer id);
    List<Comanda> findByComandaProduse_Produs_ProdusProducatori(ProdusProducator produsProducatori);
    Integer countByDataEfectuariiAfter(LocalDate dataEfectuariiAfter);
}
