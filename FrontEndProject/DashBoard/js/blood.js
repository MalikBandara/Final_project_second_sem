var bloodId



//blood save method
$("#btnSaveBlood").click(function (){
    console.log("blood")

    let bloodGroup = $("#BloodGroup").val();
    let bloodQty = $("#quantity").val();
    let bloodBankId = $("#bloodBank").val();

    // Validation for Blood Quantity
    if (!bloodQty || isNaN(bloodQty) || parseFloat(bloodQty) <= 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please enter a valid positive blood quantity.",
        });

        return;
    }

    let data = {
        bloodGroup: bloodGroup,
        bloodQty: parseFloat(bloodQty), // Ensure it's a number
        bloodBankId: bloodBankId
    };


    $.ajax({
        url:"http://localhost:8081/api/v1/blood/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: 'success',
                title: response.message,
                confirmButtonText: 'OK'
            });
            console.log(response)
            LoadAllBloodData();
            $("#BloodId").text("")
            $("#BloodGroup").val("");
            $("#quantity").val("");
            $("#bloodBank").val("");
            $("#BloodBankName").text("");
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



//blood load method
function LoadAllBloodData(){

    $.ajax({
        url:"http://localhost:8081/api/v1/blood/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){
            let BloodTableBody = $("#BloodTableBody");
            BloodTableBody.empty();

            response.data.forEach(blood =>{
                let data = `
                <tr>
                <td>${blood.bloodID}</td>
                <td>${blood.bloodGroup}</td>
                <td>${blood.bloodQty}</td>
                <td>${blood.bloodBankId}</td>
                <td>
    <button type="button" class="btn bg-danger bg-gradient mt-1 me-2 text-light bg-opacity-70" onclick="DeleteBlood(${blood.bloodID})">
        <i class="fas fa-trash-alt"></i> 
    </button>
</td>
                </tr>>
                
                `;

                BloodTableBody.append(data);

            });

            LoadBloodTableData();






        },
        error:function (error){
            alert(error.message)
        }
    })

}
LoadAllBloodData();



// clear field method
$("#btnClearBlood").click(function () {
    $("#BloodId").text("")
        $("#BloodGroup").val("");
        $("#quantity").val("");
        $("#bloodBank").val("");
        $("#BloodBankName").text("");
    })



//when click the blood table data load into input

function LoadBloodTableData(){
    $("#BloodTableBody tr").click(function () {
        // Remove previous selection and highlight the clicked row
        $("#BloodTableBody tr").removeClass("selected");
        $(this).addClass("selected");

        // Get the data from the clicked row
        let BloodId = $(this).find("td:eq(0)").text();
        let BloodGroup = $(this).find("td:eq(1)").text();
        let Quantity = $(this).find("td:eq(2)").text();
        let BloodBank = $(this).find("td:eq(3)").text();  // Blood Bank ID

        // Set the form fields
        $("#BloodGroup").val(BloodGroup);
        $("#quantity").val(Quantity);

        // Display the Blood Bank ID in a non-editable span and set it in a hidden input
        $("#bloodBank").val(BloodBank);  // You may want to change this to a hidden input
        $("#bloodBankId").val(BloodBank);  // Hidden input to store the Blood Bank ID for the update

        // Display Blood Bank ID as a non-editable field (as label or span)
        $("#BloodBankIdDisplay").text(BloodBank);

        // Display Blood ID in a non-editable field
        $("#BloodId").text(BloodId);
    });
}

// update blood can't update blood bank id

// set the input value to model value
$("#updateToModel").click(function (){
     bloodId = $("#BloodId").text();
    $("#ModelBloodId1").val(bloodId)

    var value = $("#BloodGroup").val();
    $("#modalBloodGroup").val(value);

    var quantity = $("#quantity").val();
    $("#modalQuantity").val(quantity);

    var bloodBank = $("#bloodBank").val();
    $("#bloodBank1").text(bloodBank)
})


//update
$("#btnUpdateBlood").click(function (){


    let bloodGroup = $("#modalBloodGroup").val();
    let bloodQty = $("#modalQuantity").val();
    let bloodBankId = $("#bloodBank1").text();

    // Validation for Blood Quantity
    if (!bloodQty || isNaN(bloodQty) || parseFloat(bloodQty) <= 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please enter a valid positive blood quantity before updating.",
        });
        return;
    }

    let data = {
        bloodID: bloodId,
        bloodGroup: bloodGroup,
        bloodQty: parseFloat(bloodQty), // Ensure numeric value
        bloodBankId: bloodBankId
    };


    $.ajax({
        url:"http://localhost:8081/api/v1/blood/update",
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
            LoadAllBloodData();
            $("#BloodId1").text("")
            $("#BloodGroup").val("");
            $("#quantity").val("");
            $("#bloodBank").val("");
            $("#BloodBankName").text("");
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


function DeleteBlood(bloodId){

    $.ajax({
        url:`http://localhost:8081/api/v1/blood/delete/${bloodId}`,
        method:"DELETE",
        dataType:"json",
        success:function (response){
            Swal.fire({
                icon: 'success',
                title: response.message,
                confirmButtonText: 'OK'
            });
            LoadAllBloodData();
            $("#BloodId").text("")
            $("#BloodGroup").val("");
            $("#quantity").val("");
            $("#bloodBank").val("");
            $("#BloodBankName").text("");


        },
        error:function (error){
            Swal.fire({
                icon: 'error',
                title: error.message,
                confirmButtonText: 'OK'
            });
        }
    });

}