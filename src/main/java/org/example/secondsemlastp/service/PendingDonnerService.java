package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.PendingDonnerDto;
import org.example.secondsemlastp.util.ResponseUtil;

import java.util.List;
import java.util.Map;

public interface PendingDonnerService {
    void savePDonner(PendingDonnerDto pendingDonnerDto);

    void deletePendingDonner(Integer id);

    void updatePDonner(PendingDonnerDto pendingDonnerDto);

    List<PendingDonnerDto> getAll();

    void updateStatus(Integer id);

    void rejectDonner(Integer id);

    List<Map<String,Object>>  getPendingDonorById(Integer pendingDonnerId);

    void updateStatusTOReject(Integer id);
}
