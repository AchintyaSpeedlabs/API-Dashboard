export const columns = [
  {
    id: "meetingId",
    label: "Meeting ID",
    align: "left",
  },
  {
    id: "topic",
    label: "Title",
    align: "left",
  },
  {
    id: "createdAt",
    label: "Created At",
    align: "left",
  },
  {
    id: "startTime",
    label: "Start Time",
    align: "left",
  },
  {
    id: "duration",
    label: "Duration",
    align: "left",
  },
  {
    id: "joinUrl",
    label: "Join URL",
    align: "left",
    minWidth: 80,
  },
];

export const recordingColumns = [
  {
    id: "meetingId",
    label: "Meeting ID",
    align: "left",
  },
  {
    id: "topic",
    label: "Title",
    align: "left",
  },
  {
    id: "startTime",
    label: "Start Time",
    align: "left",
  },
  {
    id: "duration",
    label: "Duration",
    align: "left",
  },
  {
    id: "shareUrl",
    label: "Share URL",
    align: "left",
  },
];

export const initialFormValues = {
  topic: "New Meeting",
  when: new Date(),
  duration_hrs: "0",
  duration_mins: "15",
  host: "Off",
  participant: "Off",
};

export const newMeetDetails = {
  topic: "",
  created_at: "2022-06-10T03:28:55Z",
  join_url: "",
  start_url: "",
  password: "",
};

export const scheduledMeetDeets = {
  meeting_id: "",
  topic: "",
  created_at: "2022-06-10T03:28:55Z",
  duration: "",
  join_url: "",
  start_url: "",
  password: "",
  start_time: "",
};

export const meetingDetails = {
  meeting_id: "",
  topic: "",
  start_time: "2022-06-10T03:28:55Z",
  duration: "",
  recording_count: 0,
  recording_files: [],
  password: "",
  status: "",
};

export const hours = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

export const mins = [
  {
    value: "15",
    label: "15",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "45",
    label: "45",
  },
];

export const hostVideo = [
  {
    value: "on",
    label: "On",
  },
  {
    value: "off",
    label: "Off",
  },
];

export const participantVideo = [
  {
    value: "on",
    label: "On",
  },
  {
    value: "off",
    label: "Off",
  },
];
