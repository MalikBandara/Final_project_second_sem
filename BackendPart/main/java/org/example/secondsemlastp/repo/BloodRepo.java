    package org.example.secondsemlastp.repo;

    import org.example.secondsemlastp.entity.Blood;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.stereotype.Repository;

    import java.util.List;

    @Repository
    public interface BloodRepo extends JpaRepository<Blood,Integer> {
        @Query("SELECT b.bloodID ,b.bloodGroup FROM Blood b")
        List<Object[]> findAllBloodBankIdsAndGroups();
    }
