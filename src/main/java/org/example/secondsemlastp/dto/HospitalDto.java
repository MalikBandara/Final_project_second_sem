package org.example.secondsemlastp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HospitalDto {


    private int hospitalId;
    private String hospitalName;
    private String location;
    private String contact;
}
