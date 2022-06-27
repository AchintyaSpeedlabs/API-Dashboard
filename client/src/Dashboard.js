import React from "react";
import List from "./List";
import { Schedule } from "./Schedule";
import "./App.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Schedule />
      <List />
    </div>
  );
}
