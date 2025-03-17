
$(document).ready(function () {
    loadBloodIds();
    loadHospitalIdsAndName();
    // LoadAllPendingDonner();
});

function loadAllDonner(){

    $.ajax({
        url:"http://localhost:8081/api/v1/donner/getAll",
        method:"GET",
        dataType:"json",
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


$("#btnUpdateDonner").click(function (){

    let data = {
        donnerId:$("#donnerId").text(),
        donnerName:$("#donnerName").val(),
        age:$("#age").val(),
        contact:$("#contact").val(),
        email:$("#email").val(),
        description:$("#description").val(),
        address:$("#address").val(),
        hospitalId:$("#hospitalId").val(),
        bloodId:$("#bloodGroupId").val(),
        pendingDonnerId: $("#pendingDonnerId").val()
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/donner/update",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            alert(response.message)
            loadAllDonner();
        }
        ,
        error:function (error){
            alert(error.message);
        }
    })

})

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



$("#btnDeleteDonner").click(function (){
    let DonnerId = $("#donnerId").text();
    $.ajax({
        url:`http://localhost:8081/api/v1/donner/delete/${DonnerId}`,
        method:"DELETE",
        dataType:"json",
        success:function (response){
            alert(response.message)
            loadAllDonner();
        },
        error:function (error){
            alert(error.message)
        }
    })
})



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
                alert("Blood type loaded successfully.");
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
