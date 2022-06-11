const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
var http = require('http').Server(app);
const path = require('path');
const fs = require('fs')
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { response } = require('express');

require('dotenv').config({path: __dirname + '/.env'})

app.use(cors());
app.use(bodyParser.json());
 
const payload = {
    iss: process.env.API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.API_SECRET);
 
app.get("/newmeeting", (req, res) => {
  email = "hmngjjr17@gmail.com";
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "New Meeting",
      type: 1,
      settings: {
        host_video: "false",
        participant_video: "false"
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };
 
  rp(options)
    .then(function(response) {
      console.log("response is: ", response);
      // res.redirect(response.start_url)
      // res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function(err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
    
});

app.post("/schedulemeeting", function (req, res) {
  console.log("You just sent a POST request to this route")
  scheduledMeetDetails = req.body;
  console.log(scheduledMeetDetails)
  email = "hmngjjr17@gmail.com";

  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: scheduledMeetDetails.topic ,
      type: 2,
      start_time: scheduledMeetDetails.when,
      duration: 60,
      settings: {
        host_video: scheduledMeetDetails.host ==  'off' ? false : true,
        participant_video: scheduledMeetDetails.participant ==  'off' ? false : true,
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };
 
  rp(options)
    .then(function(response) {
      console.log("response is: ", response);
    //   res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function(err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
})

app.post("/listmeetings", function(req, res){
  console.log("You just sent a POST request to this route /listmeetings")
  email = "hmngjjr17@gmail.com";
  
  var options = {
    method: "GET",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {type : "live"},
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };
 
  rp(options)
    .then(function(response) {
      console.log("response is: ", response);
    //   res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function(err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
})

app.post("/getrecording", function (req, res) {
  console.log("You just sent a POST request to this route /listmeetings")
  meetingID = "WPE1pSL6SZmb0T0kCbmaJw==";

  var options = {
    method: "GET",
    uri: "https://api.zoom.us/v2/meetings/" + meetingID + "/recordings",
    body: {
      meetingId : meetingID,
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };
 
  rp(options)
    .then(function(response) {
      console.log("response is: ", response);
    //   res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function(err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });

})
 
http.listen(port, () => console.log(`Listening on port ${port}`));
