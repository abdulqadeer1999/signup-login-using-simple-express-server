
// const url = 'http://localhost:5000';

const url = "https://new-login-signup.herokuapp.com";

function postSignUp(){
    user = {
        name : document.getElementById("names").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,

    };

    const Http = new XMLHttpRequest();

    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(user));
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let JsonResp = JSON.parse(Http.responseText);
            if (JsonResp.status === 200) {
                document.getElementById('names').value = "";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";

                alert(JsonResp.message);
                window.location.href = "signin.html";
            } else {
                document.getElementById("result").innerHTML = JsonResp.message;
            }
        }
    }
    return false;
}






function login() {

    let Emails = document.getElementById("email").value;
    let Passwords = document.getElementById("password").value;

    const Http = new XMLHttpRequest();

    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-Type", "application/json");

    Http.send(JSON.stringify({
        email: Emails,
        password: Passwords
    }));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let JSONres = JSON.parse(Http.responseText)
            if (JSONres.status === 200) {
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""

                document.getElementById("Result").innerText = JSONres.message;
                document.getElementById("name").innerText = "Name :" + JSONres.user.name;
                document.getElementById("email").innerText = "Email :" + JSONres.user.email;
            }
            else if (JSONres.status > 200) {
                document.getElementById("Result").innerText = JSONres.message;
                document.getElementById("name").innerText = "";
                document.getElementById("email").innerText = "";
            }
            else {
                document.getElementById("Result").innerText = JSONres.message;
            }

        }


    }


    return false;
}

