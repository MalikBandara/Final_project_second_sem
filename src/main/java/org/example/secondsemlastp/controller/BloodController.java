package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.BloodDto;
import org.example.secondsemlastp.service.BloodService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/blood")
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
}
