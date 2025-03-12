package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.BloodBankDto;

import java.util.List;
import java.util.Map;

public interface BloodBankService {
    void saveBloodBank(BloodBankDto bloodBankDto);

    List<BloodBankDto> loadAllBank();

    void deleteBloodBank(Integer id);

    void updateBloodBank(BloodBankDto bloodBankDto);

    List<Map<String,Object>> findIds();
}
