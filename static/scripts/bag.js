function addToCart(obj,id){
    var cart={};
    if(sessionStorage.getItem("cart")!=null){
        cart=JSON.parse(sessionStorage.getItem("cart"));
    }

    if(cart[id]!=null){
        cart[id]["quantity"]=cart[id]["quantity"]+1;
        alert("It was already in cart so increased the quantity");
    }
    else{
        obj["quantity"]=1;
        cart[id]=obj;
        alert("Added To Cart");
    }

    sessionStorage.setItem("cart",JSON.stringify(cart));

}

function addToCartAndCheckout(obj,id){
    var cart={};
    if(sessionStorage.getItem("cart")!=null){
        cart=JSON.parse(sessionStorage.getItem("cart"));
    }

    if(cart[id]!=null){
        cart[id]["quantity"]=cart[id]["quantity"]+1;
    }
    else{
        obj["quantity"]=1;
        cart[id]=obj;
    }

    sessionStorage.setItem("cart",JSON.stringify(cart));
    document.getElementById("checkout_btn").click();
    //$("#checkout_btn").click();
}