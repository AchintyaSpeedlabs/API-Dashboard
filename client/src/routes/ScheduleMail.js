import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ScheduleMail() {
  const [subLine, setSubLine] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState(
    new Date("2022-08-18T21:15:54")
  );
  const [mailContent, setMailContent] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  }

  const handleSubLine = (event) => {
    setSubLine(event.target.value);
    console.log(subLine);
  };

  useEffect(() => {
    var minutes = dateTimeValue.getMinutes();
    if (minutes == 0 || minutes == 15 || minutes == 30 || minutes == 45) {
    } else {
      setOpen(true);
    }
  }, [dateTimeValue]);

  const handleDateTimeChange = (newValue) => {
    setDateTimeValue(newValue);
  };

  const handleMailContent = (event) => {
    setMailContent(event.target.value);
    console.log(mailContent);
  };

  const handleScheduleClick = () => {
    axios
      .post("http://localhost:3001/schedule", {
        subjectLine: subLine,
        mailContent: mailContent,
        scheduleDateTime: dateTimeValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="mailBottomLeft">
        <p className="updateMember">Subject Line</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: 600 },
          }}
          display="flex"
          justifyContent="space-between"
        >
          <TextField
            label=""
            variant="outlined"
            placeholder="Enter the subject of the mail"
            onChange={handleSubLine}
          />
        </Box>
        <p className="updateMember">Date and Time</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: "46%" },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={dateTimeValue}
              onChange={handleDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label=""
              value={dateTimeValue}
              onChange={handleDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Schedule time may only be in 15 minute intervals, e.g. 9:15 not 9:10
          </Alert>
        </Snackbar>

        <p className="updateMember">Mail Content</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: 600 },
          }}
        >
          <TextField
            label=""
            variant="outlined"
            placeholder="Enter Plaintext OR Raw HTML"
            onChange={handleMailContent}
            multiline
            rows={10}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: 600 },
          }}
          display="flex"
          justifyContent="space-between"
        >
          <div className="SendBtns">
            <Button
              sx={{ ml: 3, mr: 1 }}
              variant="contained"
              className="subBtn"
              onClick={handleScheduleClick}
            >
              Schedule
            </Button>
          </div>
        </Box>
      </div>

      <div className="mailBottomRight">
        <Box
          sx={{
            "& .MuiTextField-root": { ml: 3, mt: 3, width: 600 },
          }}
        >
          <p className="updateMember">Mail Preview</p>
          <iframe srcDoc={mailContent}></iframe>
        </Box>
      </div>
    </div>
  );
}
