package org.example.secondsemlastp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BloodBank {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int bloodBankID;
    @Pattern(regexp = "^[a-zA-Z\\s]{5,20}$", message = "Invalid Blood bank Name !")
    @Column(nullable = false, length = 100)
    private String bloodBankName;
    @Pattern(regexp = "^[a-zA-Z\\s]{5,20}$", message = "Invalid Location type !")
    @Column(nullable = false, length = 100)
    private String location;
    @Column(length = 15)
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid Contact Number !")
    private String contact;



    @ManyToMany
    @JoinTable(
            name = "hospital_blood_bank",
            joinColumns = @JoinColumn(name = "blood_bank_id"),
            inverseJoinColumns = @JoinColumn(name = "hosipital_id")
    )
    private Set<Hospital> hospitals = new HashSet<>();

    @OneToMany(mappedBy = "bloodBank",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Blood> bloodPacket;

}
