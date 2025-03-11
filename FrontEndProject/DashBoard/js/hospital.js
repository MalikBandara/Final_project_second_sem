//save data into mysql

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

// load data into table

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
                <button class="action-button bg-secondary edit-button" onclick="loadDataToInputFields()">Delete</button>
            </td>
                `;

                tableBody.append(data);
            });
            alert("Hospitals data loaded !")

            LoadDataIntoInput();

        },
        error:function (error){
            alert("Error loading customer data: " + error.responseText);
            console.error(error.responseText);
        }
    })


}



//load data into input fields

function LoadDataIntoInput(){

    $("#HospitalTableBody tr").click(function (){

        $("#HospitalTableBody tr").removeClass("selected");

        $(this).addClass("selected");

        let HospitalId = $(this).find("td:eq(0)").text();
        let HospitalName = $(this).find("td:eq(1)").text();
        let HospitalAddress = $(this).find("td:eq(2)").text();
        let contact = $(this).find("td:eq(3)").text();

        $("#name").val(HospitalName);
        $("#location").val(HospitalAddress);
        $("#contact").val(contact);

    })

}


loadAllHospitals();
