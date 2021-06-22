const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//const fetch = require("node-fetch");
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.get('/', function(req,res){
  console.log(__dirname);
  res.sendFile(__dirname + '/signup.html');
});


mailchimp.setConfig({
  apiKey: "032cf64e70fd3bb23dc16f55ffbc484f-us6",
  server: "us6",
});

const footerContactInfo = {
  company: "Mailchimp",
  address1: "675 Ponce de Leon Ave NE",
  address2: "Suite 5000",
  city: "Atlanta",
  state: "GA",
  zip: "30308",
  country: "US"
};

const campaignDefaults = {
  from_name: "Pradipta",
  from_email: "nubrapika@gmail.com",
  subject: "Pradipta's Garden News Letter",
  language: "EN_US"
};

//Audience ID: f60ca69e76.
app.post('/', function(req, res) {
   //console.log(req.body);
   const list_Id = 'f60ca69e76';
   const firstName = req.body.firstname;
   console.log(firstName);
   const lastName = req.body.lastname;
   const email = req.body.email;
   console.log(email);

  const run = async () => {
  const response = await mailchimp.lists.addListMember(list_Id, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        fname: firstName,
        lname: lastName
      }
     }).catch((error) => {
       res.sendFile(__dirname+"/failure.html");
       //console.log(error);
     });
     console.log(response);
   };

   run();
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server has started on port " +port);
});
