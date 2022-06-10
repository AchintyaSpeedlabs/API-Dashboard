import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import "./App.css";

const MyBox = styled(Box)({
  background: "#fcfcfc",
  border: 0,
  borderRadius: 3,
  boxShadow: "#767578",
  color: "black",
  padding: "0 30px",
});

export default function SchedDetails({
  topic,
  createdAt,
  joinUrl,
  startUrl,
  password,
  duration,
  meetingId,
  startTime,
}) {
  return (
    <div style={{ width: "100%" }}>
      <MyBox
        sx={{
          display: "block",
          displayPrint: "none",
          m: 1,
          fontSize: "0.1rem",
          fontWeight: "400",
          padding: 1.4,
        }}
        className="createBox"
      >
        <p>
          {" "}
          <strong> Topic: </strong> {topic}
        </p>
        <p>
          {" "}
          <strong> Scheduled For: </strong> {startTime}
        </p>
        <p>
          {" "}
          <strong> Meeting ID: </strong> {meetingId}
        </p>
        <p>
          {" "}
          <strong>Created at </strong> {createdAt}
        </p>

        <p>
          {" "}
          <strong>Join URL:</strong>{" "}
          <a href={joinUrl} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </p>
        <p>
          {" "}
          <strong>Start URL:</strong>{" "}
          <a href={startUrl} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </p>
        <p>
          {" "}
          <strong> Duration: </strong> {duration}
        </p>
        <p>
          {" "}
          <strong>Password:</strong> {password}
        </p>
      </MyBox>
    </div>
  );
}
