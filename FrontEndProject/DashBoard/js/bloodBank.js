var bloodBankId ;

$(document).ready(function () {
    loadBloodBankIds()
});

$("#btnSaveBloodBank").click(function (){
    console.log("test");

    const BdData = {
        name:$("#name").val(),
        location:$("#location").val(),
        contact:$("#contact").val()
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/bloodBank/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(BdData),
        dataType:"json",
        success:function (response){
            alert(response.message)
            loadBloodBank();
        },
        error:function (error){
            alert(error.message)
        }
    })


})

function  loadDataIntoInputFields(){

    $("#bloodBankTableBody tr").click(function (){

        $("#bloodBankTableBody tr").removeClass("selected");

        $(this).addClass("selected");
        bloodBankId =  $(this).find("td:eq(0)").text();
        let bloodBankName = $(this).find("td:eq(1)").text();
        let location = $(this).find("td:eq(2)").text();
        let contact =  $(this).find("td:eq(3)").text();
        $("#BloodBankId").text(bloodBankId)
        $("#name").val(bloodBankName);
        $("#location").val(location);
        $("#contact").val(contact);
    })
}





function loadBloodBank (){

    $.ajax({

        url: "http://localhost:8081/api/v1/bloodBank/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){
            let tableBody = $("#bloodBankTableBody")
            tableBody.empty();

            response.data.forEach(bloodBank => {
                let data =  `
                <tr>
                <td>${bloodBank.bloodBankID}</td>
                <td>${bloodBank.bloodBankName}</td>
                <td>${bloodBank.location}</td>
                <td>${bloodBank.contact}</td>
<td>
    <button type="button" class="btn bg-danger bg-gradient mt-1 me-2 text-light bg-opacity-70" onclick="deleteBloodBank(${bloodBank.bloodBankID})">
        <i class="fas fa-trash-alt"></i> 
    </button>
</td>
                </tr>>`;

                tableBody.append(data);


                // loadBloodBank(); // wrong line infinity loop made
            })
            loadDataIntoInputFields();
        },
        error:function (error){
            // alert(error.message)
        }
    })



}

loadBloodBank();


$("#btnUpdateBloodBank").click(function (){

    console.log(bloodBankId);

    const  BdData = {
        bloodBankID:bloodBankId,
        name:$("#name").val(),
        location:$("#location").val(),
        contact:$("#contact").val()

    }
    $.ajax({
        url:"http://localhost:8081/api/v1/bloodBank/update",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(BdData),
        dataType:"json",
        success:function (response){
            alert(response.message)
            loadBloodBank();
        },
        error:function (error){
            alert(error.message)
        }
    })
})


function deleteBloodBank(bloodBankId){

    $.ajax({
        url:`http://localhost:8081/api/v1/bloodBank/delete/${bloodBankId}`,
        method:"DELETE",
        success:function (response){
            alert(response.message)
                $("#BloodBankId").text("")
                $("#name").val("");
                $("#location").val("");
                $("#contact").val("");
                loadBloodBank();

        }
        ,
        error:function (error){
            alert(error.message)
        }
    });
}

$("#btnClearBloodBank").click(function (){
    $("#BloodBankId").text("")
    $("#name").val("");
    $("#location").val("");
    $("#contact").val("");
});


function loadBloodBankIds() {
    $.ajax({
        url: "http://localhost:8081/api/v1/bloodBank/getId",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (response.data.length === 0) {
                alert("No blood banks found.");
            } else {
                alert("Blood banks loaded successfully.");
            }
            // Log the response to check the data structure
            let dropdown = $("#bloodBank");
            dropdown.empty();
            dropdown.append(`<option value="">Select a Blood Bank</option>`);

            // Iterate over each object in the response.data array
            response.data.forEach(bloodBank => {
                let bloodBankId = bloodBank['Blood bank id '];  // Access the Blood bank id
                let bloodBankName = bloodBank['Blood bank name'];  // Access the Blood bank name

                // Create the dropdown option with both ID and Name
                let option = `<option value="${bloodBankId}">${bloodBankId}</option>`;
                dropdown.append(option);
            });

            // Add event listener to update the name when a blood bank ID is selected
            dropdown.change(function() {
                let selectedId = $(this).val();  // Get the selected blood bank ID
                if (selectedId) {
                    // Find the selected blood bank from the response data
                    let selectedBloodBank = response.data.find(bloodBank => bloodBank['Blood bank id '] == selectedId);
                    if (selectedBloodBank) {
                        let bloodBankName = selectedBloodBank['Blood bank name'];  // Get the name for the selected ID
                        // Set the Blood Bank name to the h4 tag
                        $("#BloodBankName").text(bloodBankName);
                    }
                } else {
                    // If no blood bank is selected, clear the name
                    $("#BloodBankName").text("");
                }
            });
        },
        error: function (error) {
            console.error("Error fetching blood banks:", error);
        },
    });
}





