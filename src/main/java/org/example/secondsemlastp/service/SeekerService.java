package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.SeekerDto;

import java.util.List;

public interface SeekerService {
    void saveSeeker(SeekerDto seekerDto);

    List<SeekerDto> loadAllSeekers();

    void updateSeeker(SeekerDto seekerDto);

    void deleteSeeker(Integer id);

}

