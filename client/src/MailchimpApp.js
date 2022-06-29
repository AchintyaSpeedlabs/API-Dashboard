import "./App.css";
import React from "react";
import Sidebar from "./Sidebar";
import MailsDashboard from "./routes/MailsDashboard";

export default function MailchimpApp() {
  return (
    <div className="mailchimpApp" style={{ display: "flex" }}>
      <Sidebar />
      <MailsDashboard />
    </div>
  );
}
