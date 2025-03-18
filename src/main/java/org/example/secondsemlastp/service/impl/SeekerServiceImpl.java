package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.SeekerDto;
import org.example.secondsemlastp.entity.PendingSeeker;
import org.example.secondsemlastp.entity.Seeker;
import org.example.secondsemlastp.repo.PendingSeekerRepo;
import org.example.secondsemlastp.repo.SeekerRepo;
import org.example.secondsemlastp.service.SeekerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SeekerServiceImpl implements SeekerService {

    @Autowired
    private SeekerRepo seekerRepo;

    @Autowired
    private PendingSeekerRepo pendingSeekerRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void saveSeeker(SeekerDto seekerDto) {
        if (seekerRepo.existsById(seekerDto.getSeekerId())){
            throw new RuntimeException("Seeker Already exist ");
        }else {
            Seeker seeker = modelMapper.map(seekerDto, Seeker.class);

            if (seekerDto.getPendingSeekerId()>0){
                PendingSeeker pendingSeeker = pendingSeekerRepo.findById(seekerDto.getPendingSeekerId()).orElseThrow(() -> new RuntimeException("Pending seeker not exist "));

                seeker.setPendingSeekerId(pendingSeeker);

                seekerRepo.save(seeker);
            }


        }
    }
}
