package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.SubscriptiiRepository;

@Service
public class SubscriptiiServiceImpl {

    private final SubscriptiiRepository subscriptiiRepository;

    public SubscriptiiServiceImpl(SubscriptiiRepository subscriptiiRepository) {
        this.subscriptiiRepository = subscriptiiRepository;
    }
}
