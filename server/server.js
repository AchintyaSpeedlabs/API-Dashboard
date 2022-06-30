const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
var http = require("http").Server(app);
const path = require("path");
const fs = require("fs");
const rp = require("request-promise");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const request = require("request");
const fetch = require("node-fetch");
const { PassThrough } = require("stream");
const mailchimp = require("@mailchimp/mailchimp_marketing");

require("dotenv").config({ path: __dirname + "/.env" });

// const buildPath = path.join(__dirname + "/public");
// app.use(express.static(buildPath));

app.use(cors());
app.use(bodyParser.json());

const payload = {
  iss: process.env.ZOOM_API_KEY,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.ZOOM_API_SECRET);

// Function to convert the Date-Time Format into Only Date Format
function DateFormat(str) {
  const splitArr = str.split("T");
  console.log(splitArr[0]);
  return splitArr[0];
}

//Function to sort the response based on date
function compare(a, b) {
  if (a.start_time < b.start_time) {
    return 1;
  }
  if (a.start_time > b.start_time) {
    return -1;
  }
  return 0;
}

// Create an instant meeting
app.post("/newmeeting", (req, res) => {
  email = process.env.ZOOM_USER_ID;
  hostID = req.body.host_id;

  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + hostID + "/meetings",
    body: {
      topic: "Zoom Meeting",
      type: 1,
      settings: {
        host_video: "false",
        participant_video: "false",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.json(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

// Scedule Meetings
app.post("/schedulemeeting", function (req, res) {
  console.log("You just sent a POST request to the route /schedulemeeting");
  scheduledMeetDetails = req.body;
  console.log(scheduledMeetDetails);
  email = process.env.ZOOM_USER_ID;
  hostID = scheduledMeetDetails.host_id;
  const meetMinutes =
    parseInt(req.body.duration_hrs) * 60 + parseInt(req.body.duration_mins);

  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + hostID + "/meetings",
    body: {
      topic: scheduledMeetDetails.topic,
      type: 2,
      start_time: scheduledMeetDetails.when,
      duration: meetMinutes,
      settings: {
        host_video: scheduledMeetDetails.host == "off" ? false : true,
        participant_video:
          scheduledMeetDetails.participant == "off" ? false : true,
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      //   res.send("create meeting result: " + JSON.stringify(response));
      res.json(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

var meetingList = [];

// List all the meetings for an account
app.post("/listmeetings", function (req, res) {
  var meetingListFiltered = [];
  console.log("You just sent a POST request to this route /listmeetings");
  email = process.env.ZOOM_USER_ID;
  selectedHost = req.body.selected_host;
  selectedHostId = userIdMapping[selectedHost];
  console.log(selectedHostId);
  console.log(selectedHost);
  meetingType =
    req.body.meeting_type === undefined ? "scheduled" : req.body.meeting_type;

  var options = {
    method: "GET",
    uri:
      "https://api.zoom.us/v2/users/" +
      selectedHost +
      "/meetings" +
      "?" +
      "page_size=300" +
      "&" +
      "type=" +
      meetingType,
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      // console.log("response is: ", response);

      var temp = response.meetings;
      temp.sort(compare);
      meetingList = temp;

      for (var i = 0; i < temp.length; i++) {
        if (meetingList[i].host_id === selectedHostId) {
          console.log(meetingList[i].host_id === selectedHostId);
          meetingListFiltered.push(meetingList[i]);
        }
      }
      console.log(meetingListFiltered);
      res.json(meetingListFiltered);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

var userDetails = [];
var userIdMapping = {};
var userEmails = [];

// List all the users for an account
app.post("/users", function (req, res) {
  console.log("You just sent a POST request to this route /users");
  email = process.env.ZOOM_USER_ID;

  var options = {
    method: "GET",
    uri: "https://api.zoom.us/v2/users/",
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      // console.log("response is: ", response.users);
      userDetails = response.users;

      //iterate through the userDetails Array
      for (var i = 0; i < userDetails.length; i++) {
        userIdMapping[userDetails[i].email] = userDetails[i].id;
      }
      userEmails = Object.keys(userIdMapping);

      for (var i = 0; i < userDetails.length; i++) {
        userEmails[i] = userDetails[i].email;
      }

      for (var i = 0; i < userEmails.length; i++) {
        console.log("user emails" + userEmails[i]);
      }

      res.json(userEmails);
    })

    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

// Delete a Meeting
app.post("/delete", function (req, res) {
  console.log("You just sent a POST request to this route /delete");
  email = process.env.ZOOM_USER_ID;

  var options = {
    method: "DELETE",
    uri: "https://api.zoom.us/v2/meetings/" + "88688338575",
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

// Get Details of a meeting
app.post("/getdetails", function (req, res) {
  console.log("You just sent a POST request to this route /getdetails");
  meeting_ID = req.body.meetingID;

  var options = {
    method: "GET",
    uri: "https://api.zoom.us/v2/meetings/" + meeting_ID,
    body: {
      meetingId: meeting_ID,
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.json(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

// Get Cloud Recording of a meeting (Cloud recordings are only supported for Premium Accounts)
app.post("/getrecording", function (req, res) {
  console.log("You just sent a POST request to this route /getrecording");
  meetingID = req.body.meetingID;

  var options = {
    method: "GET",
    uri: "https://api.zoom.us/v2/meetings/" + meetingID + "/recordings",
    body: {
      meetingId: meetingID,
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.json(response);
      //   res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
      res.json(err);
    });
});

// List all the Cloud recordings in the selected range (Only for Premium Accounts)
app.post("/listrecordings", function (req, res) {
  console.log("You just sent a POST request to this route /listrecordings");
  var userID = process.env.ZOOM_USER_ID;

  from = DateFormat(req.body.range.fromValue);
  to = DateFormat(req.body.range.toValue);

  var options = {
    method: "GET",
    uri:
      "https://api.zoom.us/v2/users/" +
      userID +
      "/recordings" +
      "?" +
      "from=" +
      from +
      "&" +
      "to=" +
      to +
      "&" +
      "page_size=60",
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.json(response);
      //   res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
      res.json(err);
    });
});

// ----------------- Server Code for MAILCHIMP PROJECT  -------------- //

// Mailchimp Cofiguration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

// Check if able to make API calls to Mailchimp API
async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

// -------- Submit User List to add new members to the Audience on Mailchimp --------- //

//Submit Route
app.post("/submit", (req, res) => {
  console.log("You just made a POST request to the route /submit");
  console.log(req.body);
  var usersList = req.body.usersList;

  for (var i = 0; usersList != undefined && i < usersList.length; i++) {
    const email = usersList[i][2];
    const firstName = usersList[i][0];
    const lastName = usersList[i][1];

    // Construct req Data
    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        },
      ],
    };

    const postData = JSON.stringify(data);
    fetch(
      `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: postData,
      }
    )
      .then(
        res.statusCode === 200 ? console.log("Success") : console.log("Fail")
      )
      .catch((err) => console.log(err));
  }

  res.status(200).send({ statusCode: res.statusCode });
});

// -------- Send an Email Using Campaigns on Mailchimp ----

// List all Campaigns
const listCampaigns = async () => {
  const response = await mailchimp.campaigns.list();
  console.log(response);
};

// Get Campaign Content
const getContent = async () => {
  const response = await mailchimp.campaigns.getContent(campaignID);
  console.log(response);
};

var campaignID = "";

// Create a new Campaign
const createCampaign = async (sub) => {
  const response = await mailchimp.campaigns.create({
    type: "regular",
    recipients: { list_id: process.env.MAILCHIMP_AUDIENCE_ID },
    settings: {
      subject_line: sub,
      from_name: process.env.MAILCHIMP_FROM_NAME,
      title: "Test API Campaign",
      reply_to: process.env.MAILCHIMP_EMAIL,
    },
  });
  console.log(response);
  campaignID = response.id; // Campaign ID of the newly created campaign
};

// createCampaign();

// Set content for an already created Campaign
const setContent = async (htmlContent) => {
  const response = await mailchimp.campaigns.setContent(String(campaignID), {
    html: htmlContent,
  });
  console.log(response);
};

// Send the email campaign instantly
const sendCampaign = async () => {
  const response = await mailchimp.campaigns;
  console.log("The Mail has been sent.");
};

// Send Route
app.post("/send", (req, res) => {
  console.log("You just made a POST request at the route /send");

  const FinalSendCampaign = async () => {
    const res = await createCampaign(req.body.subjectLine);
    const result = await setContent(req.body.mailContent);
    const result2 = await sendCampaign();
  };

  FinalSendCampaign();
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
