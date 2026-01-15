package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.client.ClientDTO;
import org.example.delasursa.common.dto.subscriptie.CreateSubscriptieRequest;
import org.example.delasursa.common.dto.subscriptie.SubscriptieDTO;
import org.example.delasursa.common.exceptions.SubscriptieException;
import org.example.delasursa.model.Client;
import org.example.delasursa.model.Pachet;
import org.example.delasursa.model.Subscriptie;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.ClientRepository;
import org.example.delasursa.repository.PachetRepository;
import org.example.delasursa.repository.UserRepository; // IMPORT NOU
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SubscriptieMapper {

    private final PachetMapper pachetMapper;
    private final ClientRepository clientRepository;
    private final PachetRepository pachetRepository;
    private final UserRepository userRepository; // Avem nevoie de asta pentru email

    // --- ENTITY -> DTO ---
    public SubscriptieDTO toDto(Subscriptie subscriptie) {
        if (subscriptie == null) {
            return null;
        }

        return SubscriptieDTO.builder()
                .id(subscriptie.getId())
                .client(mapClientToDto(subscriptie.getClient()))
                .pachet(subscriptie.getPachet() != null ? pachetMapper.toDTO(subscriptie.getPachet()) : null)
                .dataInceput(subscriptie.getDataInceput())
                .frecventa(subscriptie.getFrecventa()) // Ai grija la typo in Model: Frecventa vs frecventa
                .status(subscriptie.getStatus())
                .build();
    }

    // --- DTO -> ENTITY (Pentru Update) ---
    public Subscriptie toEntity(SubscriptieDTO dto, Subscriptie target) {
        if (target == null) {
            target = new Subscriptie();
        }

        if (dto.getClient() != null && dto.getClient().getId() != null) {
            Client client = clientRepository.findById(dto.getClient().getId())
                    .orElseThrow(() -> new SubscriptieException("Client not found", HttpStatus.NOT_FOUND));
            target.setClient(client);
        }

        if (dto.getPachet() != null && dto.getPachet().getId() != null) {
            Pachet pachet = pachetRepository.findById(dto.getPachet().getId())
                    .orElseThrow(() -> new SubscriptieException("Pachet not found", HttpStatus.NOT_FOUND));
            target.setPachet(pachet);
        }

        if (dto.getDataInceput() != null) target.setDataInceput(dto.getDataInceput());
        if (dto.getFrecventa() != null) target.setFrecventa(dto.getFrecventa());
        if (dto.getStatus() != null) target.setStatus(dto.getStatus());

        return target;
    }

    // --- CREATE REQUEST -> ENTITY ---
    public Subscriptie toEntity(CreateSubscriptieRequest dto) {
        Subscriptie target = new Subscriptie();

        // NOTĂ: Clientul NU îl setăm aici. Îl setăm în ServiceImpl din User-ul logat.
        // NOTĂ: Statusul NU îl setăm aici. Îl setăm în ServiceImpl (default ACTIV).

        // Mapăm Pachetul folosind getIdPachet() (conform DTO-ului nou)
        if (dto.getIdPachet() != null) {
            Pachet pachet = pachetRepository.findById(dto.getIdPachet())
                    .orElseThrow(() -> {
                        log.warn("Pachet not found for id={} while mapping CreateSubscriptieRequest", dto.getIdPachet());
                        return new SubscriptieException("Pachet not found", HttpStatus.NOT_FOUND);
                    });
            target.setPachet(pachet);
        }

        target.setDataInceput(dto.getDataInceput());
        target.setFrecventa(dto.getFrecventa());

        return target;
    }

    // --- HELPER: Extragere date Client ---
    private ClientDTO mapClientToDto(Client clientEntity) {
        if (clientEntity == null) return null;

        String email = "";

        // REPARATIE CASTING:
        // Clientul și Userul au același ID (OneToOne shared PK). 
        // Căutăm User-ul după ID-ul clientului pentru a lua email-ul.
        User user = userRepository.findById(clientEntity.getId()).orElse(null);
        if (user != null) {
            email = user.getEmail();
        }

        return ClientDTO.builder()
                .id(clientEntity.getId())
                .nume(clientEntity.getNume())
                .prenume(clientEntity.getPrenume())
                .telefon(clientEntity.getTelefon())
                .email(email)
                .build();
    }
}