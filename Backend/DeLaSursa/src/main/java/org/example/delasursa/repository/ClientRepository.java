package org.example.delasursa.repository;

import org.example.delasursa.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Optional<Client> findByUser_Email(String email);
    Optional<Client> findByUser_Username(String username);
}