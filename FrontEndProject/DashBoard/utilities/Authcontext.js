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
                alert("Login failed: " + res.message);
            }
        },
        error: function (err) {
            console.log("Error: ", err);
            alert(err.message)
            // Optionally, show a message to the user about the error
        }
    });
});
