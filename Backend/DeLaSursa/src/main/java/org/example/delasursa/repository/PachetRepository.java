package org.example.delasursa.repository;

import org.example.delasursa.model.Pachet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PachetRepository extends JpaRepository<Pachet, Integer> {

    Page<Pachet> findByProducator_Id(Integer producatorId, Pageable pageable);

    Pachet findById(int id);
}
