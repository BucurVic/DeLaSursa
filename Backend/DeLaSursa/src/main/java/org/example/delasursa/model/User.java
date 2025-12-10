 package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "useri", schema = "public")
@Getter @Setter
@Builder
@NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"producator", "role"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    private Integer id;

    @Column(name = "username", length = Integer.MAX_VALUE)
    private String username;

    @Column(name = "email", length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "parola", length = Integer.MAX_VALUE)
    private String parola;


    @OneToOne(mappedBy = "user")
    private Client client;

    @OneToOne(mappedBy = "user")
    private Producator producator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "name")
    )
    private Set<Role> role;

    @Column(name = "data_inregistrare")
    LocalDate dataInregistrare;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "is_email_verified")
    private boolean isEmailVerified;
} 