package org.example.delasursa.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.delasursa.common.exceptions.ResourceNotFoundException;
import org.example.delasursa.model.ProdusProducator;
import org.example.delasursa.model.User;
import org.example.delasursa.repository.ProdusProducatorRepository;
import org.example.delasursa.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProductAuthorizationService {
    private final ProdusProducatorRepository produsProducatorRepository;
    private final UserRepository userRepository;

    public void authorizeProdusOwnership(Integer produsId){
        Integer producatorId = getCurrentProducatorId();

        if(!produsProducatorRepository.existsByProdus_IdAndProducator_Id(produsId, producatorId))
            throw new AccessDeniedException("You are not authorized to perform this action");
    }

    public ProdusProducator authorizeAndGetProdusOwnership(Integer produsId){
        Integer producatorId = getCurrentProducatorId();

        return produsProducatorRepository.findByProdus_IdAndProducator_Id(produsId, producatorId)
                .orElseThrow(() -> new AccessDeniedException("You are not authorized to perform this action"));
    }


    private Integer getCurrentProducatorId(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(user.getProducator() == null){
            throw new AccessDeniedException("Access denied: this user is not a producator.");
        }

        return user.getProducator().getId();
    }
}
