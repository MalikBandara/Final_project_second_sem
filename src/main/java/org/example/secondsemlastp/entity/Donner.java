package org.example.secondsemlastp.entity;


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
public class Donner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int donnerId;
    private String donnerName;
    private int age ;
    private String contact;
    private String email;
    private String description;
    private String address;
    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospitalId;

    @ManyToOne
    @JoinColumn(name = "blood_id")
    private Blood blood;

    @OneToOne
    @JoinColumn(name = "pendingDonnerId")
    @JsonManagedReference
    private PendingDonner pendingDonner;

}
