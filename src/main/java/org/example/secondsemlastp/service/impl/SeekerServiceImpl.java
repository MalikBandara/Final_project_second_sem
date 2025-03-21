package org.example.secondsemlastp.service.impl;

import jakarta.transaction.Transactional;
import org.example.secondsemlastp.dto.SeekerDto;
import org.example.secondsemlastp.entity.Blood;
import org.example.secondsemlastp.entity.Hospital;
import org.example.secondsemlastp.entity.PendingSeeker;
import org.example.secondsemlastp.entity.Seeker;
import org.example.secondsemlastp.repo.BloodRepo;
import org.example.secondsemlastp.repo.HospitalRepo;
import org.example.secondsemlastp.repo.PendingSeekerRepo;
import org.example.secondsemlastp.repo.SeekerRepo;
import org.example.secondsemlastp.service.SeekerService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SeekerServiceImpl implements SeekerService {

    @Autowired
    private SeekerRepo seekerRepo;

    @Autowired
    private PendingSeekerRepo pendingSeekerRepo;

    @Autowired
    private BloodRepo bloodRepo;

    @Autowired
    private HospitalRepo hospitalRepo;

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

    @Override
    public List<SeekerDto> loadAllSeekers() {

        return modelMapper.map(seekerRepo.findAll() , new TypeToken<List<Seeker>>(){}.getType());
    }

    @Override
    @Transactional
    public void updateSeeker(SeekerDto seekerDto) {


        Seeker existingSeeker = seekerRepo.findById(seekerDto.getSeekerId()).orElseThrow(() -> new RuntimeException("seeker not found"));


        Blood bloodId = bloodRepo.findById(seekerDto.getBloodId()).orElseThrow(() -> new RuntimeException("blood id not found "));

        Hospital hospitalId = hospitalRepo.findById(seekerDto.getHospitalId()).orElseThrow(() -> new RuntimeException("hospital id not found "));


        existingSeeker.setSeekerId(seekerDto.getSeekerId());
        existingSeeker.setSeekerName(seekerDto.getSeekerName());
        existingSeeker.setAge(seekerDto.getAge());
        existingSeeker.setContact(seekerDto.getContact());
        existingSeeker.setEmail(seekerDto.getEmail());
        existingSeeker.setAddress(seekerDto.getAddress());
        existingSeeker.setDescription(seekerDto.getDescription());
        existingSeeker.setBloodId(bloodId);
        existingSeeker.setHospital(hospitalId);

        if (existingSeeker.getPendingSeekerId()!= null){
            PendingSeeker pendingSeeker = existingSeeker.getPendingSeekerId();
            pendingSeeker.setPendingSeekerName(seekerDto.getSeekerName());
            pendingSeeker.setAge(seekerDto.getAge());
            pendingSeeker.setContact(seekerDto.getContact());
            pendingSeeker.setEmail(seekerDto.getEmail());
            pendingSeeker.setAddress(seekerDto.getAddress());
            pendingSeeker.setBloodId(bloodId);
            pendingSeeker.setHospital(hospitalId);
            pendingSeeker.setDescription(seekerDto.getDescription());

            pendingSeekerRepo.save(pendingSeeker);
        }

        seekerRepo.save(existingSeeker);


    }

    @Override
    public void deleteSeeker(Integer id) {
        if (seekerRepo.existsById(id)){
            seekerRepo.deleteById(id);
        }else {
            throw new RuntimeException("seeker id not found");
        }

    }
}
