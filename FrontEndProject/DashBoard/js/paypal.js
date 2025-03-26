$("#paypalDonateBtn").click(function () {
    console.log("hi");

    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('No token found, please log in again.');
        return;
    }

    $.ajax({
        url: "http://localhost:8081/api/v1/payment/create",
        method: "POST",
        contentType: "application/json",
        dataType: "text",  // Expecting plain text (URL)
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (res) {
            console.log("Redirecting to PayPal:", res);
            window.location.href = res;  // ✅ Redirect user to PayPal
        },
        error: function (err) {
            console.log("Error:", err);
            alert("Payment initiation failed!");
        }
    });
});
