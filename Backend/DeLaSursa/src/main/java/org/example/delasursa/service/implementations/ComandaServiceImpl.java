package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.comanda.ComandaDto;
import org.example.delasursa.common.dto.comanda.CreateComandaRequest;
import org.example.delasursa.common.dto.comanda.CreateComandaResponse;
import org.example.delasursa.common.exceptions.ProducatorException;
import org.example.delasursa.common.exceptions.ProdusException;
import org.example.delasursa.common.exceptions.UserException;
import org.example.delasursa.common.mappers.ComandaMapper;
import org.example.delasursa.model.*;
import org.example.delasursa.repository.*;
import org.example.delasursa.repository.ComandaProdusRepository;
import org.example.delasursa.service.ComandaService;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComandaServiceImpl implements ComandaService {

    private final ProdusRepository produsRepository;
    private final ClientRepository clientRepository;
    private final ComandaRepository comandaRepository;
    private final ProducatorRepository producatorRepository;
    private final ComandaMapper comandaMapper;
    private final ProdusProducatorRepository produsProducatorRepository;
    private final ComandaProdusRepository comandaProdusRepository;

    @Override
    @Transactional
    public CreateComandaResponse createComanda(CreateComandaRequest request) {
        //finding the products based of the id from the request
        //Map Entry format   <Produs, Pair<PretUnitar,Cantitate>>
        Map<ProdusProducator, Pair<Double, Double>> produse = request.getComandaProduseList()
                .stream()
                .map(t -> {
                    ProdusProducator produs = produsProducatorRepository.findById(t.getProdusId())
                            .orElseThrow(() -> {
                                log.warn("Produs with id {} not found", t.getProdusId());
                                return new ProdusException("Produs with id " + t.getProdusId() + " not found!", HttpStatus.NOT_FOUND);
                            });
                    return Map.entry(produs, Pair.of(t.getPretUnitar(), t.getCantitate()));
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));


        //finding the client
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> {
                    log.warn("Client with id {} not found",  request.getClientId());
                    return new UserException("Client with id " + request.getClientId() + " not found!", HttpStatus.NOT_FOUND);
                });

        //preparing the comanda
        Comanda comanda = new  Comanda();
        comanda.setClient(client);
        comanda.setDataEfectuarii(LocalDate.now());

        //seting comanda for comanda produse with
        Set<ComandaProdus> comandaProuse = produse.entrySet().stream()
                .map(produs ->
                     createFromMapEntryComanda(produs, comanda)
                )
                .collect(Collectors.toSet());

        comanda.setComandaProduse(comandaProuse);

        Comanda savedComanda = comandaRepository.save(comanda);
        CreateComandaResponse response = new CreateComandaResponse();
        response.setId(savedComanda.getId());
        return response;
    }

    @Override
    public List<ComandaDto> getAllComandsByUserId(Integer userId) {
        return comandaRepository.findByClient_Id(userId)
                .stream().map(comandaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ComandaDto> getAllCommandsByProducatorId(Integer id) {
        if (!producatorRepository.existsById(id)) {
            log.warn("Producator with id {} not found", id);
            throw new ProducatorException("Producator with id " + id + " not found!", HttpStatus.NOT_FOUND);
        }

        List<ProdusProducator> produsProducators = produsProducatorRepository.findByProducator_Id(id);

        return produsProducators.stream()
                .flatMap(pp -> comandaRepository.findByComandaProduse_Produs(pp)
                        .stream())
                .distinct()
                .map(comandaMapper::toDto)
                .collect(Collectors.toList());
    }


    private ComandaProdus createFromMapEntryComanda(Map.Entry<ProdusProducator, Pair<Double, Double>> produs, Comanda comanda) {
        ComandaProdus comandaProdus = new ComandaProdus();
        Pair<Double, Double> pair =  produs.getValue();
        comandaProdus.setComanda(comanda);
        comandaProdus.setPretUnitar(pair.getFirst()); // first -> PretUnitar
        comandaProdus.setCantitate(pair.getSecond()); // second -> Cantiate
        comandaProdus.setProdus(produs.getKey());
        return comandaProdus;

    }
    @Override
    public Integer getTotalComenziUltimulAn() {
        return comandaRepository.countByDataEfectuariiAfter(LocalDate.now().minusYears(1));
    }

    @Override
    public Double getVenitTotal() {
        return comandaProdusRepository.getVenitTotal();
    }
}
