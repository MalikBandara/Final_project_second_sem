package org.example.secondsemlastp.repo;


import org.example.secondsemlastp.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepo  extends JpaRepository<Hospital , Integer> {
}
