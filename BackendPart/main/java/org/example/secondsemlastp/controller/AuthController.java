package org.example.secondsemlastp.controller;

import org.example.secondsemlastp.dto.LoginDto;

import org.example.secondsemlastp.dto.LoginResponseDto;
import org.example.secondsemlastp.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    // When user logs in, generate a JWT token
    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponseDto> userLogin(@RequestBody LoginDto loginDto) {
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token
            String jwtToken = jwtUtils.generateJwtToken(authentication);

            // Create response
            LoginResponseDto response = new LoginResponseDto(jwtToken, "Login successful");

            // Return a ResponseEntity with the JWT token and HTTP status
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // In case of an error, send a bad request response
            LoginResponseDto errorResponse = new LoginResponseDto(null, "Invalid credentials");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
