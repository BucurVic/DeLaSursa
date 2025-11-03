package org.example.delasursa.service.implementations;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ClientiRepository;

@Service
public class ClientiServiceImpl {

    private final ClientiRepository clientiRepository;

    public ClientiServiceImpl(ClientiRepository clientiRepository) {
        this.clientiRepository = clientiRepository;
    }
}
