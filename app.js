

const bodyParser = require("body-parser");
const express = require("express");
const { post } = require("request");
const request = require("request");

const app =express();

app.use(express.static("Public"));    /*** used express static method to access and use local(static) files in server */
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});


                                   /** Post request */
app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastname = req.body.lName;
    var email = req.body.email;

    console.log(firstName, lastname, email);

    var data = { // making a javascript object to store collected form data
     members: [  // members, which is array of objects containing email and subscribe status
         {
             email_address: email,
             status: "subscribed",
             merge_fields:{
                "FNAME": firstName,
                "LNAME": lastname
             }
         }
      ]
    };

    var jsonData = JSON.stringify(data); // converting data object to JSON string


    var options={  
        url: "https://us5.api.mailchimp.com/3.0/lists/af11feb084" , // instead of writing destination url explicitly, we are making an object 'objects' that have a member 'url' in that 
        method: "post",   // as default method is GET, so manually set to POST as we want to post data to mailchimp

        headers:{
            "Authorization": "yogesh f8fe306aafaebe3364a017ad9920b476-us5"
        },
        body: jsonData
         
    };

    request(options, function(error, response,body){
        if(error){
            console.log(error);
            res.sendFile(__dirname+"/failure.html");  // sending failure page on error at POST request

        }
        else{
            console.log(response.statusCode);
            if(response.statusCode===200)res.sendFile(__dirname+"/success.html"); // sending success page only when all OK
            else res.sendFile(__dirname+"/failure.html");
        }

    });
});




                                                  /*** POST method for /failure route  */
app.post("/failure",function(req,res){
   res.redirect("/"); // on getting POST request at /failulre route, redirects at home route
});



app.listen(process.env.PORT || 3000,function(){  // to allow heroku to listen to dynamic port and also our local 3000
    console.log("server running at portt 3000 huehue");
});




 /**
 newer mailchimp account
 * email: 

 * API key: f8fe306aafaebe3364a017ad9920b476-us5
 * Audience ID: af11feb084
 * heroku link : https://mysterious-mountain-02054.herokuapp.com/
 
 */