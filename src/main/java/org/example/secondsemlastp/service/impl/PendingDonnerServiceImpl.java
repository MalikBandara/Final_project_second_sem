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
import org.example.secondsemlastp.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Override
    public List<Map<String, Object>> getPendingDonorById(Integer pendingDonnerId) {
        Optional<PendingDonner> donor = pendingDonnerRepository.findById(pendingDonnerId);

        // Check if the donor is present
        if (donor.isPresent()) {
            PendingDonner pendingDonner = donor.get();

            // Create a list of maps to hold the donor's data
            List<Map<String, Object>> donorDataList = new ArrayList<>();

            // Create a map to hold the donor's data
            Map<String, Object> donorDataMap = new HashMap<>();

            // Populate the map with the donor's details
            donorDataMap.put("address", pendingDonner.getAddress());
            donorDataMap.put("age", pendingDonner.getAge());
            donorDataMap.put("bloodGroup", pendingDonner.getBlood().getBloodGroup());
            donorDataMap.put("bloodID", pendingDonner.getBlood().getBloodID());
            donorDataMap.put("bloodQty", pendingDonner.getBlood().getBloodQty());
            donorDataMap.put("contact", pendingDonner.getContact());
            donorDataMap.put("description", pendingDonner.getDescription());
            donorDataMap.put("donnerName", pendingDonner.getDonnerName());
            donorDataMap.put("email", pendingDonner.getEmail());

            // Hospital details, assuming hospital is embedded in PendingDonner entity
            donorDataMap.put("hospitalId", pendingDonner.getHospitalId().getHospitalId());
            donorDataMap.put("hospitalName", pendingDonner.getHospitalId().getHospitalName());
            donorDataMap.put("location", pendingDonner.getHospitalId().getLocation());
            donorDataMap.put("hospitalContact", pendingDonner.getHospitalId().getContact());

            // Status and pendingDonnerId
            donorDataMap.put("status", pendingDonner.getStatus());
            donorDataMap.put("pendingDonnerId", pendingDonner.getPendingDonnerId());

            // Add the map to the list
            donorDataList.add(donorDataMap);

            // Return the list containing the map of the donor's details
            return donorDataList;
        } else {
            // Return an empty list if no donor is found
            return new ArrayList<>();
        }
    }

    @Override
    public void updateStatusTOReject(Integer id) {
        Optional<PendingDonner> byId = pendingDonnerRepository.findById(id);

        if (byId.isPresent()){
            PendingDonner pendingDonner = byId.get();
            pendingDonner.setStatus("Rejected");
            pendingDonnerRepository.save(pendingDonner);
        }else {
            throw  new RuntimeException("donner id not found");
        }
    }


}
