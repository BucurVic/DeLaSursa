package org.example.delasursa.service;

import org.example.delasursa.model.Produse;

import java.util.List;

public interface ProduseService {
    List<Produse> getALl();
    Produse getOne(Integer id);
    Produse add(Produse produs);
    Produse update(Integer id,Produse produs);
    void delete(Integer id);
}
