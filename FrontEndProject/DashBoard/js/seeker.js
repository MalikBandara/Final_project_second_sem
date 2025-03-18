function loadSeekerTable(){
    console.log("load")

    $.ajax({

        url:"http://localhost:8081/api/v1/Seeker/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){

            let  SeekerTableBody = $("#SeekerTableBody");
            SeekerTableBody.empty();




            response.data.forEach(seeker =>{

               let hospitalId =  seeker.hospital? seeker.hospital.hospitalId: "N/A";
               let bloodId =   seeker.bloodId? seeker.bloodId.bloodID:"N/A";
               let pendingSeekerId=  seeker.pendingSeekerId? seeker.pendingSeekerId.pendingSeeker:"N/A";


                let data = `
            <tr>
            <td>${seeker.seekerId}</td>
            <td>${seeker.seekerName}</td>
            <td>${seeker.age}</td>
            <td>${seeker.contact}</td>
            <td>${seeker.email}</td>
            <td>${seeker.address}</td>
            <td>${seeker.description}</td>
            <td>${hospitalId}</td>
            <td>${bloodId}</td>
            <td>${pendingSeekerId}</td>
            </tr>>
            
            `;
                SeekerTableBody.append(data)
            })




        },
        error:function (error){
            alert(error.message)
        }
    })

}

loadSeekerTable();