package org.example.secondsemlastp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
    private String bloodBankName;
    private String location;
    private String contact;


    //Associate table creation
    @ManyToMany
    @JoinTable(
            name = "hospital_blood_bank", // table name
            joinColumns = @JoinColumn(name = "blood_bank_id"), //blood bank table column name
            inverseJoinColumns = @JoinColumn(name = "hosipital_id") // hospital table column name
    )
    private Set<Hospital> hospitals = new HashSet<>(); //use for map by in hospital side.

    @OneToMany(mappedBy = "bloodBank")
    @JsonManagedReference // use for bidirectional relationship
    private List<Blood> bloodPacket;

}
