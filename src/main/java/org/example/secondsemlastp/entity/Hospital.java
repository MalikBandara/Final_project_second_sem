package org.example.secondsemlastp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

    @Pattern(regexp = "^[a-zA-Z\\s]{5,20}$", message = "Invalid Hospital Name !")
    @Column(name = "hospital_name", nullable = false, length = 100)
    private String hospitalName;

    @Pattern(regexp = "^[a-zA-Z\\s]{5,20}$", message = "Invalid Location type !")
    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Column(name = "contact", length = 15)
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid Contact Number !")
    private String contact;

    @ManyToMany(mappedBy = "hospitals")
    @JsonIgnore
    private Set<BloodBank> bloodBankSet = new HashSet<>();

    @OneToMany(mappedBy = "hospitalId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PendingDonner> pendingDonnerIds;

    @OneToMany(mappedBy = "hospitalId", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Donner> donnerIds;

    @OneToMany(mappedBy = "hospital" ,cascade = CascadeType.ALL,orphanRemoval = true )
    @JsonIgnore
    private List<PendingSeeker> pendingSeekerId;
}
