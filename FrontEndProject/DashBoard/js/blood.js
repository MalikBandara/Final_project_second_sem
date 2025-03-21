var bloodId



//blood save method
$("#btnSaveBlood").click(function (){
    console.log("blood")

    let data = {
        bloodGroup:$("#BloodGroup").val(),
        bloodQty:$("#quantity").val(),
        bloodBankId:$("#bloodBank").val()
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/blood/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            alert(response.message)
            console.log(response)
            LoadAllBloodData();
            $("#BloodId").text("")
            $("#BloodGroup").val("");
            $("#quantity").val("");
            $("#bloodBank").val("");
            $("#BloodBankName").text("");
        },
        error:function (error){
            alert(error.message)
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







    let data = {
        bloodID:bloodId,
        bloodGroup:$("#modalBloodGroup").val(),
        bloodQty:$("#modalQuantity").val(),
        bloodBankId:$("#bloodBank1").text()
    }


    $.ajax({
        url:"http://localhost:8081/api/v1/blood/update",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        success:function (response){
            alert(response.message)
            LoadAllBloodData();
            $("#BloodId1").text("")
            $("#BloodGroup").val("");
            $("#quantity").val("");
            $("#bloodBank").val("");
            $("#BloodBankName").text("");
        },
        error:function (error){
            alert(error.message)
        }
    })

})


function DeleteBlood(bloodId){

    $.ajax({
        url:`http://localhost:8081/api/v1/blood/delete/${bloodId}`,
        method:"DELETE",
        dataType:"json",
        success:function (response){
            alert(response.message)
            LoadAllBloodData();
            $("#BloodId").text("")
            $("#BloodGroup").val("");
            $("#quantity").val("");
            $("#bloodBank").val("");
            $("#BloodBankName").text("");


        },
        error:function (error){
            alert(error.message)
        }
    });

}