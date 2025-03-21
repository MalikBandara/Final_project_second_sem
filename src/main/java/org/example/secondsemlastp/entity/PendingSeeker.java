package org.example.secondsemlastp.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
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

    private int age;

    @Column(name = "status", nullable = false)
    private String status = "Pending";

    @ManyToOne()
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "blood_id")
    private Blood bloodId;

    @OneToOne(mappedBy = "pendingSeekerId" , cascade = CascadeType.ALL)
    @JsonBackReference
    private Seeker seeker;

}
