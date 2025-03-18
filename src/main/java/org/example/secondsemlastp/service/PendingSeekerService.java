package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.PendingSeekerDto;

import java.util.List;

public interface PendingSeekerService {
    void savePendingSeeker(PendingSeekerDto pendingSeekerDto);

    List<PendingSeekerDto> loadSeekers();
}
