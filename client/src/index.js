import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MailchimpApp from "./MailchimpApp";
import SendMail from "./routes/SendMail";
import ScheduleMail from "./routes/ScheduleMail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/meetings" element={<App />} />
      <Route path="/mails" element={<MailchimpApp />}>
        <Route path="send-mail" element={<SendMail />} />
        <Route path="schedule-mail" element={<ScheduleMail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
