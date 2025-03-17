package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.DonnerDto;
import org.example.secondsemlastp.entity.Donner;

import java.util.List;

public interface DonnerService {
    void saveDonner(DonnerDto donnerDto);

    List<DonnerDto> getAllDonner();

    void updateDonner(DonnerDto donnerDto);

    void deleteDonner(Integer id);
}
