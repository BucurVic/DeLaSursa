package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ClientService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ClientRepository;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }
}
