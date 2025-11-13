package org.example.delasursa.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Role {
    @Id
    private String name;
}
