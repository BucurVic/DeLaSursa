package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.repository.SubscriptieRepository;
import org.example.delasursa.service.SubscriptieService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptieServiceImpl implements SubscriptieService {

    private final SubscriptieRepository subscriptiiRepository;

}
