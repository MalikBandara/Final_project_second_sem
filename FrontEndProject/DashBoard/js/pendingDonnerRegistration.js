$(document).ready(function () {
    loadBloodIds();
    loadHospitalIdsAndName();

});


// save pending donner
$("#btnSavePDonner").click(function (){


    let age = $("#age").val().trim();

    // Age validation (must be a number between 18 and 65)
    if (!/^\d+$/.test(age) || age < 18 || age > 65) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Age!",
            text: "Please enter a valid age between 18 and 65.",
            confirmButtonText: "OK"
        });
        return; // Stop the function if validation fails
    }

    let data = {
        donnerName:$("#donorName").val(),
        blood:$("#bloodGroupId").val(),
        hospitalId:$("#HospitalId").val(),
        age:age,
        email:$("#email").val(),
        contact:$("#contactNumber").val(),
        address:$("#address").val(),
        description:$("#description").val()

    }

    $.ajax({
        url:"http://localhost:8081/api/v1/pDonner/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: "success",
                title: "Donation Request Submitted!",
                html: `
        <div style="font-size: 18px; font-weight: 500;">
            Thank you, <span style="color: #d9232d;">${response.donorName || "Donor"}</span>! ❤️ <br>
            Your request to donate blood has been successfully submitted. <br>
            Our team will review it and connect you with a recipient soon.
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

            // Check if the error response contains validation errors
            if (error.responseJSON && error.responseJSON.data) {
                // Extract the first error message from the data object
                const errorData = error.responseJSON.data;
                const firstErrorKey = Object.keys(errorData)[0]; // Get the first key (e.g., "hospitalName")
                errorMessage = errorData[firstErrorKey]; // Get the error message for that key
            }

            // Display the error message using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        }
    })
})


// load blood ids in pending donner
function loadBloodIds() {
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

            let dropdown = $("#bloodGroupId");
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



// load hospital and name in pending donner
function loadHospitalIdsAndName() {
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



LoadAllPendingDonner();


// load pending donner into table
function LoadAllPendingDonner() {
    $.ajax({
        url: "http://localhost:8081/api/v1/pDonner/getAll",
        method: "GET",
        dataType: "json",
        success: function (response) {
            let pendingDonnerTable = $("#pendingDonnerTable");
            pendingDonnerTable.empty(); // Clear existing data

            response.data.forEach(pDonner => {
                let hospitalName = pDonner.hospitalId ? pDonner.hospitalId.hospitalId : "N/A";
                let bloodGroup = pDonner.blood ? pDonner.blood.bloodID : "N/A";

                let data = `
                <tr>
                    <td>${pDonner.pendingDonnerId}</td>
                    <td>${pDonner.donnerName}</td>
                    <td>${bloodGroup}</td>  <!-- Extract blood group -->
                    <td>${hospitalName}</td>  <!-- Extract hospital name -->
                    <td>${pDonner.age}</td>
                    <td>${pDonner.contact}</td>
                    <td>${pDonner.email}</td>
                    <td>${pDonner.address}</td>
                    <td>${pDonner.description}</td>
                    <td>${pDonner.status}</td>
                    
                    
               
                    
    <!-- Show the buttons only if the status is not "rejected" action eka reject hari approve hari venakota button hide venv -->
         
   <td>
    <!-- Show the "Approve" button only if the status is neither "Rejected" nor "Approved" -->
    <button type="button" 
        class="btn bg-success bg-gradient mt-1 me-2 text-light bg-opacity-70" 
        onclick="saveToDonner('${pDonner.pendingDonnerId}', '${pDonner.donnerName}', '${bloodGroup}', '${hospitalName}', '${pDonner.age}', '${pDonner.contact}', '${pDonner.email}', '${pDonner.address}', '${pDonner.description}', '${pDonner.status}')"
        style="display: ${pDonner.status === 'Rejected' || pDonner.status === 'Approved' ? 'none' : 'inline-block'};">
        Approve
    </button>
    
    <!-- Show the "Reject" button only if the status is neither "Rejected" nor "Approved" -->
    <button type="button" 
        class="btn bg-danger bg-gradient mt-1 me-2 text-light bg-opacity-70" 
        onclick="RejectPendingDonner(${pDonner.pendingDonnerId})"
        style="display: ${pDonner.status === 'Rejected' || pDonner.status === 'Approved' ? 'none' : 'inline-block'};">
        Reject
    </button>
</td>



                </tr>`;

                pendingDonnerTable.append(data);
            });
        },
        error: function (error) {
            alert(error.message);
        }
    });
}



//Transaction part

// when update status donner save
function saveToDonner(pendingDonnerId, donnerName, bloodId, hospitalId, age, contact, email, address, description, status) {
    $.ajax({
        url: `http://localhost:8081/api/v1/pDonner/updateStatus/${pendingDonnerId}`,
        method: "PUT",
        dataType: "json",
        success: function (response) {
            console.log("donner status updated")
            LoadAllPendingDonner();

            let data = {
                donnerName:donnerName,
                age:age,
                contact:contact,
                email:email,
                description:description,
                address:address,
                hospitalId:hospitalId,
                bloodId:bloodId,
                pendingDonnerId:pendingDonnerId
            }


            $.ajax({
                url:"http://localhost:8081/api/v1/donner/save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify(data),
                dataType:"json",
                success:function (response){
                    Swal.fire({
                        icon: "success",
                        title: "Pending Donor Saved into Donner !",
                        text: "The pending donor information has been successfully updated and Convert into Donner in the Blood Management System.",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                    });


                },
                error:function (error){
                    alert(error.message)
                }
            })


        },
        error: function (error) {
            alert(error.message);
        }
    });
}


// reject
function RejectPendingDonner(rejectDonner){

    // $.ajax({
    //     url:`http://localhost:8081/api/v1/pDonner/Reject/${rejectDonner}`,
    //     method:"DELETE",
    //     dataType:"json",
    //     success:function (response){
    //         alert(response.message)
    //         LoadAllPendingDonner();
    //     },
    //     error:function (error){
    //         alert(error.message);
    //     }
    // })

    $.ajax({

        url:`http://localhost:8081/api/v1/pDonner/updateStatusToReject/${rejectDonner}`,
        method:"PUT",
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: "warning",
                title: "Donor Rejected",
                text: "The donor has been rejected from the system.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });

            LoadAllPendingDonner();
        },
        error:function (error){
            alert(error.message)
        }

    })
}



// clear
$("#resetButton").click(function (){
    $("#donorName").val("")
        $("#bloodGroupId").val("")
        $("#HospitalId").val("")
        $("#age").val("")
        $("#email").val("")
        $("#contactNumber").val("")
        $("#address").val("")
        $("#description").val("")
        $("#BloodGroupName").text("")
        $("#hospitalName").text("")
})