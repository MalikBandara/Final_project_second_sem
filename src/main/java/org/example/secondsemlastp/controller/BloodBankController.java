package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.service.BloodBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/bloodBank")
@CrossOrigin(origins = "*") // end point
public class BloodBankController {

    @Autowired
    private BloodBankService bloodBankService;

}
