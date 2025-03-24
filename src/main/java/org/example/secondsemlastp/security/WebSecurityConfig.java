package org.example.secondsemlastp.security;


import org.apache.catalina.filters.ExpiresFilter;
import org.example.secondsemlastp.security.jwt.AuthEntryPoint;
import org.example.secondsemlastp.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {



        @Autowired
        private UserDetailServiceImpl userDetailService;

        @Autowired
        private AuthEntryPoint unauthorizedHandler;

        @Bean
        public UserDetailsService userDetailsService(){
            return new UserDetailServiceImpl();
        }

        @Bean
        public AuthTokenFilter authTokenFilter(){
            return new AuthTokenFilter();
        }

        @Bean
        public PasswordEncoder passwordEncoder(){

            return  new BCryptPasswordEncoder();
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider(){
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setUserDetailsService(userDetailService);
            provider.setPasswordEncoder(passwordEncoder());
            return provider;
        }
        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig ) throws  Exception{
            return authConfig.getAuthenticationManager();

        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
            http.csrf(csrf -> csrf.disable())
                    .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) //auth entry point
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Session management
                    .authorizeHttpRequests(auth ->
                            auth.requestMatchers("/auth/***").permitAll() // allow without authentication
                                    .anyRequest().authenticated()
                    );

            http.authenticationProvider(authenticationProvider()); // set the authentication provider

            http.addFilterBefore(authTokenFilter() , UsernamePasswordAuthenticationFilter.class);

            return http.build();
        }


}
