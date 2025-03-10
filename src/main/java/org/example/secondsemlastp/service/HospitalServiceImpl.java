package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.HospitalDto;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
}
