import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import GetDetails from "./GetDetails";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  columns,
  meetingDetails,
  recordingColumns,
  meetingTypes,
} from "./Data";

import { hostsList } from "./Schedule";

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

var rows = [];
var recordingRows = [];
var tempHosts = hostsList();

export default function List() {
  const [getMeetDetails, SetGetMeetDetails] = useState(meetingDetails);
  const [meetingID, setMeetingID] = useState("");
  const [list, setList] = useState([]);
  const [recordingsArray, setRecordingsArray] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageRecording, setPageRecording] = useState(0);
  const [rowsPerPageRecording, setRowsPerPageRecording] = useState(10);
  const [openDetails, setOpenDetails] = useState(false);
  const [openRecordingList, setOpenRecordingList] = useState(false);
  const [recordingExists, setRecordingsExist] = useState(false);
  const [gotRecordingList, setGotRecordingList] = useState(false);
  const [display, setDisplay] = useState(false);
  const handleCloseDetails = () => setOpenDetails(false);
  const handleCloseRecordingList = () => setOpenRecordingList(false);
  const [fromValue, setFromValue] = useState(new Date("2022-06-20T21:11:54"));
  const [toValue, setToValue] = useState(new Date("2022-06-21T21:11:54"));
  const [meetingType, setMeetingType] = useState("scheduled");
  const [hostId, setHostId] = useState("vishal@speedlabs.in");
  const [selectedHost, setSelectedHost] = useState("vishal@speedlabs.in");

  const handleFromChange = (newValue) => {
    setFromValue(newValue);
  };

  const handleToChange = (newValue) => {
    setToValue(newValue);
  };

  function handleHostId(event) {
    setHostId(event.target.value);
    setSelectedHost(event.target.value);
  }

  useEffect(() => {
    var temp = [];
    axios
      .post("https://zoom-meetings-dashboard.herokuapp.com/listmeetings", {
        meeting_type: meetingType,
        selected_host: selectedHost,
      })
      .then((res) => {
        setList(res.data);
        rows = list;
        res.data.forEach((obj) => {
          temp.push(
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
        rows = temp;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedHost]);

  useEffect(() => {
    setTimeout(() => {
      console.log(meetingType);
      console.log(selectedHost);
      var temp = [];
      axios
        .post("https://zoom-meetings-dashboard.herokuapp.com/listmeetings", {
          meeting_type: meetingType,
          selected_host: selectedHost,
        })
        .then((res) => {
          setList(res.data);
          rows = list;
          res.data.forEach((obj) => {
            temp.push(
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
          rows = temp;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }, [meetingType]);

  const handleMeetingType = (event) => {
    setMeetingType(event.target.value);
  };

  const GmtToIst = (gmtTime) => {
    var s = new Date(gmtTime).toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    });
    return s;
  };

  function createData(
    meetingId,
    topic,
    createdAt,
    startTime,
    duration,
    joinUrl
  ) {
    startTime = GmtToIst(startTime);
    createdAt = GmtToIst(createdAt);
    joinUrl = (
      <a href={joinUrl} target="_blank" rel="noopener noreferrer">
        Join Now
      </a>
    );
    duration = duration + "min";
    return { meetingId, topic, createdAt, startTime, duration, joinUrl };
  }

  function createRecordingData(
    meetingId,
    topic,
    startTime,
    duration,
    shareUrl
  ) {
    startTime = GmtToIst(startTime);
    shareUrl = (
      <a href={shareUrl} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    );
    duration = duration + "min";
    return { meetingId, topic, startTime, duration, shareUrl };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePageRecording = (event, newPage) => {
    setPageRecording(newPage);
  };

  const handleChangeRowsPerPageRecording = (event) => {
    setRowsPerPageRecording(+event.target.value);
    setPageRecording(0);
  };

  function handleGetMeetingDetails(event) {
    setMeetingID(event.target.value);
  }

  function handleRecordingList() {
    var tempArray = [];
    axios
      .post("https://zoom-meetings-dashboard.herokuapp.com/listrecordings", {
        range: { fromValue, toValue },
      })
      .then((res) => {
        console.log(res.data.meetings);
        setRecordingsArray(res.data.meetings);
        recordingRows = recordingsArray;
        console.log(recordingRows);
        console.log(recordingsArray);
        res.data.meetings.forEach((obj) => {
          tempArray.push(
            createRecordingData(
              obj.id,
              obj.topic,
              obj.start_time,
              obj.duration,
              obj.share_url
            )
          );
        });
        recordingRows = tempArray;
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenRecordingList(true);
    setGotRecordingList(true);
  }

  function handleGetMeetingBtn() {
    axios
      .post("https://zoom-meetings-dashboard.herokuapp.com/getrecording", {
        meetingID: meetingID.trim(),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === undefined) {
          setRecordingsExist(true);
          setDisplay(true);
        } else if (Number(res.data.statusCode) === 404) {
          setRecordingsExist(true);
          setDisplay(false);
        }
        SetGetMeetDetails({
          meeting_id: res.data.id,
          topic: res.data.topic,
          start_time: res.data.created_at,
          recording_count: res.data.recording_count,
          recording_files: res.data.recording_files,
          password: res.data.password,
          duration: res.data.duration + " mins",
          status: res.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDetails(true);
  }

  return (
    <div className="right">
      <div className="get-meeting-details">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 2, mt: 2, mr: 2.5, width: "30%" },
          }}
        >
          <p> List Recordings</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={fromValue}
              onChange={handleFromChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={toValue}
              onChange={handleToChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div className="recordingListDiv">
            <Button variant="contained" onClick={handleRecordingList}>
              List Recordings
            </Button>
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: 3, mr: 2.5, width: "40%" },
          }}
        >
          <p>Get Meeting Recordings</p>
          <TextField
            label="Enter Meeting ID"
            variant="outlined"
            onChange={handleGetMeetingDetails}
            size="small"
          />
          <div className="meetingDetailsDiv">
            <Button variant="contained" onClick={handleGetMeetingBtn}>
              Get
            </Button>
          </div>
          <Modal
            open={openRecordingList}
            onClose={handleCloseRecordingList}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 1000,
                bgcolor: "background.paper",
                borderRadius: "0.4rem",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <strong>Recordings</strong>
              </Typography>
              <Typography id="modal-modal-description">
                {gotRecordingList ? (
                  <Box>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow
                              sx={{
                                "& th": {
                                  color: "white",
                                  backgroundColor: "#6A2F85",
                                },
                              }}
                            >
                              {recordingColumns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    padding: "0.5rem",
                                  }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {recordingRows
                              .slice(
                                pageRecording * rowsPerPageRecording,
                                pageRecording * rowsPerPageRecording +
                                  rowsPerPageRecording
                              )
                              .map((row) => {
                                return (
                                  <TableRow
                                    style={{ height: 10 }}
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                  >
                                    {recordingColumns.map((column) => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          style={{ padding: "0.5rem" }}
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
                        count={recordingRows.length}
                        rowsPerPage={rowsPerPageRecording}
                        page={pageRecording}
                        onPageChange={handleChangePageRecording}
                        onRowsPerPageChange={handleChangeRowsPerPageRecording}
                      />
                    </Paper>
                  </Box>
                ) : (
                  <p>Getting the List of Recordings...</p>
                )}
              </Typography>
            </Box>
          </Modal>

          <Modal
            open={openDetails}
            onClose={handleCloseDetails}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <strong>Meeting Invitation</strong>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <p></p>
                {recordingExists ? (
                  <GetDetails
                    display={display}
                    topic={getMeetDetails.topic}
                    startTime={getMeetDetails.start_time}
                    recordingCount={getMeetDetails.recording_count}
                    recordingFiles={getMeetDetails.recording_files}
                    password={getMeetDetails.password}
                    duration={getMeetDetails.duration}
                    meetingId={getMeetDetails.meeting_id}
                    status={getMeetDetails.status}
                  />
                ) : (
                  <p>Getting the Meeting Details...</p>
                )}
              </Typography>
            </Box>
          </Modal>
        </Box>
      </div>

      <div className="list-meetings">
        <div className="meetingListDiv">
          <p>Meeting List</p>
          <div className="innerMeetingListDiv">
            <TextField
              select
              label=""
              value={hostId}
              onChange={handleHostId}
              helperText=""
              sx={{
                minWidth: 150,
                height: 60,
                mr: 1,
              }}
              size="small"
            >
              {tempHosts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label=""
              value={meetingType}
              onChange={handleMeetingType}
              helperText=""
              sx={{
                minWidth: 120,
                height: 60,
              }}
              size="small"
            >
              {meetingTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        color: "white",
                        backgroundColor: "#6A2F85",
                      },
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, padding: "0.5rem" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          style={{ height: 10 }}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                style={{ padding: "0.5rem" }}
                                key={column.id}
                                align={column.align}
                              >
                                {column.format && typeof value === "number"
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
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
}
