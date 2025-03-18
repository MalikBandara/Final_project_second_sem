package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.PendingSeekerDto;
import org.example.secondsemlastp.service.PendingSeekerService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/PSeeker")
@CrossOrigin(origins = "*")
public class PendingSeekerController {

    @Autowired
    private PendingSeekerService pendingSeekerService;


    @PostMapping("save")
    private ResponseUtil savePendingSeeker(@RequestBody PendingSeekerDto pendingSeekerDto){
        pendingSeekerService.savePendingSeeker(pendingSeekerDto);
        return new ResponseUtil(200,"Patient Register Successfully" , null);
    }


    @GetMapping("getAll")
    private ResponseUtil LoadAllSeekers(){
        return new ResponseUtil(201,"seekers loaded !" , pendingSeekerService.loadSeekers());
    }
}

