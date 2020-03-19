function placeOrder(){
    if(sessionStorage.getItem("cart")==null){
        alert("Can't place empty orders");
    }
    else if(sessionStorage.getItem("uid")==null){
        showLoginForm();
    }
    else{
        var key=database.ref('orders').push().key;
        database.ref('orders').child(key).set(
            {
                uid: sessionStorage.getItem("uid"),
                oreder: JSON.parse(sessionStorage.getItem("cart")),
                timestamp : new Date().getTime()
              }
        );

        database.ref('users').child(sessionStorage.getItem("uid")).child("orders").child(key).set(key);

        clearCart();


    }
}

function decQ(id){
    cart=JSON.parse(sessionStorage.getItem("cart"));
    if(cart[id]["quantity"]==1){
        remove(id);
    }
    else{
        cart[id]["quantity"]=cart[id]["quantity"]-1;
        sessionStorage.setItem("cart",JSON.stringify(cart));
        window.location.reload();
    }

}
function incQ(id){
    cart=JSON.parse(sessionStorage.getItem("cart"));
    cart[id]["quantity"]=cart[id]["quantity"]+1;
    sessionStorage.setItem("cart",JSON.stringify(cart));
    window.location.reload();
}
function remove(id){
    cart=JSON.parse(sessionStorage.getItem("cart"));
    delete cart[id];
    sessionStorage.setItem("cart",JSON.stringify(cart));
    window.location.reload();
}
function loadContent() {
    var cart=JSON.parse(sessionStorage.getItem("cart"));
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
        $("#items").append("<div class=\"card item\"> <table border=\"1\"> <tr> <td class=\"itemimgrow\"><img class=\"bagimg\" src=\""+img+"\"></td> <td style=\"vertical-align: top;\"> <h3>"+name+"</h3> <h4>Quantity: <button onclick=\"decQ('"+objectID+"')\">-</button> "+quantity+" <button onclick=\"incQ('"+objectID+"')\">+</button></h4> <h4>Rs "+(price*quantity)+"</h4> </td> <td><a href=\"javascript:remove('"+objectID+"');\" class=\"btn btn-danger\" style=\"color: white;\">Remove</a></td> </tr> </table> </div>");
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
}

function clearCart(){
    sessionStorage.removeItem("cart");
    alert("Your Order Is Placed");
    window.location.href="../index";
}