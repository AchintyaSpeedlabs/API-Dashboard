import React, { useState } from "react";
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
            >
              Send
            </Button>
            <Button className="viewListBtn" variant="contained">
              Preview
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
