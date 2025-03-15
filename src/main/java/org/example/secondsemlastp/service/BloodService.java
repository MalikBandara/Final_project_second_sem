package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.BloodDto;

import java.util.List;
import java.util.Map;

public interface BloodService {
    void saveBlood(BloodDto bloodDto);

    void deleteBlood(Integer id);

    List<BloodDto> loadAllBlood();

    void updateBlood(BloodDto bloodDto);

    List<Map<String,Object>> loadIdsAndNames();
}
