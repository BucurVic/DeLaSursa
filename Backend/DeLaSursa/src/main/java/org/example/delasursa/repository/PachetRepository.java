package org.example.delasursa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Pachet;

import java.util.List;

public interface PachetRepository extends JpaRepository<Pachet, Integer> {

    Page<Pachet> findByProducator_Id(Integer producatorId, Pageable pageable);
}
