package org.example.secondsemlastp.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private int userId;
    private String userName;
    private String email;
    private String password;
    private String Role;
}
