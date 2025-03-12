package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.BloodBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BloodBankRepo extends JpaRepository<BloodBank , Integer> {

    @Query("SELECT b.bloodBankID ,b.bloodBankName FROM BloodBank b")
    List<Object[]> findAllBloodBankIds();
    //pass entity and primary key type
}
