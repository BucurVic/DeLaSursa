package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.ComandaProdus;
import org.springframework.data.jpa.repository.Query;

public interface ComandaProdusRepository extends JpaRepository<ComandaProdus, Integer> {

    @Query("SELECT SUM(cp.cantitate*cp.pretUnitar) FROM ComandaProdus cp")
    Double getVenitTotal();
}
