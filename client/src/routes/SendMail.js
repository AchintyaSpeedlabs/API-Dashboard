import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function SendMail() {
  const [subLine, setSubLine] = useState("");
  const [mailContent, setMailContent] = useState("");

  const handleSubLine = (event) => {
    setSubLine(event.target.value);
  };

  const handleMailContent = (event) => {
    setMailContent(event.target.value);
  };

  const handleSendClick = () => {
    axios
      .post("http://localhost:3001/send", {
        subjectLine: subLine,
        mailContent: mailContent,
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
              onClick={handleSendClick}
            >
              Send
            </Button>
          </div>
        </Box>
      </div>

      <div className="SendMailBottomRight">
        <Box
          sx={{
            "& .MuiTextField-root": { ml: 3, width: 600 },
          }}
        >
          <p className="updateMember">Mail Preview</p>
          <iframe srcDoc={mailContent}></iframe>
        </Box>
      </div>
    </div>
  );
}
