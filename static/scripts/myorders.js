function loadContent() {

    database.ref('/users/' + sessionStorage.getItem("uid")).child("orders").once('value').then(function (snapshot) {
        if(!snapshot.exists())
        {
            $(".notfoundmsg").show();
        }
        for (var orderId in snapshot.val()) {
            var odate=new Date (snapshot.val()[orderId]["timestamp"]);
            var ddate=new Date (snapshot.val()[orderId]["timestamp"]);
            ddate.setDate(odate.getDate()+4);
        $("#orders").append("<div class=\"card order\"><h3><b>Order Id:-</b> "+orderId+"</h3><h3><b>Order Date:</b> "+odate+"</h3><h3><b>Delivery Date:</b> "+ddate+"</h3><h3><b>Rs.</b> "+snapshot.val()[orderId]['price']+"</h3><br><a href=\"../order/?orderid="+orderId+"\" class=\"btn btn-primary stretched-link\">Track</a></div>");
        }
    }
    ).catch(error => {
        alert(error);
      });



    //check previous user login from session
    if (sessionStorage.getItem("uid") != null) {

        database.ref('/users/' + sessionStorage.getItem("uid")).once('value').then(function (snapshot) {
            var fname = snapshot.val().fname;
            var lname = snapshot.val().lname;

            var accountoption = document.getElementById("accountoption");
            accountoption.href = "javascript:alert('still in developement')";
            accountoption.innerHTML = "<b>" + fname + " " + lname + "</b>";

            document.getElementById("dropdown").className = "dropdown";
            $("#loader").remove();
        });
    }
    else
        $("#loader").remove();
}

function openOrder(orderId){
    alert(orderId);
}
