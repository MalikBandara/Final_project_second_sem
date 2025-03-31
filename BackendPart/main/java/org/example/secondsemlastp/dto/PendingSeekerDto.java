package org.example.secondsemlastp.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.secondsemlastp.entity.Blood;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PendingSeekerDto {

    private int pendingSeekerId;
    private String pendingSeekerName;
    private String email;
    private String contact;
    private String address;
    private String description;
    private int age ;
    private int hospitalId;
    private int bloodId;

}
