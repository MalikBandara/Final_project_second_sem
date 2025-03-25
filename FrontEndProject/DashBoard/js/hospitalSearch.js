$(document).ready(function () {
    loadAllHospitals();

    // Search Button Click Event
    $("#searchBtn").click(function () {
        let searchText = $("#searchHospital").val().toLowerCase();
        filterHospitals(searchText);
    });

    // Reset Button Click Event
    $("#resetBtn").click(function () {
        $("#searchHospital").val("");
        loadAllHospitals();
    });
});

// Function to Load All Hospitals
function loadAllHospitals() {

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url: "http://localhost:8081/api/v1/hospitals/getAll",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success: function (response) {
            let hospitalList = $("#hospitalList");
            hospitalList.empty();

            response.data.forEach(hospital => {


                let hospitalCard = `
                    <div class="hospital-card">
                        <img src="css/pngtree-hospital-logo-icon-abstract-alliance-picture-image_8313149.png" alt="Hospital Image" class="hospital-img">

                        <h3>${hospital.hospitalName} (${hospital.location})</h3>
                        <p><strong>Contact:</strong> ${hospital.contact}</p>
                    </div>
                `;
                hospitalList.append(hospitalCard);
            });
        },
        error: function (error) {
            console.error("Error loading hospitals:", error);
            $("#hospitalList").html("<p style='color: red;'>Failed to load hospitals. Please try again.</p>");
        }
    });
}

// Function to Filter Hospitals
function filterHospitals(searchText) {
    $(".hospital-card").each(function () {
        let hospitalName = $(this).find("h3").text().toLowerCase();
        if (hospitalName.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
