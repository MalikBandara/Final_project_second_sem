package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.HospitalDto;
import org.example.secondsemlastp.entity.Hospital;
import org.springframework.stereotype.Service;


public interface HospitalService {

     void saveHospitals(HospitalDto hospitalDto) ;
}
