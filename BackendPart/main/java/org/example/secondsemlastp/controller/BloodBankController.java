package org.example.secondsemlastp.controller;


import jakarta.validation.Valid;
import org.example.secondsemlastp.dto.BloodBankDto;
import org.example.secondsemlastp.service.BloodBankService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/bloodBank")
@CrossOrigin(origins = "*") // end point
public class BloodBankController {

    @Autowired
    private BloodBankService bloodBankService;
    @PostMapping("save")
    private ResponseUtil saveBloodBank(@Valid @RequestBody BloodBankDto bloodBankDto){
        System.out.println(bloodBankDto.getName());
        bloodBankService.saveBloodBank(bloodBankDto);
        return new ResponseUtil(200 , "blood bank created " , null);
    }


    @PutMapping("update")
    private ResponseUtil updateBloodBank(@Valid @RequestBody BloodBankDto bloodBankDto){
        bloodBankService.updateBloodBank(bloodBankDto);
        return new ResponseUtil(201 , "blood bank updated ", null);
    }

    @GetMapping("getAll")
    private ResponseUtil loadAllData(){

        return new ResponseUtil(200, "BloodBank All Loaded" , bloodBankService.loadAllBank());
    }

    @GetMapping("getCount")
    private ResponseUtil loadBloodBankCount(){

        return new ResponseUtil(200, "BloodBank count Loaded" , bloodBankService.loadCount());
    }


    @DeleteMapping("delete/{id}")
    private ResponseUtil deleteBloodBank(@PathVariable Integer id){
        bloodBankService.deleteBloodBank(id);
        return  new ResponseUtil(201 , "Blood Bank deleted" , null);
    }



    //first only want to get id I use integer return
    //but after that I want to return id and name that's why I use this
    @GetMapping("getId")
    private ResponseUtil loadBloodBankIds(){
        List<Map<String,Object>> bloodbanks = bloodBankService.findIds();
        return new ResponseUtil(201, "ids load" ,bloodbanks);
    }
}
