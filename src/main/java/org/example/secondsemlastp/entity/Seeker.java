package org.example.secondsemlastp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Seeker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seekerId;
    private String SeekerName;
    private String email;
    private String contact;
    private String address;
    private String description;
    private int age;

    @ManyToOne()
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;
    @ManyToOne
    @JoinColumn(name = "blood_id")
    private Blood bloodId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pending_seeker_id")
    @JsonManagedReference
    private PendingSeeker pendingSeekerId;
}
