package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.BloodBankDto;
import org.example.secondsemlastp.entity.BloodBank;
import org.example.secondsemlastp.repo.BloodBankRepo;
import org.example.secondsemlastp.service.BloodBankService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class BloodBankServiceImpl implements BloodBankService {


    @Autowired
    private BloodBankRepo bloodBankRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveBloodBank(BloodBankDto bloodBankDto) {
        if (bloodBankRepo.existsById(bloodBankDto.getBloodBankID())){
            throw  new RuntimeException("blood id is already exist ");
        }
        bloodBankRepo.save(modelMapper.map(bloodBankDto , BloodBank.class));
        System.out.println(bloodBankDto.getName());
    }

    @Override
    public List<BloodBankDto> loadAllBank() {
        return modelMapper.map(bloodBankRepo.findAll(), new TypeToken<List<BloodBank>>(){}.getType());
    }

    @Override
    public void deleteBloodBank(Integer id) {
        if (bloodBankRepo.existsById(id)){
            bloodBankRepo.deleteById(id);
        }else {
            throw  new RuntimeException("can't find id");
        }

    }

    @Override
    public void updateBloodBank(BloodBankDto bloodBankDto) {
        if (!bloodBankRepo.existsById(bloodBankDto.getBloodBankID())) {
            throw new RuntimeException("Blood bank with ID " + bloodBankDto.getBloodBankID() + " not found!");
        }
        bloodBankRepo.save(modelMapper.map(bloodBankDto, BloodBank.class));
    }

    @Override
    public List<Map<String,Object>> findIds() {
        List<Object[]> result = bloodBankRepo.findAllBloodBankIds();
        List<Map<String,Object>> bloodBankDetails =  new ArrayList<>();

        for(Object[] row: result){
            Map<String , Object> map = new HashMap<>();
            map.put("Blood bank id " , row[0]);
            map.put("Blood bank name" ,row[1]);
            bloodBankDetails.add(map);
        }
        return bloodBankDetails;

    }


}
