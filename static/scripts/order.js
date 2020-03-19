function loadContent() {
    var orderId=window.location.href.split("=")[1];
    database.ref('orders').child(orderId).once('value').then(function (snapshot) {
    var cart=snapshot.val().order;
    var odate=new Date(snapshot.val()["timestamp"]);
    var deliverydate=new Date(snapshot.val()["timestamp"]);
    deliverydate.setDate(odate.getDate()+4);
    var itemsprice=0;
    var itemsquantity=0;
    for (var item in cart) {
        var price=cart[item]["price"];
        var quantity=cart[item]["quantity"];
        itemsprice=itemsprice+(price*quantity);
        itemsquantity=itemsquantity+quantity;
      }

      $("#itemsPriceLabel").text("Price ("+itemsquantity+" Items):");
      $("#itemsPrice").text("Rs "+itemsprice);
      $("#totalPrice").text("Rs "+(itemsprice+40));

      for (var item in cart){
        var price=cart[item]["price"];
        var quantity=cart[item]["quantity"];
        var name=cart[item]["name"];
        var img=cart[item]["img"];
        var objectID=cart[item]["objectID"];
        $("#items").append("<div class=\"card item\"> <table border=\"1\"> <tr> <td class=\"itemimgrow\"><img class=\"bagimg\" src=\""+img+"\"></td> <td style=\"vertical-align: top;\"> <h3>"+name+"</h3> <h4>Quantity: "+quantity+"</h4> <h4>Rs "+(price*quantity)+"</h4> </td> <th>Delivery On: "+deliverydate+"</th> </tr> </table> </div>");
      }
      

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

    });
}

function cancelOrder(){
    var orderId=window.location.href.split("=")[1];
    var r=confirm("Click Ok to cancel this order?");
    if (r == true) {
        database.ref('orders').child(orderId).once('value').then(function (snapshot) {
            database.ref('cancelledorders').child(orderId).set(snapshot.val());
            database.ref('orders').child(orderId).set(null);
            database.ref('users').child(sessionStorage.getItem("uid")).child("orders").child(orderId).set(null);
            window.location.href="../index";
        });
        alert("Your order has been cencelled");
      }
}