package org.example.delasursa.service.implementations;

import org.example.delasursa.service.SubscriptiiService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.SubscriptiiRepository;

@Service
public class SubscriptiiServiceImpl implements SubscriptiiService {

    private final SubscriptiiRepository subscriptiiRepository;

    public SubscriptiiServiceImpl(SubscriptiiRepository subscriptiiRepository) {
        this.subscriptiiRepository = subscriptiiRepository;
    }
}
