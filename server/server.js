
let users = [
    {
        name: "Qadeer",
        email: "qadeer@gmail.com",
        password: "123"
    },

];


var PORT = process.env.PORT || 5000;
var express = require("express");
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
let fs = require('fs');


var app = express();

app.use(cors());


app.use(morgan('dev'));
app.use(bodyParser.json())



app.get("/", (req, res, next) => {
    console.log("some one get menu");
    res.send("signup success full");
});
app.post('/signup', (req, res) => {
    let isFound = false;
    for (i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email) {
            isFound = true;
            break;
        }
    }
    if (isFound) {
        res.send({
            message: "User Already Exist With This Email",
            status: 459
        });
    }
    else {
        users.push(req.body);
        console.log(req.body);

        res.send({
            message: "Sign Up Successfully",
            status: 200
        });

    }






})

app.post('/login', (req, res) => {


    let isFound = false;
    for (let i = 0; i < users.length; i++) {
        if (req.body.email === users[i].email) {
            isFound = i;
            break;
        }
    }
    if (isFound) {
        if (users[isFound].password === req.body.password) {
            res.send({
                user: users[isFound],
                message: "Login Succes",
                status: 200
            });
        }
        else {
            res.send({
                message: "incorrect passsword",
                status: 400
            });
        }
    }
    else {
        res.send({
            message: "User Not Found",
            status: 400

        });

    }


})




// app.post('/index', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

app.listen(PORT, () => {
    console.log("server is running on " + PORT);
})