package org.example.delasursa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.delasursa.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);

    User findByVerificationToken(String token);

    @Query("""
       SELECT COUNT(u)
       FROM User u
       WHERE u.id NOT IN (
           SELECT u2.id
           FROM User u2
           JOIN u2.role r2
           WHERE r2.name = 'admin'
       )
       """)
    Integer countUsersNotAdmin();

    List<User> findAll();
}
