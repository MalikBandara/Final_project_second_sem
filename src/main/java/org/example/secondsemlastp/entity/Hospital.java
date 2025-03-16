package org.example.secondsemlastp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hospital_id")
    private int hospitalId;

    @Column(name = "hospital_name", nullable = false, length = 100)
    private String hospitalName;

    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Column(name = "contact", length = 15)
    private String contact;

    @ManyToMany(mappedBy = "hospitals")
    @JsonIgnore // Prevent circular reference during serialization
    private Set<BloodBank> bloodBankSet = new HashSet<>();

    @OneToMany(mappedBy = "hospitalId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevent circular reference during serialization
    private List<PendingDonner> pendingDonnerIds;

    @OneToMany(mappedBy = "hospitalId", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Donner> donnerIds;
}
