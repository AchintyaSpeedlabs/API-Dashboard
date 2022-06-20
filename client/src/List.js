import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
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
import { columns, meetingDetails } from "./Data";

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

export default function List() {
  const [getMeetDetails, SetGetMeetDetails] = useState(meetingDetails);
  const [meetingID, setMeetingID] = useState("");
  const [list, setList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDetails, setOpenDetails] = useState(false);
  const [recordingExists, setRecordingsExist] = useState(false);
  const [display, setDisplay] = useState(false);
  const handleCloseDetails = () => setOpenDetails(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/listmeetings")
      .then((res) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    joinUrl = <a href={joinUrl}>Join</a>;
    duration = duration + "min";
    return { meetingId, topic, createdAt, startTime, duration, joinUrl };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleGetMeetingDetails(event) {
    setMeetingID(event.target.value);
  }

  function handleGetMeetingBtn() {
    axios
      .post("http://localhost:3001/getrecording", { meetingID: meetingID })
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
          <Button variant="contained" onClick={handleGetMeetingBtn}>
            Get
          </Button>
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
        <p>Meeting List</p>

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
                        style={{ minWidth: column.minWidth }}
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
