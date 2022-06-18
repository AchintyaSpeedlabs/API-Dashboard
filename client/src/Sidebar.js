import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { Divider } from "@mui/material";
import "./App.css";

const drawerWidth = 240;

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#7D4398",
          color: "white",
          fontFamily: "Poppins",
        },
      },
    },
  },
});

export default function Sidebar() {
  const menuItems = [
    {
      text: "Schedule Meetings",
      icon: <GroupsOutlinedIcon />,
      path: "/",
    },
    {
      text: "Send Mails",
      icon: <MailOutlinedIcon />,
      path: "/",
    },
  ];
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <div>
              <Typography variant="h5" style={{ padding: "1rem" }}>
                Dashboard
              </Typography>
            </div>
            <Divider />
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => console.log("This BUtton is Clicked")}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}
