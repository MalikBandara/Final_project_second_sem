$(document).ready(function (){

    loadAllBlood();

    $("#resetBtn").click(function (){
        $("#searchBlood").val("")
        loadAllBlood();
    })

    $("#searchBtn").click(function (){
        let searchText = $("#searchBlood").val().toLowerCase();
        filterBlood(searchText);
    })
})

function loadAllBlood(){

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/blood/getAll",
        method:"GET",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (response){

            let bloodList = $("#bloodList");
            bloodList.empty()

            response.data.forEach(blood =>{

                let bloodCard = `
                 <div class="hospital-card">
                        <img src="css/360_F_274422814_sv23aGOAILKKk8ZcMgLKvHQBTEsWh7WP.jpg" alt="Hospital Image" class="hospital-img">

                        <h3>${blood.bloodGroup} </h3>
                        <h4>( Quantity ${ blood.bloodQty} )</h4>
                        <p><strong>Blood bank Id :</strong> ${blood.bloodBankId}</p>
                    </div>
                
                
                `;

                bloodList.append(bloodCard)
            })

        },
        error:function (error){
            console.error("Error loading hospitals:", error);
            $("#bloodList").html("<p style='color: red;'>Failed to load Blood. Please try again.</p>");
        }
    })

}


function filterBlood(searchText){

    $(".hospital-card").each(function (){
        let blood = $(this).find("h3").text().toLowerCase();
        if (blood.includes(searchText)){
            $(this).show();
        }else{
            $(this).hide();
        }
    })
}