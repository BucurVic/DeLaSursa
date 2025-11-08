package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.Clienti;

public interface ClientRepository extends JpaRepository<Clienti, Integer> {
}
