$(document).ready(function () {
    loadBloodBankIds();
    loadHospitalIdsAndName();
});

$("#btnSavePDonner").click(function (){
    let data = {
        donnerName:$("#donnerName").val(),

    }
})



function loadBloodBankIds() {
    $.ajax({
        url: "http://localhost:8081/api/v1/blood/loadBId",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (!response.data || response.data.length === 0) {
                alert("No blood banks found.");
                return;
            } else {
                alert("Blood banks loaded successfully.");
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
                alert("Hospital loaded successfully.");
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


