package org.example.delasursa.service.implementations;

import org.example.delasursa.service.ClientService;
import org.springframework.stereotype.Service;
import org.example.delasursa.repository.ClientRepository;
import org.example.delasursa.model.Client; 
import org.example.delasursa.common.dto.ClientDto;
import org.springframework.transaction.annotation.Transactional; 

import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public ClientDto getClientProfile(String emailOrUsername) {
        Client client = clientRepository.findByUser_Username(emailOrUsername)
                .orElseThrow(() -> new RuntimeException("Clientul nu a fost găsit pentru user: " + emailOrUsername));

        return mapToDto(client);
    }

    @Override
    public ClientDto getClientByEmail(String email) {
        return getClientProfile(email);
    }

    @Override
    public Integer getClientIdByEmail(String emailOrUsername) {
        return clientRepository.findByUser_Username(emailOrUsername)
                .map(Client::getId)
                .orElseThrow(() -> new RuntimeException("Clientul nu a fost găsit pentru user: " + emailOrUsername));
    }
    
    @Override
    @Transactional 
    public ClientDto updateClientProfile(String currentUsername, ClientDto clientDto) {
        
        Client client = clientRepository.findByUser_Username(currentUsername)
                .orElseThrow(() -> new RuntimeException("Clientul nu a fost găsit pentru userul: " + currentUsername));

        if (clientDto.getNume() != null) {
            client.setNume(clientDto.getNume());
        }
        
        if (clientDto.getPrenume() != null) {
            client.setPrenume(clientDto.getPrenume());
        }

        if (clientDto.getTelefon() != null) {
            client.setTelefon(clientDto.getTelefon());
        }

        if (clientDto.getEmail() != null && !clientDto.getEmail().isEmpty()) {
            if (!currentUsername.equals(clientDto.getEmail())) {    
                client.getUser().setUsername(clientDto.getEmail()); 
                client.getUser().setEmail(clientDto.getEmail());    
            } 
        } 

        Client updatedClient = clientRepository.save(client);
        return mapToDto(updatedClient);
    } 

    
    private ClientDto mapToDto(Client client) {
        return ClientDto.builder()
                .id(client.getId())
                .nume(client.getNume())
                .prenume(client.getPrenume())
                .telefon(client.getTelefon())
                .email(client.getUser().getEmail())
                .build();
    }

}