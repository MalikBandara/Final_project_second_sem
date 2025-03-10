package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.HospitalDto;
import org.example.secondsemlastp.service.HospitalService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {


    @Autowired
    private HospitalService hospitalService;
    @PostMapping("save")
    private ResponseUtil saveHospitals(@RequestBody HospitalDto hospitalDto){
            hospitalService.saveHospitals(hospitalDto);
            return new ResponseUtil(200 , "Hospital Saved" , null);
    }




}
