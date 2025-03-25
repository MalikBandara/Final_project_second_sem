$("#btnLoginAction").click(function () {
    let username = $("#username").val();
    let pass = $("#password").val();

    let data = {
        username: username,
        password: pass
    };

    console.log(data);

    $.ajax({
        url: "http://localhost:8081/auth/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",  // Expect a JSON response
        success: function (res) {
            console.log(res);  // Will contain token and message

            // If the login is successful, store the token and redirect
            if (res.token) {
                localStorage.setItem("authToken", res.token);
                window.location.replace("../DashBoard/indexDashBoard.html?_=" + new Date().getTime());

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    html: res.message
                        ? `Error: <strong>${res.message}</strong>`
                        : 'Invalid email or password', // Fallback if no message
                    confirmButtonColor: '#dc3545', // Red button
                    showClass: {
                        popup: 'animate__animated animate__headShake' // Shake animation for errors
                    }

                });
            }
        },
        error: function (err) {
            console.log("Error: ", err);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "The Username or password has been rejected from the system.",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
            // Optionally, show a message to the user about the error
        }
    });
});
