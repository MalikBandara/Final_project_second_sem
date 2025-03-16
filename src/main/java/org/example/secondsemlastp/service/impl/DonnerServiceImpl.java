package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.DonnerDto;
import org.example.secondsemlastp.entity.Donner;
import org.example.secondsemlastp.entity.PendingDonner;
import org.example.secondsemlastp.repo.DonnerRepo;
import org.example.secondsemlastp.repo.PendingDonnerRepo;
import org.example.secondsemlastp.service.DonnerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonnerServiceImpl implements DonnerService {


    @Autowired
    private DonnerRepo donnerRepo;

    @Autowired
    private ModelMapper modelMapper;

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

}
