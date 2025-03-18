package org.example.secondsemlastp.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SeekerDto {

    private int seekerId;
    private String seekerName;
    private String email;
    private String contact;
    private String address;
    private String description;
    private int age;
    private int hospitalId;
    private int bloodId;
    private int pendingSeekerId;
}
