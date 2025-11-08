package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
}
