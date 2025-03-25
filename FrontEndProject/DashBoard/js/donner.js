
$(document).ready(function () {
    loadBloodIds();
    loadHospitalIdsAndName();
    // LoadAllPendingDonner();
});


// load all donner into table
function loadAllDonner(){

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url:"http://localhost:8081/api/v1/donner/getAll",
        method:"GET",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){

            let DonnerTableBody = $("#DonnerTableBody");
            DonnerTableBody.empty();

            response.data.forEach(donner =>{

                let hospitalId = donner.hospitalId ? donner.hospitalId.hospitalId : "N/A";
                let bloodId = donner.blood ? donner.blood.bloodID : "N/A";
                var pendingDonnerId = donner.pendingDonner ? donner.pendingDonner.pendingDonnerId :"N/A";
                let data = `
                <tr>
                <td>${donner.donnerId}</td>
                <td>${donner.donnerName}</td>
                <td>${donner.contact}</td>
                <td>${donner.age}</td>
                <td>${donner.address}</td>
                <td>${donner.email}</td>
                <td>${donner.description}</td>
                <td>${bloodId}</td>
                <td>${hospitalId}</td>
                <td>${pendingDonnerId}</td>
                </tr>>
                
                `;

                DonnerTableBody.append(data);
                DonnerLoadToInputField();

            })

        },
        error:function (error){
            alert(error.message)
        }

    })



}

loadAllDonner();


// load input when click
function DonnerLoadToInputField(){


    $("#DonnerTableBody tr").click(function (){

        $("#DonnerTableBody").removeClass("selected");

        $(this).addClass("selected");

        let id = $(this).find("td:eq(0)").text();
        let name = $(this).find("td:eq(1)").text();
        let contact = $(this).find("td:eq(2)").text();
        let age = $(this).find("td:eq(3)").text();
        let address = $(this).find("td:eq(4)").text();
        let email = $(this).find("td:eq(5)").text();
        let description = $(this).find("td:eq(6)").text();
        let bloodId = $(this).find("td:eq(7)").text();
        let hospitalId = $(this).find("td:eq(8)").text();
        let pendingDonnerId = $(this).find("td:eq(9)").text();

        $("#donnerId").text(id);
        $("#donnerName").val(name);
        $("#contact").val(contact);
        $("#age").val(age);
        $("#address").val(address);
        $("#email").val(email);
        $("#description").val(description);
        $("#bloodGroupId").val(bloodId);
        $("#hospitalId").val(hospitalId);
        $("#pendingDonnerId").val(pendingDonnerId);
    })

}



// update donner
$("#btnUpdateDonner").click(function () {
    let donnerId = $("#donnerId").text().trim();
    let donnerName = $("#donnerName").val().trim();
    let age = $("#age").val().trim();
    let contact = $("#contact").val().trim();
    let email = $("#email").val().trim();
    let description = $("#description").val().trim();
    let address = $("#address").val().trim();
    let hospitalId = $("#hospitalId").val().trim();
    let bloodId = $("#bloodGroupId").val().trim();
    let pendingDonnerId = $("#pendingDonnerId").val().trim();

    // Check if any field is empty
    if (!donnerId || !donnerName || !age || !contact || !email || !description || !address || !hospitalId || !bloodId || !pendingDonnerId) {
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
        donnerId: donnerId,
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

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url: "http://localhost:8081/api/v1/donner/update",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },

        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Donor Updated!",
                text: "The donor's details have been successfully updated in the Blood Management System.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });

            loadAllDonner(); // Reload donors list
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



// clear donner
$("#btnClearDonner").click(function (){
    $("#donnerId").text("")
    $("#donnerName").val("")
    $("#age").val("")
    $("#contact").val("")
    $("#email").val("")
    $("#description").val("")
    $("#address").val("")
    $("#hospitalId").val("")
    $("#bloodGroupId").val("")
    $("#pendingDonnerId").val("")
})


// delete donner
$("#btnDeleteDonner").click(function (){

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    let DonnerId = $("#donnerId").text();
    $.ajax({
        url:`http://localhost:8081/api/v1/donner/delete/${DonnerId}`,
        method:"DELETE",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){
            Swal.fire({
                icon: "success",
                title: "Donor Deleted!",
                text: "The donor has been successfully removed from the Blood Management System.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            $("#donnerId").text("")
            $("#donnerName").val("")
            $("#age").val("")
            $("#contact").val("")
            $("#email").val("")
            $("#description").val("")
            $("#address").val("")
            $("#hospitalId").val("")
            $("#bloodGroupId").val("")
            $("#pendingDonnerId").val("")

            loadAllDonner();
        },
        error:function (error){
            alert(error.message)
        }
    })
})




// load blood ids in donner form
function loadBloodIds() {

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
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
                alert("No blood banks found.");
                return;
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Blood type loaded!",
                    text: "Blood type and hospital load successfully !.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                });
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


        },
        error: function (error) {
            console.error("Error fetching blood banks:", error);
            alert("Failed to load blood banks. Please try again.");
        }
    });
}



// load hospital and names in donner form
function loadHospitalIdsAndName() {

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
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

            let dropdown = $("#hospitalId");
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


        },
        error: function (error) {
            console.error("Error fetching hospitals:", error);
            alert("Failed to load hospitals. Please try again.");
        }
    });
}
