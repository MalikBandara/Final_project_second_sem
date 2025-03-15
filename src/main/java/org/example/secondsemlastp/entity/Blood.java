package org.example.secondsemlastp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.secondsemlastp.entity.BloodBank;
import org.example.secondsemlastp.entity.PendingDonner;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Blood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bloodID;
    private String bloodGroup;
    private Double bloodQty;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bloodBankId")
    @JsonBackReference // Prevent circular reference
    private BloodBank bloodBank;

    @OneToMany(mappedBy = "blood")
    @JsonIgnore // Avoid serializing the list of PendingDonner here
    private List<PendingDonner> pendingDonners;
}
