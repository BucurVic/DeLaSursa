package org.example.delasursa.repository;

import org.example.delasursa.common.dto.enums.MetodaLivrare;
import org.example.delasursa.model.MetodaLivrarePret;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MetodaLivrarePretRepository extends JpaRepository<MetodaLivrarePret, Integer> {
    Optional<MetodaLivrarePret> findByMetodaLivrare(MetodaLivrare metodaLivrare);
}
