package org.example.secondsemlastp.service;

import org.example.secondsemlastp.dto.UserDto;

import java.util.List;

public interface UserService {
    void createUser(UserDto userDto);

    List<UserDto> loadUser();
}
