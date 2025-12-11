package org.example.delasursa.service;
import org.example.delasursa.common.dto.ClientDto;

public interface ClientService {
    ClientDto getClientProfile(String email);
    Integer getClientIdByEmail(String email);
    ClientDto getClientByEmail(String email);
    ClientDto updateClientProfile(String email, ClientDto clientDto);
}
