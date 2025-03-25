$(document).ready(function () {
    LoadHospitalIdsToSeeker();
    LoadBloodIdsToSeekers();
    LoadAllSeekers();
});

$("#btnSavePatient").click(function () {
    let pendingSeekerName = $("#PatientName").val().trim();
    let email = $("#email").val().trim();
    let contact = $("#contactNumber").val().trim();
    let address = $("#address").val().trim();
    let description = $("#description").val().trim();
    let hospitalId = $("#HospitalId").val().trim();
    let bloodId = $("#bloodGroup").val().trim();
    let age = $("#age").val().trim();

    // Check if any field is empty
    if (!pendingSeekerName || !email || !contact || !address || !description || !hospitalId || !bloodId || !age) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields!",
            text: "All fields are required. Please fill in all the details.",
            confirmButtonText: "OK"
        });
        return; // Stop function if validation fails
    }

    // Age validation (must be a number between 18 and 65)
    if (!/^\d+$/.test(age) || age < 18 || age > 65) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Age!",
            text: "Please enter a valid age between 18 and 65.",
            confirmButtonText: "OK"
        });
        return; // Stop function if validation fails
    }

    let data = {
        pendingSeekerName: pendingSeekerName,
        email: email,
        contact: contact,
        address: address,
        description: description,
        hospitalId: hospitalId,
        bloodId: bloodId,
        age: age
    };

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url: "http://localhost:8081/api/v1/PSeeker/save",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success: function (response) {
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
        },
        error: function (error) {
            let errorMessage = "An error occurred. Please try again.";

            if (error.responseJSON && error.responseJSON.data) {
                const errorData = error.responseJSON.data;
                const firstErrorKey = Object.keys(errorData)[0];
                errorMessage = errorData[firstErrorKey];
            }

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        }
    });
});



function LoadBloodIdsToSeekers(){


    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url: "http://localhost:8081/api/v1/blood/loadBId",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
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

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url: "http://localhost:8081/api/v1/hospitals/getIdH",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success: function (response) {
            if (!response.data || response.data.length === 0) {
                alert("No Hospital found.");
                return;
            } else {
                console.log(response)
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


    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/PSeeker/getAll",
        method:"GET",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){

            let pendingSeekerTable = $("#pendingSeekerTable");
            pendingSeekerTable.empty();

            response.data.forEach(seeker =>{

               let hospitalId =  seeker.hospital? seeker.hospital.hospitalId :"N/A";
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
                <td>${hospitalId}</td>
                <td>${bloodId}</td>
                <td>${seeker.status}</td>
                
                <td>
    <!-- Show the "Approve" button only if the status is neither "Rejected" nor "Approved" -->
    <button type="button" 
        class="btn bg-success bg-gradient mt-1 me-2 text-light bg-opacity-70" 
        onclick="UpdateStatus(
            '${seeker.pendingSeeker}', 
            '${seeker.pendingSeekerName}', 
            ${seeker.age}, 
            '${seeker.contact}', 
            '${seeker.email}', 
            '${seeker.address}', 
            '${seeker.description}', 
            '${hospitalId}', 
            '${bloodId}', )"
        style="display: ${seeker.status === 'Rejected' || seeker.status === 'Approved' ? 'none' : 'inline-block'};">
        
        Approve
    </button>
    
    <!-- Show the "Reject" button only if the status is neither "Rejected" nor "Approved" -->
    <button type="button" 
        class="btn bg-danger bg-gradient mt-1 me-2 text-light bg-opacity-70" 
        onclick="UpdateStatusToRemove(${seeker.pendingSeeker})"
        style="display: ${seeker.status === 'Rejected' || seeker.status === 'Approved' ? 'none' : 'inline-block'};">
        
        Reject
    </button>
</td>
                
                </tr>`;

                pendingSeekerTable.append(data);
            })

        },
        error:function (error){
            alert(error.message)
        }
    })


}


function UpdateStatus(seekerId, seekerName, age, contact, email, address, description, hospitalId, bloodId){

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url:`http://localhost:8081/api/v1/PSeeker/updateStatus/${seekerId}`,
        method:"PUT",
        contentType:"application/json",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){

            LoadAllSeekers();

            let data = {
                seekerName:seekerName,
                email:email,
                contact:contact,
                address:address,
                description:description,
                age:age,
                hospitalId:hospitalId,
                bloodId:bloodId,
                pendingSeekerId:seekerId

            }


            $.ajax({
                url:"http://localhost:8081/api/v1/Seeker/save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify(data),
                dataType:"json",
                headers: {
                    'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
                },
                success:function (response){
                    Swal.fire({
                        icon: "success",
                        title: "Pending Seeker Approved ! ",
                        text: response.message,
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                    });
                },
                error:function (error){
                    alert(error.message)
                }

            })


        }
        ,error:function (error){
            alert(error.message)
        }

    })
}

function UpdateStatusToRemove(id){

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url:`http://localhost:8081/api/v1/PSeeker/updateReject/${id}`,
        method:"PUT",
        contentType:"application/json",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){
            Swal.fire({
                icon: "Rejected",
                title: "Pending Seeker Rejected ! ",
                text: response.message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            LoadAllSeekers();
        },
        error:function (error){
            Swal.fire({
                icon: "Rejected",
                title: "Pending Seeker Rejected ! ",
                text: error.message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
        }

    })
}


