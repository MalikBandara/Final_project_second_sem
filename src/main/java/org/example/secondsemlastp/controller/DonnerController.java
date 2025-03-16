package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.DonnerDto;
import org.example.secondsemlastp.service.DonnerService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/donner")
public class DonnerController {


    @Autowired
    private DonnerService donnerService;


    @PostMapping("save")
    private ResponseUtil saveDonner(@RequestBody DonnerDto donnerDto){
        donnerService.saveDonner(donnerDto);
        return new ResponseUtil(200, "donner Approved and create" , null );
    }
}
