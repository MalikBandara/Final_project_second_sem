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
    private ResponseUtil loadDonner(){
        return new ResponseUtil();
    }
}
