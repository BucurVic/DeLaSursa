package org.example.delasursa.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.admin.AdminStatsDTO;
import org.example.delasursa.common.dto.admin.UserDTO;
import org.example.delasursa.service.ComandaService;
import org.example.delasursa.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private UserService userService;
    private ComandaService comandaService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getAdminStats(){
        log.info("Get admin stats request received");
        Integer totalUseri = userService.countUsersNotAdmin();
        Integer totalComenzi = comandaService.getTotalComenziUltimulAn();
        Double venitTotal = comandaService.getVenitTotal();

        AdminStatsDTO adminStatsDTO = AdminStatsDTO.builder()
                .totalUseri(totalUseri)
                .totalComenzi(totalComenzi)
                .totalVanzari(venitTotal)
                .build();

        return ResponseEntity.ok(adminStatsDTO);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @PageableDefault(size = 6) Pageable pageable
    ){
        log.info("Get all users request received");
        Page<UserDTO> page = userService.getAllUsers(pageable);

        log.info("Fetched {} users successfully", page.getNumberOfElements());
        return ResponseEntity.ok(page);
    }
}
