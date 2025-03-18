$(document).ready(function () {
    LoadHospitalIdsToSeeker();
    LoadBloodIdsToSeekers();
    LoadAllSeekers();
});

$("#btnSavePatient").click(function (){

    let data = {
        pendingSeekerName:$("#PatientName").val(),
        email:$("#email").val(),
        contact:$("#contactNumber").val(),
        address:$("#address").val(),
        description:$("#description").val(),
        hospitalId:$("#HospitalId").val(),
        bloodId:$("#bloodGroup").val(),
        age:$("#age").val()
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/PSeeker/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: "success",
                title: "Blood Request Submitted!",
                html: `
        <div style="font-size: 18px; font-weight: 500;">
            Thank you, <span style="color: #d9232d;">${response.seekerName || "Seeker"}</span>! ❤️ <br>
            Your blood request has been successfully submitted. <br>
            Our team will review it and connect you with a suitable donor soon.
        </div>
    `,
                timer: 6000, // Auto-close after 6 seconds
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#d9232d", // Red color to match blood donation theme
                showCloseButton: true,
                allowOutsideClick: false,
                backdrop: `
        rgba(0, 0, 0, 0.4)
        url("https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif") 
        center top / 150px no-repeat
    `
            });


        }
    })

})


function LoadBloodIdsToSeekers(){

    $.ajax({
        url: "http://localhost:8081/api/v1/blood/loadBId",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (!response.data || response.data.length === 0) {
                Swal.fire({
                    icon: "error",  // Shows an error icon
                    title: "Error!",
                    text: "Blood id not loaded ",
                    showConfirmButton: true,  // Displays the "OK" button
                    confirmButtonText: "OK"  // Customize button text
                });

                return;
            } else {
                console.log(response)

            }

            let dropdown = $("#bloodGroup");
            dropdown.empty();
            dropdown.append(`<option value="">Select Blood Group</option>`);

            // Iterate over each object in the response.data array
            response.data.forEach(blood => {
                let bloodId = blood.bloodId;  // Match key from backend
                let bloodName = blood.bloodName;  // Match key from backend

                // Create the dropdown option with ID and Name
                let option = `<option value="${bloodId}">${bloodId}</option>`;
                dropdown.append(option);
            });

            // Add event listener to update the name when a blood bank ID is selected
            dropdown.off("change").on("change", function() {
                let selectedId = $(this).val();  // Get the selected blood bank ID
                if (selectedId) {
                    // Find the selected blood bank from the response data
                    let selectedBloodBank = response.data.find(bloodBank => bloodBank.bloodId == selectedId);
                    if (selectedBloodBank) {
                        let bloodName = selectedBloodBank.bloodName;  // Get the name for the selected ID
                        // Set the Blood Bank name to the h4 tag
                        $("#BloodGroupName").text(bloodName);
                    }
                } else {
                    // If no blood bank is selected, clear the name
                    $("#BloodGroupName").text("");
                }
            });
        },
        error: function (error) {
            console.error("Error fetching blood banks:", error);
            alert("Failed to load blood banks. Please try again.");
        }
    });
}


function LoadHospitalIdsToSeeker(){
    $.ajax({
        url: "http://localhost:8081/api/v1/hospitals/getIdH",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (!response.data || response.data.length === 0) {
                alert("No Hospital found.");
                return;
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Loaded!",
                    text: response.message,
                    showConfirmButton: true, // Enables the "OK" button
                    confirmButtonText: "OK", // Customize button text (optional)
                });
            }

            let dropdown = $("#HospitalId");
            dropdown.empty();
            dropdown.append(`<option value="">Select Hospital ID</option>`);

            // Iterate over each object in the response.data array
            response.data.forEach(hospital => {
                let hospitalId = hospital.hospitalId;  // Match key from backend
                let hospitalName = hospital.hospitalName;  // Match key from backend

                // Create the dropdown option with ID and Name
                let option = `<option value="${hospitalId}">${hospitalId}</option>`;
                dropdown.append(option);
            });

            // Add event listener to update the name when a hospital ID is selected
            dropdown.off("change").on("change", function() {
                let selectedId = $(this).val();  // Get the selected hospital ID
                if (selectedId) {
                    // Find the selected hospital from the response data
                    let selectedHospital = response.data.find(hospital => hospital.hospitalId == selectedId);
                    if (selectedHospital) {
                        let hospitalName = selectedHospital.hospitalName;  // Get the name for the selected ID
                        // Set the Hospital name to the h4 tag
                        $("#hospitalName").text(hospitalName);
                    }
                } else {
                    // If no hospital is selected, clear the name
                    $("#hospitalName").text("");
                }
            });
        },
        error: function (error) {
            console.error("Error fetching hospitals:", error);
            alert("Failed to load hospitals. Please try again.");
        }
    });
}



function LoadAllSeekers(){

    $.ajax({
        url:"http://localhost:8081/api/v1/PSeeker/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){

            let pendingSeekerTable = $("#pendingSeekerTable");
            pendingSeekerTable.empty();

            response.data.forEach(seeker =>{

               let seekerId =  seeker.hospital? seeker.hospital.hospitalId :"N/A";
               let bloodId =  seeker.bloodId? seeker.bloodId.bloodID :"N/A";

                let data = `
                <tr>
                <td>${seeker.pendingSeeker}</td>
                <td>${seeker.pendingSeekerName}</td>
                <td>${seeker.age}</td>
                <td>${seeker.contact}</td>
                <td>${seeker.email}</td>
                <td>${seeker.address}</td>
                <td>${seeker.description}</td>
                <td>${seekerId}</td>
                <td>${bloodId}</td>
                <td>${seeker.status}</td>
                
                </tr>`;

                pendingSeekerTable.append(data);
            })

        },
        error:function (error){
            alert(error.message)
        }
    })


}