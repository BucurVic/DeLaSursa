package org.example.delasursa.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "useri", schema = "public")
@Data
public class Useri {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Clienti getClienti() {
        return clienti;
    }

    public void setClienti(Clienti clienti) {
        this.clienti = clienti;
    }

    public Producatori getProducatori() {
        return producatori;
    }

    public void setProducatori(Producatori producatori) {
        this.producatori = producatori;
    }

}