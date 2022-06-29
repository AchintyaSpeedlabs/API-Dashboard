import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function handleSubjectLineChange() {}

export default function ScheduleMail() {
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
            onChange={handleSubjectLineChange}
          />
        </Box>
        <p className="updateMember">Date and Time</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: 285 },
          }}
        >
          <TextField label="" variant="outlined" placeholder="" />
          <TextField label="" variant="outlined" placeholder="" />
        </Box>
        <p className="updateMember">Recurrence Pattern</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: "40%" },
          }}
        >
          <TextField label="" variant="outlined" placeholder="" />
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Label placement</FormLabel> */}
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="top"
                control={<Checkbox />}
                label="Top"
                labelPlacement="top"
              />
              <FormControlLabel
                value="top"
                control={<Checkbox />}
                label="Top"
                labelPlacement="top"
              />
              <FormControlLabel
                value="top"
                control={<Checkbox />}
                label="Top"
                labelPlacement="top"
              />
              <FormControlLabel
                value="top"
                control={<Checkbox />}
                label="Top"
                labelPlacement="top"
              />
            </FormGroup>
          </FormControl>
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
            onChange={handleSubjectLineChange}
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

      <div className="mailBottomRight">
        <Box
          sx={{
            "& .MuiTextField-root": { ml: 3, width: 600 },
          }}
        >
          <p className="updateMember">Mail Preview</p>
          <TextField
            label=""
            variant="outlined"
            placeholder=""
            multiline
            rows={15}
          />
        </Box>
      </div>
    </div>
  );
}
