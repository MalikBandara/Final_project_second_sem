$("#btnSaveHospitals").click(function (){
    
    console.log("Hospital click");

    let hospitalData = {
        hospitalName: $("#name").val(),
        location: $("#location").val(),
        contact: $("#contact").val()
    };

    $.ajax({

        url:"http://localhost:8081/api/v1/hospitals/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(hospitalData),
        dataType:"json",
        success:function(resp){
            alert(resp.message);
        },
        error:function(error){
            alert("Error in saving hospital");
        }

        

    });
})



function loadAllHospitals(){

    $.ajax({
        url:"http://localhost:8081/api/v1/hospitals/getAll",
        method:"GET",
        dataType: "json",
        success:function (response){
            let tableBody = $("#HospitalTableBody");
            tableBody.empty();

            response.data.forEach(hospital =>{
                let data = `
                <tr>
                <td>${hospital.hospitalId}</td>
                <td>${hospital.hospitalName}</td>
                <td>${hospital.location}</td>
                <td>${hospital.contact}</td>
                <td>
                <button class="action-button bg-secondary edit-button" onclick="loadDataToInputFields('${escapeHtml(hospital.hospitalName)}', '${escapeHtml(hospital.location)}', '${escapeHtml(hospital.contact)}')" data-id="${hospital.hospitalId}">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </td>
                `;

                tableBody.append(data);
            });
            alert("Hospitals data loaded !")

        },
        error:function (error){
            alert("Error loading customer data: " + error.responseText);
            console.error(error.responseText);
        }
    })


}



function loadDataToInputFields(name, location, contact) {
    console.log("Hospital Name:", name);
    console.log("Location:", location);
    console.log("Contact:", contact);

    // Example: Populate input fields
    document.getElementById('hospitalNameInput').value = name;
    document.getElementById('locationInput').value = location;
    document.getElementById('contactInput').value = contact;
}


loadAllHospitals();

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}