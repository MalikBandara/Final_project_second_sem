package org.example.secondsemlastp.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.secondsemlastp.entity.BloodBank;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodDto {

    private int bloodID;
    private String bloodGroup;
    private Double bloodQty;
    private int bloodBank; //store only the id not the entire entity
}
