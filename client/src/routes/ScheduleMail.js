import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import MenuItem from "@mui/material/MenuItem";
import { recurrenceOptions } from "../MailData";
import { purple } from "@mui/material/colors";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function ScheduleMail() {
  const [subLine, setSubLine] = useState("");
  const [dateValue, setDateValue] = useState(new Date("2022-08-18"));
  const [timeValue, setTimeValue] = useState(new Date("2014-08-18T21:11:54"));
  const [recurrence, setRecurrence] = useState("monthly");
  const [mailContent, setMailContent] = useState("");
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const handleSubLine = (event) => {
    setSubLine(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleTimeChange = (newValue) => {
    setTimeValue(newValue);
  };

  const handleRecurrenceChange = (event) => {
    setRecurrence(event.target.value);
  };

  const handleMonday = (event) => {
    setMonday(event.target.checked);
  };

  const handleTuesday = (event) => {
    setTuesday(event.target.checked);
  };

  const handleWednesday = (event) => {
    setWednesday(event.target.checked);
  };

  const handleThursday = (event) => {
    setThursday(event.target.checked);
  };

  const handleFriday = (event) => {
    setFriday(event.target.checked);
  };

  const handleSaturday = (event) => {
    setSaturday(event.target.checked);
  };

  const handleSunday = (event) => {
    setSunday(event.target.checked);
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
              value={dateValue}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label=""
              value={timeValue}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <p className="updateMember">Recurrence Pattern</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: "35%" },
          }}
          display="flex"
          justifyContent="space-between"
        >
          <TextField
            select
            label=""
            value={recurrence}
            onChange={handleRecurrenceChange}
            helperText=""
          >
            {recurrenceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="monday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleMonday}
                  />
                }
                label="M"
                labelPlacement="top"
              />
              <FormControlLabel
                value="tuesday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleTuesday}
                  />
                }
                label="T"
                labelPlacement="top"
                size="small"
              />
              <FormControlLabel
                value="wednesday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleWednesday}
                  />
                }
                label="W"
                labelPlacement="top"
              />
              <FormControlLabel
                value="thursday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleThursday}
                  />
                }
                label="T"
                labelPlacement="top"
              />
              <FormControlLabel
                value="friday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleFriday}
                  />
                }
                label="F"
                labelPlacement="top"
              />
              <FormControlLabel
                value="saturday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleSaturday}
                  />
                }
                label="S"
                labelPlacement="top"
              />
              <FormControlLabel
                value="sunday"
                control={
                  <Checkbox
                    sx={{
                      color: purple[700],
                      "&.Mui-checked": {
                        color: purple[700],
                      },
                    }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    size="small"
                    style={{ padding: 0 }}
                    onChange={handleSunday}
                  />
                }
                label="S"
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
