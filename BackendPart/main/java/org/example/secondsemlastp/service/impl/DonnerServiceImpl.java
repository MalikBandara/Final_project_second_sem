package org.example.secondsemlastp.service.impl;

import jakarta.transaction.Transactional;
import org.example.secondsemlastp.dto.DonnerDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.Donner;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.entity.PendingDonner;
import org.example.secondsemlastp.repo.BloodRepo;
import org.example.secondsemlastp.repo.DonnerRepo;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.repo.PendingDonnerRepo;
import org.example.secondsemlastp.service.DonnerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DonnerServiceImpl implements DonnerService {


    @Autowired
    private DonnerRepo donnerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BloodRepo bloodRepo;

    @Autowired
    private HospitalRepo hospitalRepo;
    @Autowired
    private PendingDonnerRepo pendingDonnerRepo;
    @Override
    public void saveDonner(DonnerDto donnerDto) {
        if (donnerRepo.existsById(donnerDto.getDonnerId())) {
            throw new RuntimeException("Donner ID already exists");
        }

        Donner donner = modelMapper.map(donnerDto, Donner.class);

        // Fetch the existing PendingDonner before setting it
        if (donnerDto.getPendingDonnerId()>0) {
            PendingDonner pendingDonner = pendingDonnerRepo.findById(donnerDto.getPendingDonnerId())
                    .orElseThrow(() -> new RuntimeException("PendingDonner not found"));

            donner.setPendingDonner(pendingDonner); // Now set the managed entity
        }

        donnerRepo.save(donner);
    }

    @Override
    public List<DonnerDto> getAllDonner() {
        return modelMapper.map(donnerRepo.findAll() , new TypeToken<List<Donner>>(){}.getType());
    }

    @Override
    @Transactional
    public void updateDonner(DonnerDto donnerDto) {
        // Check if Donner exists
        Donner existingDonner = donnerRepo.findById(donnerDto.getDonnerId())
                .orElseThrow(() -> new RuntimeException("Donner ID not exist"));

        // Fetch associated Blood and Hospital entities
        Blood blood = bloodRepo.findById(donnerDto.getBloodId())
                .orElseThrow(() -> new RuntimeException("Blood ID not exist"));

        Hospital hospital = hospitalRepo.findById(donnerDto.getHospitalId())
                .orElseThrow(() -> new RuntimeException("Hospital ID not exist"));

        // Update Donner entity
        existingDonner.setDonnerName(donnerDto.getDonnerName());
        existingDonner.setAge(donnerDto.getAge());
        existingDonner.setContact(donnerDto.getContact());
        existingDonner.setEmail(donnerDto.getEmail());
        existingDonner.setAddress(donnerDto.getAddress());
        existingDonner.setDescription(donnerDto.getDescription());
        existingDonner.setBlood(blood);
        existingDonner.setHospitalId(hospital);

        // Update PendingDonner if exists
        if (existingDonner.getPendingDonner() != null) {
            PendingDonner pendingDonner = existingDonner.getPendingDonner();
            pendingDonner.setDonnerName(donnerDto.getDonnerName());
            pendingDonner.setAge(donnerDto.getAge());
            pendingDonner.setContact(donnerDto.getContact());
            pendingDonner.setEmail(donnerDto.getEmail());
            pendingDonner.setAddress(donnerDto.getAddress());
            pendingDonner.setDescription(donnerDto.getDescription());
            pendingDonner.setBlood(blood);
            pendingDonner.setHospitalId(hospital);

            // Save PendingDonner
            pendingDonnerRepo.save(pendingDonner);
        }

        // Save Donner
        donnerRepo.save(existingDonner);
    }



    @Override
    public void deleteDonner(Integer id) {
        if (donnerRepo.existsById(id)){
            donnerRepo.deleteById(id);
        }else {
            throw new RuntimeException("id doesn't exist");
        }
    }

    @Override
    public Long getCount() {
        long count = donnerRepo.count();
        return count;
    }

}
