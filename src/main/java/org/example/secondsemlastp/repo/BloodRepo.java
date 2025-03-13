package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.Blood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodRepo extends JpaRepository<Blood,Integer> {
}
