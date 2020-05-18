//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});


app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    "FNAME": firstName,
                    "LNAME":lastName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us18.api.mailchimp.com/3.0/lists/5f688460b4",
        method: "POST",
        headers: {
            "Authorization": "thevenel e1bcefa99a93e87601076c51ae3afd61-us18",
        },
        body:jsonData
    };

    request(options, function(error, response, body){

        if (error){
            res.sendfile(__dirname + "/failure.html");
        }
        else{
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendfile(__dirname +"/failure.html");
            }
        }
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


var port = 3000;
app.listen(process.env.PORT || port, function(){
    console.log(`The server is running on port ${port}.`);
});

//api key 
// e1bcefa99a93e87601076c51ae3afd61-us18

// list id
// 5f688460b4