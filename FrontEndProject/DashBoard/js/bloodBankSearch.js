$(document).ready(function (){
    loadAllBloodBank();

    $("#searchBtn").click(function (){
        let  searchText = $("#searchBloodBank").val().toLowerCase();
        filterBloodBank(searchText);
    });

    $("#resetBtn").click(function (){
        $("#searchBloodBank").val("");
        loadAllBloodBank();
    })
})

function loadAllBloodBank (){

    $.ajax({
        url:"http://localhost:8081/api/v1/bloodBank/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){
            let bloodBankList = $("#bloodBankList");
            bloodBankList.empty();

            response.data.forEach(bloodBank =>{

                let bloodBankData = `
                
                <div class="hospital-card">
                        <img src="css/blood-donation-logo-template-icon-symbol-vector-40373654.jpg" alt="BlBankood Image" class="hospital-img">
                        <h4>Blood bank id : ${bloodBank.bloodBankID}</h4>
                        <h3>${bloodBank.bloodBankName} (${bloodBank.location})</h3>
                        <p><strong>Contact:</strong> ${bloodBank.contact}</p>
                    </div>
                
                `;

                bloodBankList.append(bloodBankData);
            });



        },
        error:function (error){
            console.error("Error loading Blood Bank:", error);
            $("#bloodBankList").html("<p style='color: red;'>Failed to load Blood bank. Please try again.</p>");
        }


    })
}


function filterBloodBank(searchText){
    $(".hospital-card").each(function (){
        let text = $(this).find("h3").text().toLowerCase();
        if (text.includes(searchText)){
            $(this).show();
        }else{
            $(this).hide();
        }
    })

}