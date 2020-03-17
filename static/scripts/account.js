function onPassCheck(obj) {
    if ($(obj).is(":checked")) {
        $("#pass").removeAttr("disabled");
        $("#cpass").removeAttr("disabled");
    } else {
        $("#pass").attr('disabled', 'disabled');
        $("#cpass").attr('disabled', 'disabled');
    }

}

function setUserData() {
    database.ref('/users/' + sessionStorage.getItem("uid")).once('value').then(function (snapshot) {
        $("#fname").val(snapshot.val().fname);
        $("#lname").val(snapshot.val().lname);

        $("#mob").val(snapshot.val().mnum);
        $("#email").val(snapshot.val().email);

        $("#address").val(snapshot.val().address);

        $("#loader").remove();
    });
}

function saveAccount() {

    database.ref('/users/' + sessionStorage.getItem("uid")).once('value').then(function (snapshot) {
        if (snapshot.val().pw == $("#passin").val()) {
            if ($("#passcheck").is(":checked")) {
                if ($("#pass").val() == "")
                    alert("Password shouldn't be empty");
                else if (!(6 <= $("#pass").val().length && $("#pass").val().length <= 18))
                    alert("Password must be in range of 6 to 18");
                else if ($("#pass").val() != $("#cpass").val())
                    alert("Passwords are not matching");
                else saveAccountNow();
            }
            else {
                saveAccountNow();
            }
        }
        else
            alert("Please Enter Correct Password");

    });

}

function saveAccountNow() {

    database.ref('/users/' + sessionStorage.getItem("uid")).once('value').then(function (snapshot) {
        var data = {
            address: $("#address").val(),
            email: $("#email").val(),
            fname: $("#fname").val(),
            lname: $("#lname").val(),
            mnum: $("#mob").val()
        }

        data['pw'] = snapshot.val().pw;

        if ($("#passcheck").is(":checked")) {
            data['pw'] = $("#pass").val();
        }

        database.ref("users/" + sessionStorage.getItem("uid")).set(data, function (error) {
            if (error) {
                alert(error)
            } else {
                alert("Saved Successfully");
                $('.verifypass').fadeOut();
            }
        });
    });


}