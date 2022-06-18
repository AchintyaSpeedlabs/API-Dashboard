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
  const handleCloseDetails = () => setOpenDetails(false);

  useEffect(() => {
    console.log("mounted");
    console.log("List button was clicked");
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
      .post("http://localhost:3001/getdetails", { meetingID: meetingID })
      .then((res) => {
        SetGetMeetDetails({
          meeting_id: res.data.id,
          topic: res.data.topic,
          created_at: res.data.created_at,
          join_url: res.data.join_url,
          start_url: res.data.start_url,
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
          <p>Get Meeting Details</p>
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
                Meeting Invitation
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <GetDetails
                  topic={getMeetDetails.topic}
                  createdAt={getMeetDetails.created_at}
                  joinUrl={getMeetDetails.join_url}
                  startUrl={getMeetDetails.start_url}
                  password={getMeetDetails.password}
                  duration={getMeetDetails.duration}
                  meetingId={getMeetDetails.meeting_id}
                  status={getMeetDetails.status}
                />
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
