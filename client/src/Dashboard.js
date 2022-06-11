import React, {useState, useEffect} from 'react'
import { Wizard } from "react-wizardry";
import axios from 'axios'; 
import "react-wizardry/dist/react-wizardry.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const initialFormValues = {
  topic: 'New Meeting',
  when: new Date(),
  duration_hrs: '0',
  duration_mins: '15',
  host: 'Off',
  participant: 'Off',
}

const hours = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
];

const mins = [
  {
    value: '15',
    label: '15',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '45',
    label: '45',
  },
];

const hostVideo =  [
  {
    value: 'on',
    label: 'On',
  },
  {
    value: 'off',
    label: 'Off',
  },
];

const participantVideo =  [
  {
    value: 'on',
    label: 'On',
  },
  {
    value: 'off',
    label: 'Off',
  },
];

export default function Dashboard() {

    const [meetingDetails, setMeetingDetails] = useState([]) 
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isTrue, setIsTrue] = useState(false)
    const [topicName, setTopicName] = useState("");
    const [schedMeetDetails, setSchedMeetDetails] = useState(initialFormValues);
    const [hrs, setHrs] = useState('0');
    const [minutes, setMinutes] = useState('15');
    const [hostVid, setHostVid] = useState('off');
    const [participantVid, setParticipantVid] = useState('off');
    const [meetingID, setMeetingID] = useState("")

    function createMeet(){
      console.log("This works");
      axios.get(`http://localhost:3001/newmeeting`)
      .then(res => {
        console.log(res.data);
      })
    }

    function handleTopic(event){
      setTopicName(event.target.value);
      console.log(topicName);
    }

    function handleHours(event){
      console.log(event.target.value);
      setHrs(event.target.value);
      console.log(hrs)
    }

    function handleMins(event){
      setMinutes(event.target.value);
      console.log(minutes);
    }

    function handleHostVid(event){
      setHostVid(event.target.value);
      console.log(event.target.value);
    }

    function handleParticipantVid(event){
      setParticipantVid(event.target.value)
      console.log(event.target.value);
    }

    function handleGetMeetingDetails(event){
      setMeetingID(event.target.value)
      console.log(event.target.value);
    }

    function handleGetMeetingBtn(){
      console.log("Get Meeting Detail Button was clicked!")
      axios.post("http://localhost:3001/getrecording", {meetingID : 12345678}).
      then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }

    function submitSchedDetails() {
      initialFormValues.topic = topicName;
      initialFormValues.when = new Date(2022, 11, 24, 10, 33, 30, 0);
      initialFormValues.duration_hrs = hrs;
      initialFormValues.duration_mins = minutes;
      initialFormValues.host = hostVid;
      initialFormValues.participant = participantVid;

      console.log(initialFormValues);

      axios.post("http://localhost:3001/schedulemeeting", initialFormValues)
      .then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }

    function handleListMeetings(){
      console.log("List Meeting Button has been clicked!")
      axios.post("http://localhost:3001/listmeetings").
      then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  
  return (
    <div>
      <div className='create-meeting'>
        <Divider><p>Create an Instant Meeting</p></Divider>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <Button variant="contained" onClick={createMeet}>Create</Button>
        </Box>
      </div>
      <div className='schedule-meeting'>
      <Divider><p className='sched-title'> Schedule a Meeting </p></Divider>
      <form >
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField id="outlined-required" label="Topic" variant="outlined" onChange={handleTopic} />
        </Box>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
            select
            label="Duration (Hours)"
            value={hrs}
            onChange={handleHours}
            helperText="Select the Duration in Hours"
          >
            {hours.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Duration (Mins)"
            value={minutes}
            onChange={handleMins}
            helperText="Select the Duration in Minutes"
          >
            {mins.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
      </Box>
   
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField
            select
            label="Host"
            value={hostVid}
            onChange={handleHostVid}
            helperText="Select Host Video Settings"
          >
            {hostVideo.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Participant"
            value={participantVid}
            onChange={handleParticipantVid}
            helperText="Select Participant Video Settings"
          >
            {participantVideo.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
      </Box>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <Button variant="contained" onClick={submitSchedDetails}>Schedule</Button>
      </Box>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <Accordion  sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
      
      <div className='list-meetings'>
        <Divider><p>List all Meetings</p></Divider>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <Button variant="contained" onClick={handleListMeetings}>List</Button>
        </Box>
      </div>

    
      </form>
      </div>
      <div className='get-meeting-details'>
        <Divider><p>Get Meeting Details</p></Divider>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          >
            <TextField id="outlined-required" label="Meeting ID" variant="outlined" onChange={handleGetMeetingDetails}/>
          </Box>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          >
           <Button variant="contained" onClick={handleGetMeetingBtn}>Get</Button>
          </Box>
      </div>
      
    </div>
  )
}

// function onSubmit(val){
//   setIsSubmitted(true);
//   console.log(val);
//   setMeetingDetails(val);
//   console.log(meetingDetails);

//   axios.post("http://localhost:3001/schedulemeeting", val)
//   .then((res) => {
//     console.log(res.data)
//   }).catch((error) => {
//     console.log(error)
//   })
// }

// function onSubmitListMeeting(){
//   setIsTrue(true);
//   console.log("This work")
// }

// <h2>
//             Create an Instant Meeting
//       </h2> 
//         <form id="main-login" action="http://localhost:3001/newmeeting" method="get">     
//             <button className="btn-style" type="submit">Create</button>
//         </form>
//         <Wizard
//         onFinish={onSubmit}
//         strict={false}
//         pages={[
//           {
//             title: "Schedule a Meeting",
//             fields: [
//               {
//                 label: "Topic",
//                 name: "topic",
//                 type: "text",
//                 isRequired: true
//               },
//               {
//                 name: "when",
//                 type: "datetime",
//                 label: "When",
//                 isRequired: true
//               },
//               {
//                 label: "Duration (hr)",
//                 name: "duration-hr",
//                 type: "radio",
//                 isRequired: true,

//                 options: [
//                   { name: "0", value: "0" },
//                   { name: "1", value: "1" },
//                   { name: "2", value: "2" },
//                   { name: "3", value: "3" },
//                   { name: "4", value: "4" },
//                   { name: "5", value: "5" },
//                   { name: "6", value: "6" },
//                 ]
//               },
//               {
//                 label: "mins",
//                 name: "duration-mins",
//                 type: "radio",
//                 isRequired: true,

//                 options: [
//                   { name: "0", value: "0" },
//                   { name: "15", value: "15" },
//                   { name: "30", value: "30" },
//                   { name: "45", value: "45" },
//                 ]
//               },
//               {
//                 label: "Host",
//                 name: "host",
//                 type: "radio",

//                 options: [
//                   { name: "On", value: "on" },
//                   { name: "Off", value: "off" },
//                 ]
//               },
//               {
//                 label: "Participant",
//                 name: "participant",
//                 type: "radio",

//                 options: [
//                   { name: "On", value: "on" },
//                   { name: "Off", value: "off" },
//                 ]
//               },
//             ]
//           },
//         ]}
//       />
//       {isSubmitted && (
//         <div className='sched-details'>
//         <h2>Sceduled Meeting Details: </h2>
//         <p> Click <a href="https://us05web.zoom.us/s/81125077952?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6Ikx0WHVibmlwUk11X3dLalpOdnAwNmciLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNSIsImNsdCI6MCwibW51bSI6IjgxMTI1MDc3OTUyIiwiZXhwIjoxNjUzNDg4MzI0LCJpYXQiOjE2NTM0ODExMjQsImFpZCI6IkRuM0RHdG5GUzB1LVc4cy10VDRGYlEiLCJjaWQiOiIifQ.aHgVZR1hv3z5y3939aPaAsNB-LYflB3obPgMevL1hZM"> <strong>here</strong></a>  to start the meeting </p>
      
//         <p><strong> Join Meeting URL: </strong></p>
//         <p> <a href="https://us05web.zoom.us/j/81125077952?pwd=Vkl5V0E1RmZ4M21yRzErU2JqVDVSUT09">https://us05web.zoom.us/j/81125077952?pwd=Vkl5V0E1RmZ4M21yRzErU2JqVDVSUT09</a> </p>
//         <p><strong>Password: </strong> Z3dsJU</p>
//         </div>
//       )}
//       <button className="btn-style" type="submit" onClick={onSubmitListMeeting}>List Meetings</button>
//       {isTrue && (
//         <div>
//         <h3>Meeting ID &ensp; Created At &ensp; Duration</h3>
//         <br/>
//         <p> 88573733724 &ensp; 26-05-2022 16:08 &ensp; 15 mins</p>
//         <p> 87694827992 &ensp; 26-05-2022 15:09 &ensp; 30 mins</p>
      
//         </div>
//       )}
//      <Wizard
//         onFinish={onSubmit}
//         strict={false}
//         pages={[
//           {
//             title: "Get Meeting Details",
//             fields: [
//               {
//                 label: "Meeting ID",
//                 name: "meetid",
//                 type: "text",
//                 isRequired: true
//               },
//             ]
//           },
//         ]}
//       />
//        {isSubmitted && (
//         <div className='sched-details'>
//         <h2></h2>
//         <p> You can download the recorded meeting from <a href="/"> <strong>here</strong></a></p>
      

//         </div>
//       )}
