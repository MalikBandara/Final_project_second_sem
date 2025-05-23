package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.BloodDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.BloodBank;
import org.example.secondsemlastp.repo.BloodBankRepo;
import org.example.secondsemlastp.repo.BloodRepo;
import org.example.secondsemlastp.service.BloodService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BloodServiceImpl implements BloodService {


    @Autowired
    private BloodRepo bloodRepo;

    @Autowired
    private BloodBankRepo bloodBankRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveBlood(BloodDto bloodDto) {

        //id eka exist ?
        if (bloodRepo.existsById(bloodDto.getBloodID())){
            throw  new RuntimeException("id already exist");
        }

        System.out.println(bloodDto.getBloodBankId());
        //search the blood bank id from database
        BloodBank bloodBank = bloodBankRepo.findById(bloodDto.getBloodBankId()).orElseThrow(() -> new RuntimeException("Check the Fields Again Fields Not Correct  "));

        //convert dto into entity
        Blood blood = modelMapper.map(bloodDto, Blood.class);
        blood.setBloodBank(bloodBank);

        bloodRepo.save(blood);
    }

    @Override
    public void deleteBlood(Integer id) {
        if (bloodRepo.existsById(id)){
            bloodRepo.deleteById(id);
        }else {
            throw new RuntimeException("id doesn't exist");
        }
    }

    @Override
    public List<BloodDto> loadAllBlood() {
        List<Blood> bloodList = bloodRepo.findAll();
        return bloodList.stream().map(blood -> {
            BloodDto dto = modelMapper.map(blood, BloodDto.class);
            dto.setBloodBankId(blood.getBloodBank().getBloodBankID());  // Manually set BloodBank ID
            return dto;
        }).toList();
    }

    @Override
    public void updateBlood(BloodDto bloodDto) {
        if (bloodRepo.existsById(bloodDto.getBloodID())) {
            // Fetch the existing Blood entity
            Blood existingBlood = bloodRepo.findById(bloodDto.getBloodID())
                    .orElseThrow(() -> new RuntimeException("Blood entity not found"));

            // Map the updated fields from BloodDto to the existing Blood entity
            modelMapper.map(bloodDto, existingBlood);

            // Fetch the BloodBank entity using the provided bloodBankId from the BloodDto
            BloodBank bloodBank = bloodBankRepo.findById(bloodDto.getBloodBankId())
                    .orElseThrow(() -> new RuntimeException("BloodBank entity not found"));

            // Set the BloodBank entity in the existing Blood entity
            existingBlood.setBloodBank(bloodBank);

            // Save the updated Blood entity
            bloodRepo.save(existingBlood);
        } else {
            throw new RuntimeException("Blood ID does not exist");
        }
    }



    @Override
    public List<Map<String, Object>> loadIdsAndNames() {
        List<Object[]> allBloodBankIdsAndGroups = bloodRepo.findAllBloodBankIdsAndGroups();

        List<Map<String,Object>> bloodDetails = new ArrayList<>();

        for (Object[] row : allBloodBankIdsAndGroups){
            Map<String ,Object> map = new HashMap<>();
            map.put("bloodId" ,row[0]);
            map.put("bloodName", row[1]);
            bloodDetails.add(map);
        }
        return bloodDetails;
    }

}
