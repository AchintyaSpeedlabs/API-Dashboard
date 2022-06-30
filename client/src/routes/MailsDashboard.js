import React, { useState, forwardRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { ExcelRenderer } from "react-excel-renderer";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "../MailData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function createData(array) {
  return { firstname: array[0], lastname: array[1], email: array[2] };
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var rows = [];

export default function MailsDashboard() {
  const [sendBtnClassName, setSendClassName] = useState("sendText");
  const [scheduleClassName, setScheduleClassName] = useState("scheduleText");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [excelRows, setExcelRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleSendClick() {
    setSendClassName("sendText");
    setScheduleClassName("scheduleText");
  }

  function handleScheduleClick() {
    setSendClassName("sendTextAfterClick");
    setScheduleClassName("scheduleTextAfterClick");
  }

  function handleSaveBtn() {
    axios
      .post("http://localhost:3001/submit", { usersList: excelRows })
      .then((res) => {
        if (res) {
          if (res.status == 200 && excelRows.length > 0) {
            console.log("Success!");
            setSnackbarOpen(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleExcelFile(event) {
    rows = [];
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resp.rows);
        var temparr = [];
        for (var i = 1; i < resp.rows.length; i++) {
          if (resp.rows[i].length > 0) {
            temparr.push(resp.rows[i]);
          }
        }
        setExcelRows(temparr);
        for (var i = 0; i < temparr.length; i++) {
          rows.push(createData(temparr[i]));
        }
      }
    });
  }

  return (
    <div>
      <div className="mailchimp-left">
        <p>Mailchimp</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%", mb: 1 },
          }}
        >
          <Link
            className={sendBtnClassName}
            to="send-mail"
            onClick={handleSendClick}
          >
            Send mail
          </Link>
          <Link
            className={scheduleClassName}
            to="schedule-mail"
            onClick={handleScheduleClick}
          >
            Schedule mail
          </Link>
          <p className="updateMember">Update Member's List</p>
          <Card
            className="theCard"
            sx={{ minWidth: 1200, width: "100%", ml: 3, mt: 2, mb: 2, p: 0.5 }}
          >
            <CardActions>
              <label htmlFor="excel_file">
                <input type="file" id="excel_file" onChange={handleExcelFile} />
              </label>
              <span id="fileName"></span>
            </CardActions>
          </Card>
          <div className="MailBtns">
            <Button
              sx={{ ml: 3, mr: 1 }}
              variant="contained"
              className="subBtn"
              onClick={handleSaveBtn}
            >
              Save
            </Button>
            <Button
              className="viewListBtn"
              variant="contained"
              onClick={handleModalOpen}
            >
              View List
            </Button>

            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 700,
                  bgcolor: "background.paper",
                  borderRadius: "0.4rem",
                  boxShadow: 24,
                  p: 4,
                }}
              >
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
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
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
              </Box>
            </Modal>
            {/* <OutTable
              data={this.state.rows}
              columns={this.state.cols}
              tableClassName="ExcelTable2007"
              tableHeaderRowClass="heading"
            /> */}
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} sx={{ width: "100%" }}>
              Members succesfully added to the list
            </Alert>
          </Snackbar>
        </Box>
        <Box>
          <Outlet />
        </Box>
      </div>
    </div>
  );
}
