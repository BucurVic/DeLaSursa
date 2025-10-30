package org.example.delasursa.service;

import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ClientiRepository;

@Service
public class ClientiService {

    private final ClientiRepository clientiRepository;

    public ClientiService(ClientiRepository clientiRepository) {
        this.clientiRepository = clientiRepository;
    }
}
