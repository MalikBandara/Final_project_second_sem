package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.PendingSeekerDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.entity.PendingSeeker;
import org.example.secondsemlastp.repo.BloodRepo;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.repo.PendingSeekerRepo;
import org.example.secondsemlastp.service.PendingSeekerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingSeekerServiceImpl implements PendingSeekerService {

    @Autowired
    private PendingSeekerRepo pendingSeekerRepo;


    @Autowired
    private HospitalRepo hospitalRepo;

    @Autowired
    private BloodRepo bloodRepo;


    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void savePendingSeeker(PendingSeekerDto pendingSeekerDto) {
        if (pendingSeekerRepo.existsById(pendingSeekerDto.getPendingSeekerId())){
            throw  new RuntimeException("Patient already registered ");
        }
        else {
            Hospital hospitalId = hospitalRepo.findById(pendingSeekerDto.getHospitalId()).orElseThrow(() -> new RuntimeException("Hospital Id not found"));

            Blood bloodId = bloodRepo.findById(pendingSeekerDto.getBloodId()).orElseThrow(() -> new RuntimeException("blood id not found"));

            PendingSeeker pendingSeeker = new PendingSeeker();

            pendingSeeker.setPendingSeeker(pendingSeekerDto.getPendingSeekerId());
            pendingSeeker.setPendingSeekerName(pendingSeekerDto.getPendingSeekerName());
            pendingSeeker.setDescription(pendingSeekerDto.getDescription());
            pendingSeeker.setContact(pendingSeekerDto.getContact());
            pendingSeeker.setEmail(pendingSeekerDto.getEmail());
            pendingSeeker.setAddress(pendingSeekerDto.getAddress());
            pendingSeeker.setStatus(pendingSeekerDto.getStatus());
            pendingSeeker.setHospitalId(hospitalId);
            pendingSeeker.setBloodId(bloodId);


            pendingSeekerRepo.save(pendingSeeker);
        }
    }
}
