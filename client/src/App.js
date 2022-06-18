import "./App.css";
import Dashboard from "./Dashboard.js";
import React from "react";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
