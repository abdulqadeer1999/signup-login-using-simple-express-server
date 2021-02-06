
const url = 'http://localhost:5000';

// const url = "https://new-login-signup.herokuapp.com"

function postSignUp(){
    user = {
        name : document.getElementById("names").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,

    }


   const Http = new XMLHttpRequest();

   Http.open("POST", url + "/signup");
   Http.setRequestHeader("Content-Type" ,"application/json"),
   Http.send(JSON.stringify(user));
   Http.onreadystatechange =(e) => {
       if(Http.readyState === 4){
           let JsonResp = JSON.parse(Http.responseText);
           if (JsonResp === 200){
               document.getElementById("names").value= "";
               document.getElementById("password").value= " ";
               document.getElementById("email").value = " ";

               alert(JsonResp.message);
               window.location.href = "signin.html"
           }else {
               document.getElementById("names").innerHTML = JsonResp.message;
               document.getElementById("email").innerHTML = JsonResp.message;
               document.getElementById("password").innerHTML = JsonResp.message;
           }
       }
   }
  return false;
}




function login () {
    let Emails = document.getElementById("email").value;
    let Password = document.getElementById("password").value;


    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signin")
    Http.setRequestHeader("Content-Type","application/json")

    Http.send(JSON.stringify( {
        email: Emails,
        password:Password,
    }));

    Http.onreadystatechange = (e) => {
        if(Http.readyState === 4){
            let JSONres= JSON.parse(Http.responseText)
            if (JSONres.status === 200) {
                   document.getElementById("email").value = " ";
                   document.getElementById("password").value = " ";


                   document.getElementById("Result").innerHTML = JSONres.message;
                   document.getElementById("names").innerHTML = "Name :" + JSONres.user.name;
                   document.getElementById("email").innerText = "Email :" +JSONres.user.email;
            }

            else if (JSONres.status>200) {
                document.getElementById("Result").innerHTML = JSONres.message;
                document.getElementById("names").innerHTML =  " " ;
                document.getElementById("email").innerText =  " ";

            }

            else {
                document.getElementById("Result").innerText = JSONres.message;
            }
        }
    }
    
    return false;

}

