package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.BloodBankDto;
import org.example.secondsemlastp.dto.BloodDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.BloodBank;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.repo.BloodBankRepo;
import org.example.secondsemlastp.service.BloodBankService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


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
        // Check if the blood bank with the given ID exists
        if (!bloodBankRepo.existsById(bloodBankDto.getBloodBankID())) {
            throw new RuntimeException("Blood bank with ID " + bloodBankDto.getBloodBankID() + " not found!");
        }

        // Retrieve the existing BloodBank entity from the repository
        BloodBank existingBloodBank = bloodBankRepo.findById(bloodBankDto.getBloodBankID())
                .orElseThrow(() -> new RuntimeException("Blood bank with ID " + bloodBankDto.getBloodBankID() + " not found!"));

        // Update the BloodBank entity fields
        existingBloodBank.setBloodBankName(bloodBankDto.getName());
        existingBloodBank.setLocation(bloodBankDto.getLocation());
        existingBloodBank.setContact(bloodBankDto.getContact());

        // Update the associated hospitals (ManyToMany relationship)




        // Save the updated BloodBank entity
        bloodBankRepo.save(existingBloodBank);
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

    @Override
    public Long loadCount() {
     return bloodBankRepo.count();
    }


}
