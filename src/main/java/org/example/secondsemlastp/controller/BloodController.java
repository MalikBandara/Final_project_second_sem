package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.BloodDto;
import org.example.secondsemlastp.service.BloodService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/blood")
@CrossOrigin(origins = "*")
public class BloodController {

    @Autowired
    private BloodService bloodService;


    @PostMapping("save")
    private ResponseUtil saveBlood(@RequestBody BloodDto bloodDto){
        bloodService.saveBlood(bloodDto);
        return new ResponseUtil(200, "save blood", null);
    }


    @DeleteMapping("delete/{id}")
    private ResponseUtil deleteBlood(@PathVariable Integer id){
        bloodService.deleteBlood(id);
        return  new ResponseUtil(201,"delete Blood", null);
    }


    @GetMapping("getAll")
    private ResponseUtil loadAllBlood(){
        return new ResponseUtil(201,"all blood loaded",bloodService.loadAllBlood());
    }


    @PutMapping("update")
    private ResponseUtil updateBlood(@RequestBody BloodDto bloodDto){
        bloodService.updateBlood(bloodDto);
        return new ResponseUtil(201, "üpdate blood" , null);
    }


    @GetMapping("loadBId")
    private ResponseUtil getIdsAndName(){
        List<Map<String, Object>> bloodDetails = bloodService.loadIdsAndNames();
        return  new ResponseUtil(201, "blood id and name "  , bloodDetails);

    }
}
