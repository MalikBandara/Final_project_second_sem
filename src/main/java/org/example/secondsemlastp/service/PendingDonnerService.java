package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.PendingDonnerDto;

import java.util.List;

public interface PendingDonnerService {
    void savePDonner(PendingDonnerDto pendingDonnerDto);

    void deletePendingDonner(Integer id);

    void updatePDonner(PendingDonnerDto pendingDonnerDto);

    List<PendingDonnerDto> getAll();
}
