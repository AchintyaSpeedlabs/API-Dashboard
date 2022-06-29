import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

export default function MailsDashboard() {
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
          <Link className="sendText" to="send-mail">
            Send mail
          </Link>
          <Link className="scheduleText" to="schedule-mail">
            Schedule mail
          </Link>
          <p className="updateMember">Update Member's List</p>
          <Card
            className="theCard"
            sx={{ minWidth: 1200, width: "100%", ml: 3, mt: 2, mb: 2, p: 0.5 }}
          >
            <CardActions>
              <label for="excel_file">
                <input type="file" id="excel_file" />
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

        <div class="row justify-content-center">
          <iframe id="code"></iframe>
        </div>

        <div id="members-snackbar">Members Succesfully Added!</div>
      </div>
    </div>
  );
}
