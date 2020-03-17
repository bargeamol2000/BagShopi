var passin;
var cpassin;
var emailin;
var cpass;
var loginbtn;
var signupbtn;

function showSignUp() {

    cpass.style.display = "block";
    loginbtn.setAttribute("value", "Create Account");
    loginbtn.onclick = signup;
    signupbtn.setAttribute("value", "Login Now");
    signupbtn.setAttribute("onclick", "showLogin()");
}

function showLogin() {
    cpass.style.display = "none";
    loginbtn.setAttribute("value", "Login Now");
    loginbtn.onclick = login;
    signupbtn.setAttribute("value", "Create Account");
    signupbtn.setAttribute("onclick", "showSignUp()");
}

function closeLoginForm() {
    document.getElementById("logindiv").style.display = "none";
}

function showLoginForm() {
    passin = document.getElementById("passin");
    cpassin = document.getElementById("cpassin");
    emailin = document.getElementById("emailin");
    cpass = document.getElementById("confirmpass");
    loginbtn = document.getElementById("loginbtn");
    signupbtn = document.getElementById("signupbtn");
    document.getElementById("logindiv").style.display = "block";
}

function login() {
    emailin.value = emailin.value.toLowerCase();
    if (passin.value == "" || emailin.value == "") {
        alert("Please fill all fields");
    }
    else if (emailin.value.includes("@") && emailin.value.includes(".")) {
        database.ref('/users/' + SHA1(emailin.value)).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                var email = snapshot.val().email;
                var password = snapshot.val().pw;
                var fname = snapshot.val().fname;
                var lname = snapshot.val().lname;
                if (passin.value == password) {
                    sessionStorage.setItem("uid", SHA1(emailin.value));
                    alert("Welcome back " + fname + " " + lname);
                    location.reload();
                }
                else {
                    alert("Wrong email or password entered");
                }
            }
            else {
                alert("No accont registered with this email address please signup");
            }
        });
    }
}

function signup() {
    emailin.value = emailin.value.toLowerCase();
    if (passin.value == "" || emailin.value == "" || cpassin.value == "") {
        alert("Please fill all fields");
    }
    else if (!(6 <= passin.value.length && passin.value.length <= 18)) {
        alert("Password length must be in range of 6-18");
    }
    else if (!(passin.value == cpassin.value)) {
        alert("Passwords are not matching");
    }
    else {
        //alert(SHA1(emailin.value));
        database.ref('/users/' + SHA1(emailin.value)).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                alert("This user already existed");
            }
            else {
                $("#firstpart").animate({ left: "1000px" });
                $("#secondpart").animate({ left: "+=1000" });
            }
        });
    }
}

function submit() {
    var email = emailin.value;
    var password = passin.value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var mnum = document.getElementById("mnum").value;
    var address = document.getElementById("address").value;

    database.ref('/users/' + SHA1(emailin.value)).set({
        email: email,
        pw: password,
        fname: fname,
        lname: lname,
        mnum: mnum,
        address: address
    });

    sessionStorage.setItem("uid", SHA1(emailin.value));
    alert("Account Created Successfully. Now you can login");
    location.reload();

}

function logout() {
    sessionStorage.clear();
    location.reload();
}