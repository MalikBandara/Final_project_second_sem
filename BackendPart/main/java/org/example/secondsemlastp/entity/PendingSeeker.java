package org.example.secondsemlastp.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class PendingSeeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pendingSeeker;

    @Pattern(regexp = "^[a-zA-Z\\s]{5,20}$", message = "Invalid Patient Name Please Enter Again!")
    private String pendingSeekerName;

    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid Email Address! Please enter a valid email.")
    private String email;

    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid Contact Number !")
    private String contact;

    @Pattern(regexp = "^[a-zA-Z0-9\\s,.-]{5,50}$", message = "Invalid Address! Please enter a valid address.")
    private String address;

    @Pattern(regexp = "^[a-zA-Z0-9\\s,.'\"()\\-]{10,200}$", message = "Invalid Description! Please enter a valid description.")
    private String description;

    private int age;

    @Column(name = "status", nullable = false)
    private String status = "Pending";

    @ManyToOne()
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "blood_id")
    private Blood bloodId;

    @OneToOne(mappedBy = "pendingSeekerId" , cascade = CascadeType.ALL)
    @JsonBackReference
    private Seeker seeker;

}
