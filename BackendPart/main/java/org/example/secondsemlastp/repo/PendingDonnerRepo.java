package org.example.secondsemlastp.repo;

import org.example.secondsemlastp.entity.PendingDonner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PendingDonnerRepo extends JpaRepository<PendingDonner , Integer> {
}
