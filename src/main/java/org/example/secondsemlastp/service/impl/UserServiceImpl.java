package org.example.secondsemlastp.service.impl;

import org.example.secondsemlastp.dto.UserDto;
import org.example.secondsemlastp.entity.User;
import org.example.secondsemlastp.repo.UserRepo;
import org.example.secondsemlastp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;


    @Override
    public void createUser(UserDto userDto) {
        if (userRepo.existsById(userDto.getUserId())){
            throw new RuntimeException("User already exist ");
        }else {
            userRepo.save(modelMapper.map(userDto , User.class));
        }
    }
}
