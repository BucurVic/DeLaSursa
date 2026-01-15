package org.example.delasursa.repository;

import org.example.delasursa.common.dto.enums.ComandaStatus;
import org.example.delasursa.model.Comanda;
import org.example.delasursa.model.Pachet;
import org.example.delasursa.model.ProdusProducator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ComandaRepository extends JpaRepository<Comanda, Integer> {
    List<Comanda> findByClient_Id(Integer id);

    List<Comanda> findByComandaProduse_Produs(ProdusProducator produsProducator);

    List<Comanda> findByComandaPachete_Pachet(Pachet pachet);

    Integer countByDataEfectuariiAfter(LocalDate dataEfectuariiAfter);

    List<Comanda> findByClient_User_Email(String email);

    List<Comanda> findByClient_User_Username(String username);

    Comanda findById(int id);

    @Query(value = """
            SELECT
                COALESCE(SUM(cp.cantitate * cp.pret_unitar), 0) +
                COALESCE(SUM(cpa.cantitate * (pp_rel.cantitate * pp_prod.pret)), 0) AS venit
            FROM comenzi c
            LEFT JOIN comanda_produs cp ON cp.id_comanda = c.id
            LEFT JOIN produs_producator pp ON pp.id = cp.id_produs
            
            LEFT JOIN comanda_pachet cpa ON cpa.id_comanda = c.id
            LEFT JOIN pachet_produs pp_rel ON pp_rel.id_pachet = cpa.id_pachet
            LEFT JOIN produs_producator pp_prod ON pp_prod.id = pp_rel.id_produs
            
            WHERE c.data_efectuarii >= CURRENT_DATE - INTERVAL '1 year'
              AND c.status_comanda = :status
              AND (
                    pp.id_producator = :producatorId
                    OR pp_prod.id_producator = :producatorId
              )
            """, nativeQuery = true)
    Double venitProducatorUltimulAn(
            @Param("producatorId") Integer producatorId,
            @Param("status") ComandaStatus status
    );

    @Query(value = """
            SELECT 
                c.data_efectuarii AS date,
                COALESCE(SUM(cp.cantitate * cp.pret_unitar), 0) +
                COALESCE(SUM(cpa.cantitate * (pp_rel.cantitate * pp_prod.pret)), 0) AS income
            FROM comenzi c
            LEFT JOIN comanda_produs cp ON cp.id_comanda = c.id
            LEFT JOIN produs_producator pp ON pp.id = cp.id_produs
            LEFT JOIN comanda_pachet cpa ON cpa.id_comanda = c.id
            LEFT JOIN pachet_produs pp_rel ON pp_rel.id_pachet = cpa.id_pachet
            LEFT JOIN produs_producator pp_prod ON pp_prod.id = pp_rel.id_produs
            WHERE c.status_comanda IN (4)
              AND (pp.id_producator = :producatorId OR pp_prod.id_producator = :producatorId)
              AND c.data_efectuarii >= CURRENT_DATE - INTERVAL '1 year'
            GROUP BY c.data_efectuarii
            ORDER BY c.data_efectuarii
            """, nativeQuery = true)
    List<Object[]> getVenitPeZiProducator(@Param("producatorId") Integer producatorId);
}
