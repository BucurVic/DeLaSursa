package org.example.delasursa.common.mappers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.subscriptie.CreateSubscriptieRequest;
import org.example.delasursa.common.dto.subscriptie.SubscriptieDTO;
import org.example.delasursa.model.Client;
import org.example.delasursa.model.Pachet;
import org.example.delasursa.model.Subscriptie;
import org.example.delasursa.repository.ClientRepository;
import org.example.delasursa.repository.PachetRepository;
import org.springframework.stereotype.Component;

import org.example.delasursa.common.exceptions.SubscriptieException;
import org.springframework.http.HttpStatus;

@Slf4j
@Component
@RequiredArgsConstructor
public class SubscriptieMapper {

    private final ClientRepository clientRepository;
    private final PachetRepository pachetRepository;

    public SubscriptieDTO toDto(Subscriptie subscriptie) {
        if (subscriptie == null) {
            return null;
        }

        return SubscriptieDTO.builder()
                .id(subscriptie.getId())
                .clientId(subscriptie.getClient() != null ? subscriptie.getClient().getId() : null)
                .pachetId(subscriptie.getPachet() != null ? subscriptie.getPachet().getId() : null)
                .dataInceput(subscriptie.getDataInceput())
                .freceventa(subscriptie.getFreceventa())
                .status(subscriptie.getStatus())
                .build();
    }

    public Subscriptie toEntity(SubscriptieDTO dto, Subscriptie target) {
        if (target == null) {
            target = new Subscriptie();
        }
        if (dto.getClientId() != null) {
            Client client = clientRepository.findById(dto.getClientId())
                    .orElseThrow(() -> {
                        log.warn("Client not found for id={} while mapping SubscriptieDTO", dto.getClientId());
                        return new SubscriptieException("Client not found", HttpStatus.NOT_FOUND);
                    });
            target.setClient(client);
        }
        if (dto.getPachetId() != null) {
            Pachet pachet = pachetRepository.findById(dto.getPachetId())
                    .orElseThrow(() -> {
                        log.warn("Pachet not found for id={} while mapping SubscriptieDTO", dto.getPachetId());
                        return new SubscriptieException("Pachet not found", HttpStatus.NOT_FOUND);
                    });
            target.setPachet(pachet);
        }
        target.setDataInceput(dto.getDataInceput());
        target.setFreceventa(dto.getFreceventa());
        target.setStatus(dto.getStatus());
        return target;
    }

    public Subscriptie toEntity(CreateSubscriptieRequest dto) {
        Subscriptie target = new Subscriptie();
        if (dto.getClientId() != null) {
            Client client = clientRepository.findById(dto.getClientId())
                    .orElseThrow(() -> {
                        log.warn("Client not found for id={} while mapping CreateSubscriptieRequest", dto.getClientId());
                        return new SubscriptieException("Client not found", HttpStatus.NOT_FOUND);
                    });
            target.setClient(client);
        }
        if (dto.getPachetId() != null) {
            Pachet pachet = pachetRepository.findById(dto.getPachetId())
                    .orElseThrow(() -> {
                        log.warn("Pachet not found for id={} while mapping CreateSubscriptieRequest", dto.getPachetId());
                        return new SubscriptieException("Pachet not found", HttpStatus.NOT_FOUND);
                    });
            target.setPachet(pachet);
        }
        target.setDataInceput(dto.getDataInceput());
        target.setFreceventa(dto.getFreceventa());
        target.setStatus(dto.getStatus());
        return target;
    }
}
