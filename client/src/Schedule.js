import React, { useState } from "react";
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

export default function Schedule() {
  const [when, setWhen] = React.useState(new Date("2022-08-18T21:11:54"));
  const [newMeetingDetails, setNewMeetingDetails] = useState(newMeetDetails);
  const [scheduledMeetingDetails, setScheduledMeetingDetails] = useState(
    scheduledMeetDeets
  );
  const [topicName, setTopicName] = useState("");
  const [hrs, setHrs] = useState("0");
  const [minutes, setMinutes] = useState("15");
  const [hostVid, setHostVid] = useState("off");
  const [participantVid, setParticipantVid] = useState("off");
  const [openCreate, setOpenCreate] = useState(false);
  const handleCloseCreate = () => setOpenCreate(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const handleCloseSchedule = () => setOpenSchedule(false);

  function submitSchedDetails() {
    initialFormValues.topic = topicName;
    initialFormValues.when = when;
    initialFormValues.duration_hrs = hrs;
    initialFormValues.duration_mins = minutes;
    initialFormValues.host = hostVid;
    initialFormValues.participant = participantVid;

    axios
      .post("http://localhost:3001/schedulemeeting", initialFormValues)
      .then((res) => {
        setScheduledMeetingDetails({
          meeting_id: res.data.id,
          topic: res.data.topic,
          created_at: res.data.created_at,
          join_url: res.data.join_url,
          start_url: res.data.start_url,
          password: res.data.password,
          duration: res.data.duration + "mins",
          start_time: res.data.start_time,
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
    axios.get(`http://localhost:3001/newmeeting`).then((res) => {
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
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
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

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
          }}
        >
          <p className="sched-title"> Host </p>
          <TextField
            select
            label=""
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
          <p className="sched-title"> Participant </p>
          <TextField
            select
            label=""
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
                      password={scheduledMeetingDetails.password}
                      duration={scheduledMeetingDetails.duration}
                      meetingId={scheduledMeetingDetails.meeting_id}
                      startTime={scheduledMeetingDetails.start_time}
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
