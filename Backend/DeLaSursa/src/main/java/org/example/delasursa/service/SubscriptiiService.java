package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.SubscriptiiRepository;

@Service
public class SubscriptiiService {

    private final SubscriptiiRepository subscriptiiRepository;

    public SubscriptiiService(SubscriptiiRepository subscriptiiRepository) {
        this.subscriptiiRepository = subscriptiiRepository;
    }
}
