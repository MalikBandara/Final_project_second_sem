

$(document).ready(function () {
    loadBloodIds();
    loadHospitalIdsAndName();
    // LoadAllPendingDonner();
});

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

                SeekerDataLoadIntoInput();
            });





        },
        error:function (error){
            alert(error.message)
        }
    });

}

loadSeekerTable();


function loadBloodIds() {
    $.ajax({
        url: "http://localhost:8081/api/v1/blood/loadBId",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (!response.data || response.data.length === 0) {
                alert("No blood banks found.");
                return;
            } else {
                console.log("blood id load ")
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
                    title: "Hospital and Blood ids Load !",
                    text: response.message,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                });
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


function SeekerDataLoadIntoInput() {
    $("#SeekerTableBody tr").off("click").on("click", function () {
        console.log("Row Clicked!");  // Debugging

        let seekerId = $(this).find("td:eq(0)").text();
        let seekerName = $(this).find("td:eq(1)").text();
        let age = $(this).find("td:eq(2)").text();
        let contact = $(this).find("td:eq(3)").text();
        let email = $(this).find("td:eq(4)").text();
        let address = $(this).find("td:eq(5)").text();
        let description = $(this).find("td:eq(6)").text();
        let hospitalId = $(this).find("td:eq(7)").text();
        let bloodId = $(this).find("td:eq(8)").text();
        let pendingSeekerId = $(this).find("td:eq(9)").text();

        console.log("Selected Seeker Data:", {
            seekerId,
            seekerName,
            age,
            contact,
            email,
            address,
            description,
            hospitalId,
            bloodId,
            pendingSeekerId
        });

        $("#seekerId").text(seekerId);
        $("#seekerName").val(seekerName);
        $("#age").val(age);
        $("#contact").val(contact);
        $("#email").val(email);
        $("#address").val(address);
        $("#description").val(description);
        $("#hospitalId").val(hospitalId !== "N/A" ? hospitalId : "");
        $("#bloodGroupId").val(bloodId !== "N/A" ? bloodId : "");
        $("#pendingSeekerId").val(pendingSeekerId !== "N/A" ? pendingSeekerId : "");
    });
}



$("#btnUpdateSeeker").click(function () {
    let seekerId = $("#seekerId").text().trim();
    let seekerName = $("#seekerName").val().trim();
    let age = $("#age").val().trim();
    let contact = $("#contact").val().trim();
    let email = $("#email").val().trim();
    let address = $("#address").val().trim();
    let description = $("#description").val().trim();
    let hospitalId = $("#hospitalId").val().trim();
    let bloodId = $("#bloodGroupId").val().trim();
    let pendingSeekerId = $("#pendingSeekerId").val().trim();

    // Check if any field is empty
    if (!seekerId || !seekerName || !age || !contact || !email || !address || !description || !hospitalId || !bloodId || !pendingSeekerId) {
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
        seekerId: seekerId,
        seekerName: seekerName,
        age: age,
        contact: contact,
        email: email,
        address: address,
        description: description,
        hospitalId: hospitalId,
        bloodId: bloodId,
        pendingSeekerId: pendingSeekerId
    };

    $.ajax({
        url: "http://localhost:8081/api/v1/Seeker/update",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Seeker Updated!",
                text: response.message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            loadSeekerTable();
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



$("#btnDeleteSeeker").click(function (){

    let seekerId = $("#seekerId").text();

    $.ajax({
        url:`http://localhost:8081/api/v1/Seeker/delete/${seekerId}`,
        method:"DELETE",
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: "success",
                title: "Seeker Deleted!",
                text: response.message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            loadSeekerTable();

        },
        error:function (error){
            alert(error.message)
        }
    })

})
