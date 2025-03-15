package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.PendingDonnerDto;
import org.example.secondsemlastp.service.PendingDonnerService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/pDonner")
public class PendingDonnerRegistration {



    @Autowired
    private PendingDonnerService pendingDonnerService;


    @PostMapping("save")
    private ResponseUtil savePendingDonner(@RequestBody PendingDonnerDto pendingDonnerDto){
        pendingDonnerService.savePDonner(pendingDonnerDto);
        return new ResponseUtil(200,"pending donner create" , null);
    }


    @GetMapping("getAll")
    private ResponseUtil loadAllPendingDonner(){
        return new ResponseUtil(201, "load pending donners" , pendingDonnerService.getAll());

    }


    @DeleteMapping("delete/{id}")
    private ResponseUtil deleteMethod(@PathVariable Integer id){
        pendingDonnerService.deletePendingDonner(id);
        return new ResponseUtil(201 , "Pending donner delete " , null);
    }


    @PutMapping("update")
    private ResponseUtil updatePDonner(@RequestBody PendingDonnerDto pendingDonnerDto){
        pendingDonnerService.updatePDonner(pendingDonnerDto);
        return new ResponseUtil(201, "pending donner updted" , null);
    }
}
