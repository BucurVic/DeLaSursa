package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ClientiService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ClientRepository;

@Service
public class ClientiServiceImpl implements ClientiService {

    private final ClientRepository clientRepository;

    public ClientiServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }
}
