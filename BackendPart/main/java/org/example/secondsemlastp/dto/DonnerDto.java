package org.example.secondsemlastp.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DonnerDto {

    private int donnerId;
    private String donnerName;
    private int age;
    private String contact;
    private String email;
    private String description;
    private String address;
    private int hospitalId;
    private int bloodId;
    private int pendingDonnerId;
}
