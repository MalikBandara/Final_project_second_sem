package org.example.secondsemlastp.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PendingDonnerDto {


    private  int pendingDonnerId;

    private String donnerName;

    private int age;

    private  String email;

    private String contact;

    private  String address;

    private String description;

    private int hospitalId;
    private int  blood;

}
