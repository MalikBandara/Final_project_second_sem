package org.example.secondsemlastp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PendingDonner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pendingDonnerId;

    @Pattern(regexp = "^[a-zA-Z\\s]{5,20}$", message = "Invalid Donner Name Please Enter Again!")
    private String donnerName;

    private int age;
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid Email Address! Please enter a valid email.")
    private String email;

    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid Contact Number !")
    private String contact;

    @Pattern(regexp = "^[a-zA-Z0-9\\s,.-]{5,50}$", message = "Invalid Address! Please enter a valid address.")
    private String address;

    @Pattern(regexp = "^[a-zA-Z0-9\\s,.'\"()\\-]{10,200}$", message = "Invalid Description! Please enter a valid description.")
    private String description;

    @ManyToOne
    @JoinColumn(name = "hospitalId" ,nullable = false)
    @JsonManagedReference
    private Hospital hospitalId;

    @ManyToOne
    @JoinColumn(name = "bloodID" ,nullable = false)
    @JsonManagedReference
    private Blood blood;

    @Column(name = "status", nullable = false)
    private String status = "Pending";

    @OneToOne(mappedBy = "pendingDonner" , cascade = CascadeType.ALL ,orphanRemoval = true )
    @JsonBackReference
    private Donner donner;
}
