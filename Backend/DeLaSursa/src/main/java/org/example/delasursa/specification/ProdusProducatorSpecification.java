package org.example.delasursa.specification;

import org.example.delasursa.model.ProdusProducator;
import org.springframework.data.jpa.domain.Specification;

public class ProdusProducatorSpecification {

    public static Specification<ProdusProducator> hasCategorie(String categorie) {
        return (root, query, cb) -> {
            if(categorie == null || categorie.equalsIgnoreCase("Toate"))
                return cb.conjunction();
            return cb.equal(root.get("produs").get("categorie"), categorie);
        };
    }

    public static Specification<ProdusProducator> hasRegiune(String regiune) {
        return (root, query, cb) -> {
            if (regiune == null || regiune.equalsIgnoreCase("Toate"))
                return cb.conjunction();
            return cb.equal(root.get("producator").get("regiune"), regiune);
        };
    }

    public static Specification<ProdusProducator> hasPretBetween(Double min, Double max) {
        return (root, query, cb) -> {
            if (min != null && max != null) {
                return cb.between(root.get("pret"), min, max);
            } else if (min != null) {
                return cb.greaterThanOrEqualTo(root.get("pret"), min);
            } else if (max != null) {
                return cb.lessThanOrEqualTo(root.get("pret"), max);
            } else {
                return cb.conjunction();
            }
        };
    }

    public static Specification<ProdusProducator> doarDisponibile(Boolean doarDisponibile) {
        return (root, query, cb) -> {
            if (Boolean.TRUE.equals(doarDisponibile))
                return cb.greaterThan(root.get("cantitate"), 0);
            return cb.conjunction();
        };
    }
}
