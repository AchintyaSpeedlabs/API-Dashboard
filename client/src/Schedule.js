import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Details from "./Details";
import SchedDetails from "./SchedDetails";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  initialFormValues,
  newMeetDetails,
  scheduledMeetDeets,
  hours,
  mins,
  hostVideo,
  participantVideo,
} from "./Data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "0.6rem",
  boxShadow: 24,
  p: 4,
};

var tempHosts = [];

export function Schedule() {
  const [when, setWhen] = React.useState(new Date("2022-08-18T21:11:54"));
  const [newMeetingDetails, setNewMeetingDetails] = useState(newMeetDetails);
  const [scheduledMeetingDetails, setScheduledMeetingDetails] = useState(
    scheduledMeetDeets
  );
  const [topicName, setTopicName] = useState("");
  const [hrs, setHrs] = useState("0");
  const [minutes, setMinutes] = useState("15");
  const [hostVid, setHostVid] = useState("off");
  const [hostId, setHostId] = useState("vishal@speedlabs.in");
  const [hostIdInstant, setHostIdInstant] = useState("vishal@speedlabs.in");
  const [participantVid, setParticipantVid] = useState("off");
  const [openCreate, setOpenCreate] = useState(false);
  const handleCloseCreate = () => setOpenCreate(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const handleCloseSchedule = () => setOpenSchedule(false);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    console.log("This particular useEffect is called");
    axios
      .post(`http://localhost:3001/users`)
      .then((res) => {
        // console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          tempHosts.push({ value: res.data[i], label: res.data[i] });
        }
        setHosts(tempHosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function submitSchedDetails() {
    initialFormValues.topic = topicName;
    initialFormValues.when = when;
    initialFormValues.duration_hrs = hrs;
    initialFormValues.duration_mins = minutes;
    initialFormValues.host = hostVid;
    initialFormValues.participant = participantVid;
    initialFormValues.host_id = hostId;

    axios
      .post("http://localhost:3001/schedulemeeting", initialFormValues)
      .then((res) => {
        setScheduledMeetingDetails({
          meeting_id: res.data.id,
          topic: res.data.topic,
          created_at: res.data.created_at,
          join_url: res.data.join_url,
          start_url: res.data.start_url,
          duration: res.data.duration + "mins",
          start_time: res.data.start_time,
          host_id: res.data.host_email,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenSchedule(true);
  }

  function handleTopic(event) {
    setTopicName(event.target.value);
  }

  function handleHours(event) {
    setHrs(event.target.value);
  }

  function handleHostId(event) {
    setHostId(event.target.value);
  }

  useEffect(() => {
    console.log(hostIdInstant);
  }, [hostIdInstant]);

  function handleHostIdInstant(event) {
    setHostIdInstant(event.target.value);
  }

  function handleMins(event) {
    setMinutes(event.target.value);
  }

  const handleWhen = (newValue) => {
    setWhen(newValue);
  };

  function handleHostVid(event) {
    setHostVid(event.target.value);
  }

  function handleParticipantVid(event) {
    setParticipantVid(event.target.value);
  }

  function createMeet() {
    axios
      .post(`http://localhost:3001/newmeeting`, { host_id: hostIdInstant })
      .then((res) => {
        setNewMeetingDetails({
          topic: res.data.topic,
          created_at: res.data.created_at,
          join_url: res.data.join_url,
          start_url: res.data.start_url,
          password: res.data.password,
        });
      });
    setOpenCreate(true);
  }

  return (
    <div className="left">
      <div className="create-meeting">
        <p>Zoom Meeting</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%", mb: 1 },
          }}
        >
          <TextField
            select
            label=""
            value={hostIdInstant}
            onChange={handleHostIdInstant}
            helperText=""
            size="small"
          >
            {hosts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={createMeet}>
            <AddCircleOutlinedIcon className="addIcon" />
            Create an Instant Meeting
          </Button>
          <Modal
            open={openCreate}
            onClose={handleCloseCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Meeting Invitation
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="create-details">
                  <Details
                    createdAt={newMeetingDetails.created_at}
                    joinUrl={newMeetingDetails.join_url}
                    startUrl={newMeetingDetails.start_url}
                    topic={newMeetingDetails.topic}
                    password={newMeetingDetails.password}
                  />
                </div>
              </Typography>
            </Box>
          </Modal>
        </Box>
      </div>
      <div className="schedule-meeting">
        <p className="sched-title"> Schedule a Meeting </p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
          }}
        >
          <TextField label="Title" variant="standard" onChange={handleTopic} />
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
          }}
          alignItems="center"
        >
          <p className="sched-title"> Date and Time </p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                label=""
                value={when}
                onChange={handleWhen}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <p className="sched-title"> Select Host </p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
          }}
          display="flex"
          justifyContent="space-between"
        >
          <TextField
            select
            label=""
            value={hostId}
            onChange={handleHostId}
            helperText=""
          >
            {hosts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <p className="sched-title"> Duration </p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "48%" },
          }}
          display="flex"
          justifyContent="space-between"
        >
          <TextField
            select
            label=""
            value={hrs}
            onChange={handleHours}
            helperText=""
          >
            {hours.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label=""
            value={minutes}
            onChange={handleMins}
            helperText=""
          >
            {mins.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <p className="sched-title"> Video Setting </p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              width: "48%",
              mt: 1,
            },
          }}
          display="flex"
          justifyContent="space-between"
        >
          <TextField
            select
            label="Host"
            value={hostVid}
            onChange={handleHostVid}
            helperText=""
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
            helperText=""
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
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="scheduleBtnDiv">
            <Button variant="contained" onClick={submitSchedDetails}>
              Schedule
            </Button>
            <Modal
              open={openSchedule}
              onClose={handleCloseSchedule}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Meeting Invitation
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="sched-details">
                    <SchedDetails
                      createdAt={scheduledMeetingDetails.created_at}
                      joinUrl={scheduledMeetingDetails.join_url}
                      startUrl={scheduledMeetingDetails.start_url}
                      topic={scheduledMeetingDetails.topic}
                      duration={scheduledMeetingDetails.duration}
                      meetingId={scheduledMeetingDetails.meeting_id}
                      startTime={scheduledMeetingDetails.start_time}
                      hostId={scheduledMeetingDetails.host_id}
                    />
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </Box>
      </div>
    </div>
  );
}

export function hostsList() {
  return tempHosts;
}
