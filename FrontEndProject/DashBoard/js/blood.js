var BloodId;

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




$("#btnClearBlood").click(function () {
        $("#BloodGroup").val("");
        $("#quantity").val("");
        $("#bloodBank").val("");
        $("#BloodBankName").text("");
    })





function LoadBloodTableData(){
    $("#BloodTableBody tr").click(function (){


        $("#BloodTableBody tr").removeClass("selected");

        $(this).addClass("selected");

        BloodId = $(this).find("td:eq(0)").text();
        let BloodGroup = $(this).find("td:eq(1)").text();
        let  Quantity = $(this).find("td:eq(2)").text();
        var BloodBank = $(this).find("td:eq(3)").text();

        $("#BloodGroup").val(BloodGroup);
        $("#quantity").val(Quantity);
        $("#bloodBank").val(BloodBank);
        $("#BloodId").text(BloodId)


    })



}

$("#btnUpdateBlood").click(function (){

    let data = {
        bloodID:BloodId,
        bloodGroup:$("#BloodGroup").val(),
        bloodQty:$("#quantity").val(),
        bloodBankId:$("#bloodBank").val()
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