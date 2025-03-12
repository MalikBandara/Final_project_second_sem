package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.HospitalDto;
import org.example.secondsemlastp.entity.Hospital;
import org.springframework.stereotype.Service;

import java.util.List;


public interface HospitalService {

     void saveHospitals(HospitalDto hospitalDto) ;

     List<HospitalDto> loadHospitals();

     void updateHospitals(HospitalDto hospitalDto);

     void deleteHospital(Integer id);
}
