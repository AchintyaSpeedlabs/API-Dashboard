import React from "react";
import "./App.css";

export default function SchedDetails({
  topic,
  display,
  startTime,
  recordingCount,
  recordingFiles,
  password,
  duration,
  meetingId,
  status,
}) {
  return (
    <div className="recordingDiv" style={{ width: "100%" }}>
      {display ? (
        <div>
          <p>
            <strong>Topic: </strong> {topic}
          </p>
          <p>
            <strong>Meeting ID: </strong> {meetingId}
          </p>
          <p>
            <strong>Duration: </strong> {duration}
          </p>
          <p>
            <strong>Password:</strong> {password}
          </p>
          <p>
            <strong>Recordings:</strong>
          </p>
          <p>
            {recordingFiles.map((obj) => {
              return (
                <p key={obj.id}>
                  Find the {obj.file_type} file{" "}
                  <a
                    href={obj.play_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>here</strong>
                  </a>
                </p>
              );
            })}
          </p>
        </div>
      ) : (
        <p>Recording does not exist for this meeting</p>
      )}
    </div>
  );
}
