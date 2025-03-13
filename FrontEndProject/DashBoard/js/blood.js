$("#btnSaveBlood").click(function (){
    console.log("blood")

    let data = {
        bloodGroup:$("#BloodGroup").val(),
        bloodQty:$("#quantity").val(),
        bloodBank:$("#bloodBank").val()
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
                </tr>>
                `;

                BloodTableBody.append(data);
            });







        },
        error:function (error){
            alert(error.message)
        }
    })

}
LoadAllBloodData();

