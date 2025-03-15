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
    @JoinColumn(name = "hospitalId")
    @JsonManagedReference // Serialize this relationship
    private Hospital hospitalId;

    @ManyToOne
    @JoinColumn(name = "bloodID")
    @JsonManagedReference // Serialize this relationship
    private Blood blood;
}
