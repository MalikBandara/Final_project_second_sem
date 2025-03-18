package org.example.secondsemlastp.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class PendingSeeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pendingSeeker;
    private String pendingSeekerName;
    private String email;
    private String contact;
    private String address;
    private String description;

    @Column(name = "status", nullable = false)
    private String status = "Pending"; // Default value "ENUM"

    @ManyToOne()
    @JoinColumn(name = "hospital_id")
    private Hospital hospitalId;

    @ManyToOne
    @JoinColumn(name = "blood_id")
    private Blood bloodId;

}
