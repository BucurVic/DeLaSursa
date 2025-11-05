package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "useri", schema = "public")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", length = Integer.MAX_VALUE)
    private String username;

    @Column(name = "email", length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "parola", length = Integer.MAX_VALUE)
    private String parola;

    @Column(name = "rol", length = Integer.MAX_VALUE)
    private String rol;

    @OneToOne(mappedBy = "useri")
    private Clienti clienti;

    @OneToOne(mappedBy = "useri")
    private Producatori producatori;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "name")
    )
    private Set<Role> role;
}