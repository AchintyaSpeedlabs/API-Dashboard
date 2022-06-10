import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-wizardry/dist/react-wizardry.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Details from "./Details";
import SchedDetails from "./SchedDetails";
import GetDetails from "./GetDetails";

const columns = [
  {
    id: "meetingId",
    label: "Meeting ID",
  },
  {
    id: "topic",
    label: "Topic",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 100,
  },
  {
    id: "startTime",
    label: "Start Time",
  },
  {
    id: "duration",
    label: "Duration (in mins)",
    align: "right",
  },
  {
    id: "joinUrl",
    label: "Join URL",
    align: "right",
  },
];

function createData(meetingId, topic, createdAt, startTime, duration, joinUrl) {
  return { meetingId, topic, createdAt, startTime, duration, joinUrl };
}

var rows = [];

const initialFormValues = {
  topic: "New Meeting",
  when: new Date(),
  duration_hrs: "0",
  duration_mins: "15",
  host: "Off",
  participant: "Off",
};

const newMeetDetails = {
  topic: "",
  created_at: "2022-06-10T03:28:55Z",
  join_url: "",
  start_url: "",
  password: "",
};

const scheduledMeetDeets = {
  meeting_id: "",
  topic: "",
  created_at: "2022-06-10T03:28:55Z",
  duration: "",
  join_url: "",
  start_url: "",
  password: "",
  start_time: "",
};

const meetingDetails = {
  meeting_id: "",
  topic: "",
  created_at: "2022-06-10T03:28:55Z",
  duration: "",
  join_url: "",
  start_url: "",
  password: "",
};

const hours = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

const mins = [
  {
    value: "15",
    label: "15",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "45",
    label: "45",
  },
];

const hostVideo = [
  {
    value: "on",
    label: "On",
  },
  {
    value: "off",
    label: "Off",
  },
];

const participantVideo = [
  {
    value: "on",
    label: "On",
  },
  {
    value: "off",
    label: "Off",
  },
];

export default function Dashboard() {
  const [when, setWhen] = React.useState(new Date("2022-08-18T21:11:54"));
  const [newMeetingDetails, setNewMeetingDetails] = useState(newMeetDetails);
  const [scheduledMeetingDetails, setScheduledMeetingDetails] = useState(
    scheduledMeetDeets
  );
  const [getMeetDetails, SetGetMeetDetails] = useState(meetingDetails);
  const [isCreated, setIsCreated] = useState(false);
  const [gotDetails, SetGotDetails] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [schedMeetDetails, setSchedMeetDetails] = useState(initialFormValues);
  const [hrs, setHrs] = useState("0");
  const [minutes, setMinutes] = useState("15");
  const [hostVid, setHostVid] = useState("off");
  const [participantVid, setParticipantVid] = useState("off");
  const [meetingID, setMeetingID] = useState("");
  const [list, setList] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createMeet() {
    console.log("This works");
    axios.get(`http://localhost:3001/newmeeting`).then((res) => {
      console.log(res.data);
      setNewMeetingDetails({
        topic: res.data.topic,
        created_at: res.data.created_at,
        join_url: res.data.join_url,
        start_url: res.data.start_url,
        password: res.data.password,
      });
    });
    setIsCreated(true);
  }

  function handleTopic(event) {
    setTopicName(event.target.value);
    console.log(topicName);
  }

  function handleHours(event) {
    console.log(event.target.value);
    setHrs(event.target.value);
    console.log(hrs);
  }

  function handleMins(event) {
    setMinutes(event.target.value);
    console.log(minutes);
  }

  const handleWhen = (newValue) => {
    setWhen(newValue);
    console.log(when);
  };

  function handleHostVid(event) {
    setHostVid(event.target.value);
    console.log(event.target.value);
  }

  function handleParticipantVid(event) {
    setParticipantVid(event.target.value);
    console.log(event.target.value);
  }

  function handleGetMeetingDetails(event) {
    setMeetingID(event.target.value);
    console.log(event.target.value);
  }

  function handleGetMeetingBtn() {
    console.log("Get Meeting Detail Button was clicked!");
    axios
      .post("http://localhost:3001/getdetails", { meetingID: meetingID })
      .then((res) => {
        console.log(res.data);
        SetGetMeetDetails({
          meeting_id: res.data.id,
          topic: res.data.topic,
          created_at: res.data.created_at,
          join_url: res.data.join_url,
          start_url: res.data.start_url,
          password: res.data.password,
          duration: res.data.duration + "mins",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    SetGotDetails(true);
  }

  function submitSchedDetails() {
    initialFormValues.topic = topicName;
    initialFormValues.when = when;
    initialFormValues.duration_hrs = hrs;
    initialFormValues.duration_mins = minutes;
    initialFormValues.host = hostVid;
    initialFormValues.participant = participantVid;

    console.log(initialFormValues);

    axios
      .post("http://localhost:3001/schedulemeeting", initialFormValues)
      .then((res) => {
        console.log(res.data);

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

    setIsScheduled(true);
  }

  function handleListMeetings() {
    console.log("List Meeting Button has been clicked!");
    axios
      .get("http://localhost:3001/listmeetings")
      .then((res) => {
        console.log(res.data.meetings);
        setList(res.data.meetings);
        rows = list;
        res.data.meetings.forEach((obj) => {
          rows.push(
            createData(
              obj.id,
              obj.topic,
              obj.created_at,
              obj.start_time,
              obj.duration,
              obj.join_url
            )
          );
        });
        setIsListed(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="create-meeting">
        <Divider>
          <p>Create an Instant Meeting</p>
        </Divider>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Button variant="contained" onClick={createMeet}>
            Create
          </Button>
        </Box>
        {isCreated && (
          <div className="create-details">
            <Details
              createdAt={newMeetingDetails.created_at}
              joinUrl={newMeetingDetails.join_url}
              startUrl={newMeetingDetails.start_url}
              topic={newMeetingDetails.topic}
              password={newMeetingDetails.password}
            />
          </div>
        )}
      </div>
      <div className="schedule-meeting">
        <Divider>
          <p className="sched-title"> Schedule a Meeting </p>
        </Divider>
        <form>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-required"
              label="Topic"
              variant="outlined"
              onChange={handleTopic}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  label="Pick Date & Time"
                  value={when}
                  onChange={handleWhen}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
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
              "& .MuiTextField-root": { m: 1, width: "25ch" },
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
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Button variant="contained" onClick={submitSchedDetails}>
              Schedule
            </Button>

            {isScheduled && (
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
            )}
          </Box>

          <div className="list-meetings">
            <Divider>
              <p>List all Meetings</p>
            </Divider>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Button variant="contained" onClick={handleListMeetings}>
                List
              </Button>
              {isListed && (
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              )}
            </Box>
          </div>
        </form>
      </div>
      <div className="get-meeting-details">
        <Divider>
          <p>Get Meeting Details</p>
        </Divider>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-required"
            label="Meeting ID"
            variant="outlined"
            onChange={handleGetMeetingDetails}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Button variant="contained" onClick={handleGetMeetingBtn}>
            Get
          </Button>
          {gotDetails && (
            <GetDetails
              topic={getMeetDetails.topic}
              createdAt={getMeetDetails.created_at}
              joinUrl={getMeetDetails.join_url}
              startUrl={getMeetDetails.start_url}
              password={getMeetDetails.password}
              duration={getMeetDetails.duration}
              meetingId={getMeetDetails.meeting_id}
            />
          )}
        </Box>
      </div>
    </div>
  );
}
