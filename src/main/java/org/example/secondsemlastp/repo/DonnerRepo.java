package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.Donner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonnerRepo extends JpaRepository<Donner , Integer> {

    long count();
}
