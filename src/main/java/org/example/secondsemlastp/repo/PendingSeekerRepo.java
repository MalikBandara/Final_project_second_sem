package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.PendingSeeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingSeekerRepo extends JpaRepository<PendingSeeker ,Integer> {
}
