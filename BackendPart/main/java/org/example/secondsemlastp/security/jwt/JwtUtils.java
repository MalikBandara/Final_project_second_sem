package org.example.secondsemlastp.security.jwt;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;

@Configuration
public class JwtUtils {

    @Value("${app.secret}")
    private String secret;

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)); // generate key with secret
    }


    // after authenticate generate user come to this method
    public String generateJwtToken(Authentication authentication){


        UserDetails userDetails = (UserDetails)authentication.getPrincipal();


        // generate jwt token for the user details
        // 24 hours
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 1000 * 60 * 60 * 24))
                .signWith(key() , SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateJwtToken(String token){
            try{
                Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
                return true;

            }catch (Exception e ){
                e.printStackTrace();
                return false;
            }
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key()) // Ensure key() returns a valid secret key
                .build()
                .parseClaimsJws(token) // ✅ Correct method
                .getBody()
                .getSubject();
    }

}
