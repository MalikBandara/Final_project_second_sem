package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.BloodBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BloodBankRepo extends JpaRepository<BloodBank , Integer> {

    //pass entity and primary key type
}
