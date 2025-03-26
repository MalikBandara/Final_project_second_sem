package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.HospitalDto;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.service.HospitalService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepo hospitalRepo;


    @Autowired
    private ModelMapper modelMapper;


    @Override
    public void saveHospitals(HospitalDto hospitalDto) {

        if (hospitalRepo.existsById(hospitalDto.getHospitalId())){
            throw new RuntimeException("Hospital Already Exist ");
        }
        hospitalRepo.save(modelMapper.map(hospitalDto , Hospital.class));



    }

    @Override
    public List<HospitalDto> loadHospitals() {
            return modelMapper.map(hospitalRepo.findAll(), new TypeToken<List<Hospital>>(){}.getType());
    }

    @Override
    public void updateHospitals(HospitalDto hospitalDto) {
        if (hospitalRepo.existsById(hospitalDto.getHospitalId())){
            hospitalRepo.save(modelMapper.map(hospitalDto , Hospital.class));
        }else {
            throw new RuntimeException("cant find hospital id to update");
        }

    }

    @Override
    public void deleteHospital(Integer id) {
        if (hospitalRepo.existsById(id)){
            hospitalRepo.deleteById(id);
        }else {
            throw new RuntimeException("can't find id ");
        }
    }

    @Override
    public List<Map<String, Object>> getHospitalIdAndName() {
        List<Object[]> hospitalIdAndName = hospitalRepo.findHospitalIdAndName();

        List<Map<String,Object>> hospitalDetails = new ArrayList<>();

        for (Object[] row : hospitalIdAndName){
            Map<String,Object> map = new HashMap<>();
            map.put("hospitalId",row[0]);
            map.put("hospitalName", row[1]);
            hospitalDetails.add(map);
        }
        return hospitalDetails;

    }

    @Override
    public Long loadHospitalCount() {
       return hospitalRepo.count();
    }
}
