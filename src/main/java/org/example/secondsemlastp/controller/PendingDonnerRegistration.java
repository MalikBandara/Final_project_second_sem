package org.example.secondsemlastp.controller;


import jakarta.validation.Valid;
import org.example.secondsemlastp.dto.PendingDonnerDto;
import org.example.secondsemlastp.entity.Donner;
import org.example.secondsemlastp.service.PendingDonnerService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/pDonner")
@CrossOrigin(origins = "*")
public class PendingDonnerRegistration {



    @Autowired
    private PendingDonnerService pendingDonnerService;


    @PostMapping("save")
    private ResponseUtil savePendingDonner(@Valid @RequestBody PendingDonnerDto pendingDonnerDto){
        pendingDonnerService.savePDonner(pendingDonnerDto);
        return new ResponseUtil(200,"pending donner create" , null);
    }


    @GetMapping("getAll")
    private ResponseUtil loadAllPendingDonner(){
        return new ResponseUtil(201, "load pending donner" , pendingDonnerService.getAll());

    }


    @DeleteMapping("delete/{id}")
    private ResponseUtil deleteMethod(@PathVariable Integer id){
        pendingDonnerService.deletePendingDonner(id);
        return new ResponseUtil(201 , "Pending donner delete " , null);
    }


    @PutMapping("update")
    private ResponseUtil updatePDonner(@Valid @RequestBody PendingDonnerDto pendingDonnerDto){
        pendingDonnerService.updatePDonner(pendingDonnerDto);
        return new ResponseUtil(201, "pending donner updated" , null);
    }


    @PutMapping("updateStatus/{id}")
    private ResponseUtil updateStatus(@PathVariable Integer id){
        pendingDonnerService.updateStatus(id);
        return new ResponseUtil(201, "status update in pending donner " , null);
    }

    @PutMapping("updateStatusToReject/{id}")
    private ResponseUtil updateStatusToReject(@PathVariable Integer id){
        pendingDonnerService.updateStatusTOReject(id);
        return new ResponseUtil(201, "status update to rejected  donner " , null);
    }


    // not use create for delete but not work
    @DeleteMapping("Reject/{id}")
    private ResponseUtil rejectDonner(@PathVariable Integer id ){
//        pendingDonnerService.rejectDonner(id);
        return new ResponseUtil(201,"donner rejected successfully" , null);
    }

    @GetMapping("/{pendingDonnerId}")
    public ResponseUtil getPendingDonorById(@PathVariable Integer pendingDonnerId) {
        List<Map<String, Object>> pendingDonorById = pendingDonnerService.getPendingDonorById(pendingDonnerId);
        return new ResponseUtil(201, "pending donner get by id " , pendingDonorById);

    }



}
