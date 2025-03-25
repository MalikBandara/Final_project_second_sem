$(document).ready(function () {
    loadBloodIds();
    loadHospitalIdsAndName();

});


// save pending donner
$("#btnSavePDonner").click(function () {
    let donorName = $("#donorName").val().trim();
    let bloodGroupId = $("#bloodGroupId").val().trim();
    let hospitalId = $("#HospitalId").val().trim();
    let age = $("#age").val().trim();
    let email = $("#email").val().trim();
    let contact = $("#contactNumber").val().trim();
    let address = $("#address").val().trim();
    let description = $("#description").val().trim();

    // Check if any field is empty
    if (!donorName || !bloodGroupId || !hospitalId || !age || !email || !contact || !address || !description) {
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
        donnerName: donorName,
        blood: bloodGroupId,
        hospitalId: hospitalId,
        age: age,
        email: email,
        contact: contact,
        address: address,
        description: description
    };

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url: "http://localhost:8081/api/v1/pDonner/save",
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
                title: "Donation Request Submitted!",
                html: `
                    <div style="font-size: 18px; font-weight: 500;">
                        Thank you, <span style="color: #d9232d;">${response.donorName || "Donor"}</span>! ❤️ <br>
                        Your request to donate blood has been successfully submitted. <br>
                        Our team will review it and connect you with a recipient soon.
                    </div>
                `,
                timer: 6000,
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#d9232d",
                showCloseButton: true,
                allowOutsideClick: false,
                backdrop: `
                    rgba(0, 0, 0, 0.4)
                    url("https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif") 
                    center top / 150px no-repeat
                `
            }).then(() => {
                // After closing the first alert, send the email
                sendEmailNotification(email);
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

    function sendEmailNotification(email) {

        const token = localStorage.getItem('authToken');


        if (!token) {
            alert('No token found, please log in again.');
            return;
        }

        $.ajax({
            url: `http://localhost:8081/api/v1/email/send/${email}`,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Email Sent!",
                    text: "A confirmation email has been sent to the donor.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#28a745" // Green color for success
                });
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Email Failed!",
                    text: "The email could not be sent. Please check the donor's email address.",
                    confirmButtonText: "OK"
                });
            }
        });
    }


});




// load blood ids in pending donner
function loadBloodIds() {

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


    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url: "http://localhost:8081/api/v1/pDonner/getAll",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
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
        onclick="RejectPendingDonner('${pDonner.pendingDonnerId}','${pDonner.email}')"
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



    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    // Update the pending donor status first
    $.ajax({
        url: `http://localhost:8081/api/v1/pDonner/updateStatus/${pendingDonnerId}`,
        method: "PUT",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success: function (response) {
            console.log("Donor status updated");

            // Notify about the update via email
            sendUpdateNotification(email);

            // Reload the list of pending donors
            LoadAllPendingDonner();

            // Prepare data to save the donor info
            let data = {
                donnerName: donnerName,
                age: age,
                contact: contact,
                email: email,
                description: description,
                address: address,
                hospitalId: hospitalId,
                bloodId: bloodId,
                pendingDonnerId: pendingDonnerId
            };


            const token = localStorage.getItem('authToken');


            if (!token) {
                alert('No token found, please log in again.');
                return;
            }

            // Save the donor information
            $.ajax({
                url: "http://localhost:8081/api/v1/donner/save",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {
                    'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
                },
                success: function (response) {
                    showAlert("success", "Pending Donor Saved into Donner!", "The pending donor information has been successfully updated and converted into a donor in the Blood Management System.");
                },
                error: function (error) {
                    showAlert("error", "Save Failed!", "An error occurred while saving the donor information.");
                }
            });
        },
        error: function (error) {
            showAlert("error", "Status Update Failed!", "An error occurred while updating the donor status.");
        }
    });

    // Function to send an email notification
    function sendUpdateNotification(email) {

        const token = localStorage.getItem('authToken');


        if (!token) {
            alert('No token found, please log in again.');
            return;
        }


        $.ajax({
            url: `http://localhost:8081/api/v1/email/update/${email}`,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
            },
            success: function (response) {
                showAlert("success", "Email Sent!", response.message);
            },
            error: function (error) {
                showAlert("error", "Email Failed!", "The email could not be sent. Please check the donor's email address.");
            }
        });
    }

    // Reusable function for showing SweetAlert notifications
    function showAlert(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonText: "OK",
            confirmButtonColor: icon === "success" ? "#28a745" : "#d9232d", // Green for success, Red for error
        });
    }
}



// reject
function RejectPendingDonner(rejectDonner , email){

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

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({

        url:`http://localhost:8081/api/v1/pDonner/updateStatusToReject/${rejectDonner}`,
        method:"PUT",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){
            Swal.fire({
                icon: "warning",
                title: "Donor Rejected",
                text: "The donor has been rejected from the system.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            sendEmailNotification(email)
            LoadAllPendingDonner();
        },
        error:function (error){
            alert(error.message)
        }

    });

    function sendEmailNotification(email) {


        const token = localStorage.getItem('authToken');


        if (!token) {
            alert('No token found, please log in again.');
            return;
        }

        $.ajax({
            url: `http://localhost:8081/api/v1/email/reject/${email}`,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Email Rejected!",
                    text: response.message,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#28a745" // Green color for success
                });
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Email Failed!",
                    text: "The email could not be sent. Please check the donor's email address.",
                    confirmButtonText: "OK"
                });
            }
        });
    }


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