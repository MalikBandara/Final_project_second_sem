$("#btnRegisterUser").click(function (){

    let data = {
        userName:$("#username").val(),
        email:$("#email").val(),
        password:$("#password").val(),


    }

    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key used in localStorage

    // Check if the token exists before making the request
    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url:"http://localhost:8081/api/v1/user/save",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (res){
            Swal.fire({
                icon: "success",
                title: "User Registration!",
                text: res.message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            UserLoad();
        },
        error:function (error){
            Swal.fire({
                icon: "success",
                title: "User Registration!",
                text: error.message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
        }
    });
})


$("#reset").click(function (){

        $("#username").val("")
        $("#email").val("")
        $("#password").val("")
        $("#userRole").val("")
})



function UserLoad(){

    const token = localStorage.getItem('authToken');


    if (!token) {
        alert('No token found, please log in again.');
        return;
    }


    $.ajax({
        url:"http://localhost:8081/api/v1/user/getAll",
        method:"GET",
        dataType:"json",
        headers: {
            'Authorization': 'Bearer ' + token // Add the token as a Bearer token in the Authorization header
        },
        success:function (res){

            let UserTableBody = $("#UserTableBody");
            UserTableBody.empty();

            res.data.forEach(user=>{



                let data = `
                <tr>
                <td>${user.userId}</td>
                <td>${user.userName}</td>
                <td>${user.email}</td>
                
                <td>**********</td>
                </tr>
                
                `;
                UserTableBody.append(data)
            });


        }

    })


}

UserLoad();