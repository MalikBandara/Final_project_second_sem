package org.example.secondsemlastp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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

    private String donnerName;
    private int age;
    private String email;
    private String contact;
    private String address;
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
