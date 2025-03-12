package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.HospitalDto;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.service.HospitalService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
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


    @PutMapping("update")
    private ResponseUtil updateHospitals(@RequestBody HospitalDto hospitalDto){
        hospitalService.updateHospitals(hospitalDto);
        return new ResponseUtil(201, "Hospital Update Successfully", null);
    }

    @DeleteMapping("delete/{id}")
    private ResponseUtil deleteHospital(@PathVariable Integer id){
        hospitalService.deleteHospital(id);
        return new ResponseUtil(201 , "hospital delete successfully" , null);
    }
    @GetMapping("getAll")
    private ResponseUtil getAllHospitals(){
            return new ResponseUtil(200 , "Hospital Loaded" , hospitalService.loadHospitals());
    }








}
