//save data into mysql
var HospitalId;

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
            Swal.fire({
                    icon: 'success',
                    title: resp.message,
                    confirmButtonText: 'OK'
                });

            loadAllHospitals();
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

        

    });
})



//update hospitals


$("#btnUpdateHospitals").click(function (){



    const data = {
        hospitalId:HospitalId,
        hospitalName: $("#name").val(),
        location: $("#location").val(),
        contact: $("#contact").val()
    }
    console.log("hospital id"+ HospitalId);

    $.ajax({
        url:"http://localhost:8081/api/v1/hospitals/update",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: 'success',
                title: response.message,
                confirmButtonText: 'OK'
            });
            loadAllHospitals();
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
    <button type="button" class="btn bg-danger bg-gradient mt-1 me-2 text-light bg-opacity-70" onclick="deleteHospital(${hospital.hospitalId})">
        <i class="fas fa-trash-alt"></i> 
    </button>
</td>
                `;

                tableBody.append(data);
            });


            LoadDataIntoInput();

        },
        error:function (error){
            alert("Error loading customer data: " + error.responseText);
            console.error(error.responseText);
        }
    })


}



// delete hospital
function deleteHospital(hospitalId){

    $.ajax({
        url:`http://localhost:8081/api/v1/hospitals/delete/${hospitalId}`,
        method:"DELETE",
        success:function (response){
            Swal.fire({
                icon: 'success',
                title: response.message,
                confirmButtonText: 'OK'
            });
            loadAllHospitals();
            $("#HospitalId").text("");
            $("#name").val("");
            $("#location").val("");
            $("#contact").val("");

        },
        error:function (error){
            alert(error.message)
        }

    })
}



//load data into input fields

function LoadDataIntoInput(){

    $("#HospitalTableBody tr").click(function (){

        $("#HospitalTableBody tr").removeClass("selected");

        $(this).addClass("selected");

        HospitalId = $(this).find("td:eq(0)").text();
        $("#HospitalId").text(HospitalId);
        console.log(HospitalId)
        let HospitalName = $(this).find("td:eq(1)").text();
        let HospitalAddress = $(this).find("td:eq(2)").text();
        let contact = $(this).find("td:eq(3)").text();

        $("#name").val(HospitalName);
        $("#location").val(HospitalAddress);
        $("#contact").val(contact);

    })

}


// clear
$("#btnClear").click(function (){

        $("#HospitalId").text("");
        $("#name").val("");
        $("#location").val("");
        $("#contact").val("");
    })



loadAllHospitals();
