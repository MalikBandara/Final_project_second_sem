package org.example.secondsemlastp.entity;


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
    private int bloodID;
    private String bloodGroup;
    private Double bloodQty;

    @ManyToOne
    @JoinColumn(name = "bloodBankId")
    private BloodBank bloodBank;




}
