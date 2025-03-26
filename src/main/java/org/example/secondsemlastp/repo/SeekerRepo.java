package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeekerRepo extends JpaRepository<Seeker ,Integer> {

    long count();
}
