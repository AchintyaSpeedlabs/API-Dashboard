import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

export default function MailsDashboard() {
  const [sendBtnClassName, setSendClassName] = useState("sendText");
  const [scheduleClassName, setScheduleClassName] = useState("scheduleText");

  function handleSendClick() {
    setSendClassName("sendText");
    setScheduleClassName("scheduleText");
  }

  function handleScheduleClick() {
    setSendClassName("sendTextAfterClick");
    setScheduleClassName("scheduleTextAfterClick");
  }

  function handleExcelFile() {}
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
            >
              Save
            </Button>
            <Button className="viewListBtn" variant="contained">
              View List
            </Button>
          </div>
        </Box>
        <Box>
          <Outlet />
        </Box>

        <div id="members-snackbar">Members Succesfully Added!</div>
      </div>
    </div>
  );
}
