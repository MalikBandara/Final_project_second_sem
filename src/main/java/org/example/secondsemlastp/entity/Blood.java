package org.example.secondsemlastp.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Blood {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bloodID;
    private String bloodGroup;
    private Double bloodQty;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bloodBankId")
    @JsonBackReference //add this for creating loop in getData Json use for bidirectional relationship
    private BloodBank bloodBank;





}
