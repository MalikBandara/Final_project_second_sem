package org.example.secondsemlastp.service.impl;

import jakarta.transaction.Transactional;
import org.example.secondsemlastp.dto.PendingDonnerDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.entity.PendingDonner;

import org.example.secondsemlastp.repo.BloodBankRepo;
import org.example.secondsemlastp.repo.BloodRepo;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.repo.PendingDonnerRepo;
import org.example.secondsemlastp.service.PendingDonnerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PendingDonnerServiceImpl implements PendingDonnerService {

    @Autowired
    private BloodRepo bloodRepository; // Assuming you have this repository


    @Autowired
    private HospitalRepo hospitalRepo;

    @Autowired
    private ModelMapper modelMapper;

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

    @Override
    public void deletePendingDonner(Integer id) {
        if (pendingDonnerRepository.existsById(id)){
            pendingDonnerRepository.deleteById(id);
        }else {
            throw new RuntimeException("Pending Donner Id does not exist");

        }
    }

    @Override
    public void updatePDonner(PendingDonnerDto pendingDonnerDto) {
        if (pendingDonnerRepository.existsById(pendingDonnerDto.getPendingDonnerId())){
            pendingDonnerRepository.save(modelMapper.map(pendingDonnerDto , PendingDonner.class));
        }else {
            throw new RuntimeException("id does not exist ");
        }
    }

    @Override
    public List<PendingDonnerDto> getAll() {
        return modelMapper.map(pendingDonnerRepository.findAll() , new TypeToken<List<PendingDonner>>(){}.getType());
    }

    @Override
    @Transactional
    public void updateStatus(Integer id) {
        Optional<PendingDonner> byId = pendingDonnerRepository.findById(id);

            if (byId.isPresent()){
                PendingDonner pendingDonner = byId.get();
                pendingDonner.setStatus("Approved");
                pendingDonnerRepository.save(pendingDonner);
            }else {
                throw  new RuntimeException("donner id not found");
            }

    }

    @Override
    public void rejectDonner(Integer id) {

        if (pendingDonnerRepository.existsById(id)){
            pendingDonnerRepository.deleteById(id);
        }else {
            throw new RuntimeException("pending donner is not exist ");
        }
    }
}
