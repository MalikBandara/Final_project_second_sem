package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.PendingDonnerDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.entity.PendingDonner;

import org.example.secondsemlastp.repo.BloodBankRepo;
import org.example.secondsemlastp.repo.BloodRepo;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.repo.PendingDonnerRepo;
import org.example.secondsemlastp.service.PendingDonnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingDonnerServiceImpl implements PendingDonnerService {

    @Autowired
    private BloodRepo bloodRepository; // Assuming you have this repository


    @Autowired
    private HospitalRepo hospitalRepo;


    @Autowired
    private PendingDonnerRepo pendingDonnerRepository;

    @Override
    public void savePDonner(PendingDonnerDto pendingDonnerDto) {
        // Fetch the Blood entity by bloodId
        Blood blood = bloodRepository.findById(pendingDonnerDto.getBlood())
                .orElseThrow(() -> new RuntimeException("Blood entity not found"));

        Hospital hospital = hospitalRepo.findById(pendingDonnerDto.getHospitalId()).orElseThrow(() -> new RuntimeException("Hospital entity not found "));


        // Create a new PendingDonner entity and set the properties
        PendingDonner pendingDonner = new PendingDonner();
        pendingDonner.setDonnerName(pendingDonnerDto.getDonnerName());
        pendingDonner.setAge(pendingDonnerDto.getAge());
        pendingDonner.setEmail(pendingDonnerDto.getEmail());
        pendingDonner.setContact(pendingDonnerDto.getContact());
        pendingDonner.setAddress(pendingDonnerDto.getAddress());
        pendingDonner.setDescription(pendingDonnerDto.getDescription());

        // Set the Blood entity in the PendingDonner entity
        pendingDonner.setBlood(blood);
        pendingDonner.setHospitalId(hospital);

        // Save the PendingDonner entity
        pendingDonnerRepository.save(pendingDonner);
    }
}
