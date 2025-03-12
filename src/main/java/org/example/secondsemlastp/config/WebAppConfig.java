package org.example.secondsemlastp.config;


import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebAppConfig {


    //dto convert into entity using this
    @Bean
    public ModelMapper modelMapper(){
        return  new ModelMapper();
    }
}
