package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.dto.UserDto;
import org.example.secondsemlastp.service.UserService;
import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("save")
    private ResponseUtil createUser(@RequestBody UserDto userDto){
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userService.createUser(userDto);
        return new ResponseUtil(200 ,"Üser Create" , null);

    }

    @GetMapping("getAll")
    private ResponseUtil loadUser(){
        return new ResponseUtil(201, "load user" ,userService.loadUser());
    }
}
