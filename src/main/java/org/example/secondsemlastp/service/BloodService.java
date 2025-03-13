package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.BloodDto;

import java.util.List;

public interface BloodService {
    void saveBlood(BloodDto bloodDto);

    void deleteBlood(Integer id);

    List<BloodDto> loadAllBlood();
}
