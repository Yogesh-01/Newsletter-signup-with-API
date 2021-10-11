

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



app.listen(3000,function(){
    console.log("server running at portt 3000 huehue");
});



/** Mail chimp account details
 *  email: bifiva7542@ppp998.com
 *  username: yogesh866
 *  pass: Yogesh@123
 *  API key: c2e78801c015f646e29d6271ab40d69a-us5
 */

/** new Mailchimp account
 * email: yefohit360@posiklan.com
 * username: hehe789
 * pass: Hehe@789
 * API key: 8cdb8dcf89c78f27b29c119dc595f305-us5
 */

/** new Mailchimp account
 * email: yogasen917@stvbz.com
 * username: hehe12345
 * pass: Hehe@123
 * API key: 9f5090f43919c173e7228eecc173a323-us5
 * Audience ID : dba303f925
 */

/** newer mailchimp account
 * email: jigom21537@rebation.com
 * username: hehe123456
 * pass: Hehe@12345
 * API key: 92431e1ac87c7df7b7d7d400ff18d5cc-us5
 * Audience ID: e76ca453fe
 * 
 
 newer mailchimp account
 * email: 

 * API key: f8fe306aafaebe3364a017ad9920b476-us5
 * Audience ID: af11feb084
 
 */