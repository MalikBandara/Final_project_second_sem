package org.example.secondsemlastp.controller;

import org.example.secondsemlastp.dto.SeekerDto;
import org.example.secondsemlastp.service.SeekerService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/Seeker")
@CrossOrigin(origins = "*")
public class SeekerController {

    @Autowired
    private SeekerService seekerService;


    @PostMapping("save")
    private ResponseUtil saveDonner(@RequestBody SeekerDto seekerDto){
        seekerService.saveSeeker(seekerDto);
        return new ResponseUtil(200 ,"Seeker create successfully" , null);
    }



    @GetMapping("getAll")
    private ResponseUtil loadAllSeekers(){
        return new ResponseUtil(201, "loaded Seekers" , seekerService.loadAllSeekers());

    }

}
