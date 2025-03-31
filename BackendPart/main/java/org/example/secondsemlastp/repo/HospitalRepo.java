package org.example.secondsemlastp.repo;


import org.example.secondsemlastp.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepo  extends JpaRepository<Hospital , Integer> {

    @Query("SELECT h.hospitalId ,h.hospitalName FROM Hospital h")
    List<Object[]> findHospitalIdAndName();

    long count();
}
