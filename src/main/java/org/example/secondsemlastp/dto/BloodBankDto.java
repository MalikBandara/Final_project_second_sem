package org.example.secondsemlastp.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BloodBankDto {
    private int bloodBankID;
    private String name;
    private String location;
    private String contact;
}
