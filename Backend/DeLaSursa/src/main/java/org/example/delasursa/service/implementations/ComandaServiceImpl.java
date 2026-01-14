package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.ClientDto;
import org.example.delasursa.common.dto.admin.ComandaSummary;
import org.example.delasursa.common.dto.comanda.ComandaDto;
import org.example.delasursa.common.dto.comanda.ComandaProdusDto;
import org.example.delasursa.common.dto.comanda.CreateComandaRequest;
import org.example.delasursa.common.dto.comanda.CreateComandaResponse;
import org.example.delasursa.common.dto.enums.ComandaStatus;
import org.example.delasursa.common.exceptions.*;
import org.example.delasursa.common.mappers.ComandaMapper;
import org.example.delasursa.model.*;
import org.example.delasursa.repository.*;
import org.example.delasursa.service.ComandaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    private final ClientRepository clientRepository;
    private final ComandaRepository comandaRepository;
    private final ProducatorRepository producatorRepository;
    private final ComandaMapper comandaMapper;
    private final ProdusProducatorRepository produsProducatorRepository;
    private final ComandaProdusRepository comandaProdusRepository;
    private final MetodaLivrarePretRepository metodaLivrarePretRepository;
    private final AdresaRepository adresaRepository;

    @Override
    @Transactional
    public CreateComandaResponse createComanda(CreateComandaRequest request) {

        MetodaLivrarePret metodaLivrarePret = metodaLivrarePretRepository.findByMetodaLivrare(request.getMetodaLivrare()).orElseThrow(() -> {
            log.warn("Metoda livrare {} not found!", request.getMetodaLivrare());
            return new ProdusException("Metoda livrare not found!", HttpStatus.NOT_FOUND);
        });


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
                    log.warn("Client with id {} not found", request.getClientId());
                    return new UserException("Client with id " + request.getClientId() + " not found!", HttpStatus.NOT_FOUND);
                });

        //preparing the comanda
        Comanda comanda = new Comanda();
        comanda.setClient(client);
        comanda.setMetodaLivrare(metodaLivrarePret);
        comanda.setMetodaPlata(request.getMetodaPlata());
        comanda.setDataEfectuarii(LocalDate.now());
        comanda.setObservatii(request.getObservatii());

        Adresa adresaLivrare = request.getAdresaLivrare();
        if (adresaRepository.findByAdresa(adresaLivrare).isEmpty()) {
            adresaLivrare = adresaRepository.save(adresaLivrare);
        }

        comanda.setAdresaLivrare(adresaLivrare);


        if (request.getAdresaFacturare() == null) {
            comanda.setAdresaFacturare(adresaLivrare);
        } else {
            Adresa adresaFacturare = request.getAdresaFacturare();
            if (adresaRepository.findByAdresa(adresaFacturare).isEmpty()) {
                adresaFacturare = adresaRepository.save(adresaFacturare);
            }
            comanda.setAdresaFacturare(adresaFacturare);
        }

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
    public Page<ComandaSummary> getAllComenziSummary(Pageable pageable) {
        Page<Comanda> comenzi = comandaRepository.findAll(pageable);

        return comenzi.map(c -> ComandaSummary.builder()
                .id(c.getId())
                .numeClient(c.getClient().getNume() + " " + c.getClient().getPrenume())
                .dataEfectuarii(c.getDataEfectuarii())
                .numarProduse(c.getComandaProduse().size())
                .valoareTotala(c.getComandaProduse().stream()
                        .mapToDouble(cp -> cp.getCantitate() * cp.getPretUnitar())
                        .sum())
                .build());
    }

    @Transactional
    @Override
    public ComandaDto updateStatus(Integer comandaId, ComandaStatus status, Integer prodId) {
        Comanda comanda = comandaRepository.findById(comandaId).orElseThrow(() -> new ResourceNotFoundException("Comanda with id " + comandaId + " not found!"));
        if (!comanda.getComandaProduse().stream().toList().get(0).getProdus().getProducator().getId().equals(prodId)) {
            throw new UnauthorizedException("Not authorized to update current order");
        }
        comanda.setStatusComanda(status);
        return comandaMapper.toDto(comandaRepository.save(comanda));
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
        Pair<Double, Double> pair = produs.getValue();
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

    @Override
    public List<ComandaDto> getComenziIstoric(String emailOrUsername) {
        List<Comanda> comenzi = comandaRepository.findByClient_User_Username(emailOrUsername);
        return comenzi.stream()
                .map(cmd -> ComandaDto.builder()
                        .id(cmd.getId())
                        .dataEfectuarii(cmd.getDataEfectuarii())
                        .client(ClientDto.builder()
                                .nume(cmd.getClient().getNume())
                                .prenume(cmd.getClient().getPrenume())
                                .telefon(cmd.getClient().getTelefon())
                                .build())
                        .comandaProduse(cmd.getComandaProduse().stream()
                                .map(cp -> ComandaProdusDto.builder()
                                        .id(cp.getId() != null ? cp.getId().intValue() : null)
                                        .cantitate(cp.getCantitate())
                                        .pretUnitar(cp.getPretUnitar())
                                        .produs(ComandaProdusDto.ProdusComandaProdusDto.builder()

                                                .numeProdus(cp.getProdus().getProdus().getNume())

                                                .categorie(cp.getProdus().getProdus().getCategorie())

                                                .pret(cp.getPretUnitar())

                                                .produsProducatorId(cp.getProdus().getId() != null ? cp.getProdus().getId().intValue() : null)


                                                .build())
                                        .build())
                                .collect(Collectors.toSet()))
                        .build())
                .toList();
    }

}
