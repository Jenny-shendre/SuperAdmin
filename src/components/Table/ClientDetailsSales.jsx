import React, { useEffect, useState, useRef } from "react";
import "../Home.css";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { IoIosArrowForward } from "react-icons/io";
import notify from "../../assets/add_notes (black).png";
import backButtton from "../../assets/back-button.png";
import stopButton from "../../assets/stop-button.png";
import DropIcon from "../../assets/DropIcon.png";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import axios, { Axios } from "axios";
import { format } from "date-fns";
import eyes from "../../assets/eyes.png";
import view from "../../assets/hugeicons_view (1).png";
import edit from "../../assets/akar-icons_edit (2).png";
import delt from "../../assets/material-symbols_delete-outline.png";
import edit2 from "../../assets/akar-icons_edit (3).png";
import { Link } from "react-router-dom";

function ClientDetails() {
  const getStoredTime = () => {
    const storedTime = localStorage.getItem("timeLeft");
    return storedTime ? parseInt(storedTime, 10) : 300000;
  };
  const getStartTime = () => {
    const storedTime = localStorage.getItem("start_time");
    return storedTime ? parseInt(storedTime, 10) : 0;
  };

  const [showPopup, setShowPopup] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [data, setdata] = useState([]);
  const [upcomings, setupcoming] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const [timeLeft, setTimeLeft] = useState(getStoredTime());
  const [timerActive, setTimerActive] = useState(true);
  const [time, setTime] = useState(getStartTime());
  const [isActive, setIsActive] = useState(false); // Timer status
  const [intervalId, setIntervalId] = useState(null); // To keep track of the interval ID
  const [EndCounter, setEndCounter] = useState(0);
  const [StartDateTime, setStartDateTime] = useState(0);
  const [EndDateTime, setEndDateTime] = useState(0);
  const [CalRes, setCalRes] = useState([]);
  const [ClientID, setClientID] = useState();
  const [resstart, setRes] = useState();
  const [resEndDateTime, setresEndDateTime] = useState();
  const [clientIdData, setClientIdData] = useState("CHROF77");
  const MyRef = useRef([]);
  const [customerdata, setCustomerdata] = useState({
    projectName: "",
    customerName: "",
    name: "",
    notes: "",
  });

  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX103"
  );

  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [showEditNotePopup, setShowEditNotePopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown
  const [loading, setLoading] = useState(false);

  const notePopupRef = useRef();
  const addNotePopupRef = useRef();
  const EditNotePopupRef = useRef();
  const addManagerPopupRef = useRef();
  const addExecutivePopupRef = useRef(); //  ref for executive popup
  const dropdownRef = useRef();
  const projectDropdownRef = useRef(); // ref for project dropdown

  const [data2, setdata2] = useState([]);
  const [lastDatas, setlastDatas] = useState([]);
  const [clientNameData, setclientNameData] = useState("");
  const [ProjectNameData, setProjectNameData] = useState("");
  const [Timerget, setTimer] = useState("");
  const [Timing, setTiming] = useState([]);

  const [attendTime, setattendTime] = useState(false);

  const [callCloseTimeRemaining, setcallCloseTimeRemaining] = useState();
  const lastData = (datas) => {
    data.length - 1;
    setlastDatas(data[data.length - 1]);
  };

  //Mobile View

  const [activeSection, setActiveSection] = useState("appointments");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  //New

  const handleOutsideClick = (event) => {
    if (notePopupRef.current && !notePopupRef.current.contains(event.target)) {
      setShowNotePopup(false);
      setShowEditNotePopup(false);
    }
    if (
      addNotePopupRef.current &&
      !addNotePopupRef.current.contains(event.target)
    ) {
      setShowAddNotePopup(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      projectDropdownRef.current &&
      !projectDropdownRef.current.contains(event.target)
    ) {
      setIsProjectDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (
      showNotePopup ||
      showAddNotePopup ||
      isDropdownOpen ||
      isProjectDropdownOpen
    ) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showNotePopup, showAddNotePopup, isDropdownOpen, isProjectDropdownOpen]);

  // Add team members popup logic
  const array = [];
  const [clientName, setclientName] = useState(
    upcomings?.[0]?.ClientName || ""
  );
  const [project, setProject] = useState(upcomings?.[0]?.ClientProject || "");
  const [ClientIdInfo, setClientIdInfo] = useState(
    upcomings?.[0]?.ClientId || ""
  );
  const [briefing, setBriefing] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // state for error message
  const [timeResponseStart, settimeResponseStart] = useState(""); // state for error message
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [DataEmp, setDataEmp] = useState("");
  const [checktimer, setchecktimer] = useState(
    localStorage.getItem("acceptMeeting")
  );
  const [setreject, setsetreject] = useState(false);
  // console.log(array);

  const resetCountdownTimer = () => {
    setTimeLeft(300000); // Reset to 5 minutes
    setTime(0);
    setTimerActive(true); // Start the countdown timer
    setEndCounter(0);
  };

  const stopTime = () => {
    setShowNotePopup(false);
    setShowAddNotePopup(true);
    setIsActive(false);
    setEndCounter(formatTime(time));
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd MMM | hh:mm a");
    setEndDateTime(formattedDate);
    console.log(formattedDate);
    meetingOvers(IdEmp);
    console.log("StartTime", StartDateTime);
    console.log("EndTime", formattedDate);

    TimeCal(StartDateTime, formattedDate);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      // Update the countdown every second
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = Math.max(prevTime - 1000, 0);
          localStorage.setItem("timeLeft", newTime); // Store the updated time in localStorage
          return newTime;
        });
      }, 1000);

      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      // Timer expired
      console.log("Rejecting");
      console.log(Date.now());
      setTimerActive(false);
      localStorage.removeItem("timeLeft"); // Clear the stored time when the timer expires
    }
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (isActive) {
      // if interval is not there then start this 
      if (!intervalId) {
        const id = setInterval(() => {
          setTime((prevTime) => {
            const newTime = prevTime + 1000;
            localStorage.setItem("start_time", newTime); // Local storage mein time update karo
            return newTime;
          });
        }, 1000);
        setIntervalId(id); // Set IntervalId 
      }
    } else {
      // Timer stop karo
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null); // Reset Interval ID 
      }
    }

    return () => {
      // Cleanup for unmounting
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, intervalId]);

  const handleProjectChange = (projectName) => {
    setProject(projectName);
    setIsProjectDropdownOpen(false);
  };

  // useEffect(() => {
  //   const EmpId = localStorage.getItem("EmpId");
  //   setClientID(EmpId);
  // }, []);

  const EmpData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/settingsExecutive/${IdEmp}`
    );
    // setDataEmp(res.data);
    console.log(res.data);
    setDataEmp(res.data._id);
    console.log("EMP", res.data._id);
  };
  useEffect(() => {
    EmpData();
  }, [IdEmp]);

  const ClientDetails = async (id, employeeId) => {
    console.log("Client", id);
    try {
      const client = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/customers/NoteUpdate/${id}`,
        {
          notes: briefing,
        }
      );
      console.log("client", client);
    } catch (error) {
      console.error(
        "Error adding client:",
        error.response ? error.response.data : error.message
      );
    }
    try {
      const dataNote = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/notes`,
        {
          name: clientName,
          note: briefing,
          role: "Client",
          project: project,
          employeeId,
        }
      );
      console.log("AddNote", dataNote);
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //Delete PopUp
  const [showDeletePopup, setDeleteShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/deleteHistory/${IdEmp}/${deleteId}`
      );
      // setdata((prevData) => prevData.filter((item) => item._id !== deleteId));
      historyData(IdEmp);
      setDeleteShowPopup(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const res2 = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/projects`
      );
      setdata2(res2.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (ClientId) => {
    setDeleteId(ClientId);
    setDeleteShowPopup(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const startTimer = () => {
    setIsActive(true);
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd MMM | hh:mm a");
    setStartDateTime(formattedDate);
    console.log("Start", formattedDate);
  };

  const togglePopup = (note) => {
    setShowPopup(!showPopup);
    setCurrentNote(note);
  };

  const NotePopup = ({ note, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="font-bold text-lg mb-2">{note.name}</h3>
        <p className="text-xs text-gray-600 mb-2">{note.date}</p>
        <p className="mb-4">{note.content}</p>
        <button
          onClick={onClose}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
          Close
        </button>
      </div>
    </div>
  );

  const [iconState, setIconState] = useState({
    correct1: true,
    cross1: true,
    correct2: true,
    cross2: true,
  });

  const handleCorrectClick = (correctClass, crossClass) => {
    setIconState((prevState) => ({
      ...prevState,
      [correctClass]: false,
      [crossClass]: false,
    }));
    handleClick();
  };

  const handleCrossClick = (correctClass, crossClass) => {
    setIconState((prevState) => ({
      ...prevState,
      [correctClass]: true,
      [crossClass]: true,
    }));
  };

  const timeResponse = async () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "mm:ss");
    let timeResponses = localStorage.getItem("StartTimeBackup");

    console.log("StartDateTime.......", timeResponses);
    console.log("EndDateTime.......", formattedDate);
    console.log("ClientID.......", ClientID);

    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/timeSheet/timeResponse/${ClientID}`,
        {
          StartTime: timeResponses,
          EndTime: formattedDate,
        }
      );
      setCalRes("response", res);
      console.log("response", res);
      console.log("response", ClientID);
      localStorage.removeItem("StartTimeBackup");
    } catch (error) {
      console.log(error);
    }
  };

  const historyData = async (employeeId) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/history/${employeeId}`
      );
      setdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const upcoming = async (employeeId) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/upcoming/${employeeId}`
      );
      setupcoming(res.data);
      array.push(res.data);
      console.log(res);
      // console.log("setupcoming", res.data);
      // this if statement is using the Date length is > 0
      if (res.data.length > 0) {
        // this timer code is using the calculated the Response time
        const currentDate = new Date();
        const formattedDate = format(currentDate, "mm:ss");
        let localData = localStorage.getItem("StartTimeBackup");
        console.log("StartTimeBackup", localData);
        if (!localData) {
          localStorage.setItem("StartTimeBackup", formattedDate);
        }
        setRes(formattedDate);
        console.log("res=====", res);
      } else {
        localStorage.removeItem("StartTimeBackup");
      }
      if (res.data.length === 0) {
        resetCountdownTimer();
      }
      // setIsActive(true); // Start the regular timer
    } catch (error) {
      console.log(error);
    }
  };

  const rejectMeeting = async (employeeId) => {
    try {
      const res = await axios.put(
        ` ${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/reject/${employeeId}`
      );
      console.log("reject", res);
      // localStorage.setItem("StartTimeBackup", formattedDate);
      setsetreject(true);
      localStorage.removeItem("StartTimeBackup");
      localStorage.removeItem("start_time");
    } catch (error) {
      console.log(error);
    }
  };
  const acceptMeeting = async (employeeId) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/accept/${employeeId}`
      );
      console.log(res.data);
      // this timer code is using the calculated the meeting time
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd MMM | hh:mm a");
      let localData = localStorage.getItem("acceptMeeting");
      console.log("acceptMeeting", localData);
      if (!localData) {
        localStorage.setItem("acceptMeeting", formattedDate);
        timeResponse();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const TimeCal = async (ClientID) => {
    console.log("TimeCal starting");

    // Fetch start date time from localStorage
    const StartDateTime = localStorage.getItem("acceptMeeting");
    if (!StartDateTime) {
      console.log("StartDateTime not found in localStorage.");
      return;
    }

    // Ensure ClientID is passed or fetched from localStorage
    if (!ClientIdInfo) {
      console.error("ClientID is missing!");
      return;
    }

    // Current Date and Time formatting
    const currentDate = new Date();
    const EndDateTime = format(currentDate, "dd MMM | hh:mm a");

    // Log Start and End Times
    console.log("StartDateTime:", StartDateTime);
    console.log("EndDateTime:", EndDateTime);
    console.log("ClientID:", ClientIdInfo);

    try {
      // Making the API call to update the timeline
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/timeSheet/timeline/${ClientIdInfo}`,
        {
          StartTime: StartDateTime,
          EndTime: EndDateTime,
        }
      );
      console.log("API Response:", res);

      // Handle the response accordingly
      setCalRes("response", res);

      // Clear localStorage values
      localStorage.removeItem("acceptMeeting");
      localStorage.removeItem("start_time");
    } catch (error) {
      // Handle API call failure
      console.error("API call failed:", error);
    }
  };
  const meetingOvers = async (employeeId) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/meetingOver/${employeeId}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };

  const endTimer = () => {
    setIsActive(false);
    setEndCounter(formatTime(time));
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd MMM | hh:mm a");
    setEndDateTime(formattedDate);
    console.log(formattedDate);
    meetingOvers(IdEmp);
    console.log("StartTime", StartDateTime);
    console.log("EndTime", formattedDate);

    TimeCal(StartDateTime, formattedDate);
  };

  const rejectMeetingfun = () => {
    rejectMeeting(IdEmp);
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd MMM | hh:mm a");
    formattedDate;
    timeResponse(timeResponseStart, formattedDate);
    console.log(formattedDate);
    timeResponse(IdEmp);
    setresEndDateTime(formattedDate);
    console.log("rejectMeeting");
  };

  useEffect(() => {
    if (checktimer) {
      stopTimer();
      startTimer();
      setIconState({ correct1: false, cross1: false });
      console.log("pls started");
    }
  }, []);

  const handleClick = () => {
    stopTimer();
    startTimer();
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd MMM | hh:mm a");
    console.log(timeResponseStart, formattedDate);
    timeResponse(timeResponseStart, formattedDate);
    timeResponse(IdEmp);
    acceptMeeting(IdEmp);
  };
  /*
  useEffect(() => {
    console.log(isSubmitted);
    if (isSubmitted === false) {
      upcoming(IdEmp);
      if (IdEmp) {
        historyData(IdEmp); // Call once after submission
        upcoming(IdEmp); // Initial call

        if (upcomings.length === 0) {
          const intervalId = setInterval(() => {
            upcoming(IdEmp); // Call upcoming every 5 seconds
          }, 5000);

          return () => clearInterval(intervalId); // Cleanup interval on unmount or IdEmp change
        }
      }
    }
  }, [IdEmp, isSubmitted]);
*/
  useEffect(() => {
    console.log("Formatted Time Left:", formatTime(timeLeft).trim()); // Debug log

    if (timeLeft === 0) {
      if (timeLeft === 0) {
        console.log("Timer hit 00:00, calling functions"); // Debug log
        rejectMeeting(IdEmp);
      }
      historyData(IdEmp);
      upcoming(IdEmp);
    }
  }, [timeLeft]);

  useEffect(() => {
    console.log(isSubmitted);

    if (!isSubmitted) {
      if (IdEmp) {
        // Call the initial data fetching once after submission
        upcoming(IdEmp);
        historyData(IdEmp);

        // Only set up the interval if upcomings is empty
        if (upcomings.length === 0) {
          const intervalId = setInterval(() => {
            upcoming(IdEmp); // Call upcoming every 5 seconds
          }, 5000);

          // Cleanup the interval on unmount or when dependencies change
          return () => clearInterval(intervalId);
        }
      }
    }
  }, [
    IdEmp,
    isSubmitted,
    createStatus,
    upcomings.length,
    checktimer,
    setreject,
  ]); // Keep dependencies simple, just track variables, not expressions
  // Trigger effect when upcomings length changes

  const handleSubmit = async () => {
    console.log("projects", project);
    console.log("clientNames", clientName);
    if (clientName && project && briefing && clientConversation) {
      setIsCreating(true);
      setErrorMessage(""); // Clear any previous error messages
      console.log("Come");
      ClientDetails(ClientIdInfo, IdEmp);

      try {
        if (clientConversation === "Yes") {
          const res = await axios.put(
            `${
              import.meta.env.VITE_BACKEND
            }/api/attendants/clientConversion/${IdEmp}`
          );
          console.log("count the client converted", res);
        }
      } catch (error) {
        console.log(error);
      }

      const notedata = {
        clientName: clientName,
        project: project,
        briefing: briefing,
        clientConversation: clientConversation,
      };

      try {
        setIsSubmitted(true);
        setCreateStatus("Note Successfully Added ✓");
        console.log("Response send", notedata);
        historyData(IdEmp);
        upcoming(IdEmp);
        setIsSubmitted(false);
        TimeCal();
      } catch (error) {
        console.error("Error creating Note:", error);
        setCreateStatus("Error Creating Note");
      } finally {
        setIsCreating(false);
        setIsSubmitted(false);
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  // console.log("Please fill in all fields", showAddNotePopup);

  useEffect(() => {
    if (upcomings.length > 0) {
      setClientID(upcomings[0]?.ClientId);
    }
  }, [upcomings]);

  const [clientConversation, setclientConversation] = useState("");

  const handleOptionChange = (event) => {
    setclientConversation(event.target.value);
  };

  // console.log("clientConversation", clientConversation);

  //Edir Note Popup

  const [clientName2, setClientName2] = useState("");
  const [briefing2, setBriefing2] = useState("");
  const [projectName, setProjectName] = useState("");
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  const [createStatus2, setCreateStatus2] = useState("close note");
  const [isCreating2, setIsCreating2] = useState(false);
  const popupRef = useRef();
  const [errorMessage2, setErrorMessage2] = useState();

  const handleSubmit2 = async () => {
    setErrorMessage2("");

    const notesdata = {
      notes: briefing2,
    };

    setCreateStatus2("Registering Channel....");
    setIsCreating2(true);

    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/customers/DataUpdate/${clientIdData}`,
        notesdata
      );

      console.log("Data is updated :", res);

      setCreateStatus2("Close note");

      // resetForm();

      // getData1();
    } catch (error) {
      console.error("Error editing note:", error);

      setCreateStatus2("Error editing note");
      errorMessage2(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsCreating2(false);
    }
  };

  // const updateCreatelogTimes = async (data) => {
  //   console.log(upcomings);
  //   console.log(DataEmp);
  //   try {
  //     const res = await axios.put(
  //       `${
  //         import.meta.env.VITE_BACKEND
  //       }/api/attendants/update-createlog-times/${DataEmp._id}/${
  //         upcomings[0]._id
  //       }`,
  //       {
  //         attendTime: false,
  //         callCloseTime: true,
  //       }
  //     );
  //     setTimer(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(upcomings);
  // const logTimes = async () => {
  //   console.log(DataEmp);
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_BACKEND}/api/attendants/check-timeout/${
  //         DataEmp._id
  //       }`
  //     );
  //     setTiming(res.data[0]);
  //     console.log(res.data[0]);
  //     console.log("check-timeout", res.data[0].callCloseTimeStatus);

  //     // Add a check for res.data and res.data[0]
  //     if (
  //       res.data &&
  //       res.data[0] &&
  //       res.data[0].callCloseTimeRemaining !== undefined
  //     ) {
  //       console.log("check-timeout", res.data[0].callCloseTimeRemaining);
  //     } else {
  //       console.log("No valid callCloseTimeRemaining found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setInterval(() => {
  //   logTimes();
  // }, 10000);

  // Helper function to check if a month has passed since the last update
  const hasMonthPassed = (lastUpdateDate) => {
    const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const currentDate = new Date().getTime();
    return currentDate - new Date(lastUpdateDate).getTime() >= oneMonthInMillis;
  };
  /*
  let timer; // Define the timer outside the function to maintain its reference globally

  function AutostartTimer(createdAtRemaining, stopImmediately = false) {
    // Split the "createdAtRemaining" string into minutes and seconds
    const [minutes, seconds] = createdAtRemaining.split(":").map(Number); // Convert to numbers

    let totalTime = minutes * 60 + seconds; // Convert total time to seconds
    let elapsedTime = 0;
    const timerDisplay = document.getElementById("timer-display"); // Get the timer display element

    // Function to update the timer display
    function updateDisplay(remainingMinutes, remainingSeconds) {
      remainingMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
      remainingSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

      timerDisplay.innerText = `${remainingMinutes}:${remainingSeconds}`;
    }

    // Function to stop the timer
    function stopTimer() {
      clearInterval(timer);
      console.log("Timer stopped.");
    }

    // If stopImmediately is true, stop the timer and return the remaining time
    if (stopImmediately) {
      stopTimer(); // Stop the timer

      // Return the remaining time formatted as mm:ss
      let remainingMinutes = Math.floor(totalTime / 60);
      let remainingSeconds = totalTime % 60;
      updateDisplay(remainingMinutes, remainingSeconds);

      return `${remainingMinutes}:${remainingSeconds}`;
    }

    // Function to start the timer and update the display
    function start() {
      elapsedTime++;
      let remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
        stopTimer();
        updateDisplay(0, 0); // Set timer to 00:00 when it reaches zero
      } else {
        let remainingMinutes = Math.floor(remainingTime / 60);
        let remainingSeconds = remainingTime % 60;
        // updateDisplay(remainingMinutes, remainingSeconds);

        remainingMinutes =
          remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
        remainingSeconds =
          remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        if (!stopImmediately)
          timerDisplay.innerText = `${remainingMinutes}:${remainingSeconds}`;
      }
    }

    // Start the timer and update the display every second
    timer = setInterval(start, 1000); // Call start every second (1000ms)
  }

  let timer2; // Define the timer2 outside the function to maintain its reference globally

  function AutostartTimer2(createdAtRemaining, stopImmediately = false) {
    // Split the "createdAtRemaining" string into minutes and seconds
    const [minutes, seconds] = createdAtRemaining.split(":").map(Number); // Convert to numbers

    let totalTime = minutes * 60 + seconds; // Convert total time to seconds
    let elapsedTime = 0;
    const timerDisplay = document.getElementById("timer2-display"); // Get the timer2 display element

    // Function to update the timer2 display
    function updateDisplay(remainingMinutes, remainingSeconds) {
      remainingMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
      remainingSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

      timerDisplay.innerText = `${remainingMinutes}:${remainingSeconds}`;
    }

    // Function to stop the timer2
    function stopTimer() {
      clearInterval(timer2);
      console.log("Timer stopped.");
    }

    // If stopImmediately is true, stop the timer2 and return the remaining time
    if (stopImmediately) {
      stopTimer(); // Stop the timer2

      // Return the remaining time formatted as mm:ss
      let remainingMinutes = Math.floor(totalTime / 60);
      let remainingSeconds = totalTime % 60;
      updateDisplay(remainingMinutes, remainingSeconds);

      return `${remainingMinutes}:${remainingSeconds}`;
    }

    // Function to start the timer2 and update the display
    function start() {
      elapsedTime++;
      let remainingTime = totalTime + elapsedTime;

      if (remainingTime <= 0) {
        stopTimer();
        updateDisplay(0, 0); // Set timer2 to 00:00 when it reaches zero
      } else {
        let remainingMinutes = Math.floor(remainingTime / 60);
        let remainingSeconds = remainingTime % 60;
        updateDisplay(remainingMinutes, remainingSeconds);
      }
    }

    // Start the timer2 and update the display every second
    timer2 = setInterval(start, 1000); // Call start every second (1000ms)
  }
*/
  const [meetStart, setMeetStart] = useState(false);
  /*
  const logTimes = async (ID) => {
    console.log("DataEmp", ID);
    try {
      // Fetch the last update date from local storage (or API if needed)
      // let lastUpdateDate = localStorage.getItem("lastUpdateDate");

      // Call the API to get the latest log times
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/attendants/check-timeout/${ID}`
      );

      if (res.data && res.data[0]) {
        const logData = res.data[0];
        setTiming(logData); // Update the timing state with the data
        console.log("check-timeout", logData);

        // Check if a month has passed and update data if needed
        // if (!lastUpdateDate || hasMonthPassed(lastUpdateDate)) {
        //   console.log("A month has passed. Updating the log times...");
        //   await updateCreatelogTimes(logData); // Call the update function

        //   // Update the last update date
        //   localStorage.setItem("lastUpdateDate", new Date().toISOString());
        // }

        // Handle call timeout logic

        const {
          callCloseTimeStatus,
          callCloseTimeRemaining,
          createdAtRemaining,
          attendTimeStatus,
          createdAtStatus,
          timeFromCreatedToAttend,
          attendTimeRemaining,
        } = logData;
        console.log("createdAtRemaining", createdAtRemaining);
        console.log("callCloseTimeStatus", callCloseTimeStatus);

        if (createdAtStatus !== "timeout" && attendTimeStatus === "not set") {
          setcallCloseTimeRemaining(createdAtRemaining);

          AutostartTimer(createdAtRemaining);
        }
        if (attendTimeStatus === "remaining" && attendTimeRemaining) {
          console.log(123);
          handleCorrectClick("correct1", "cross1");
          setcallCloseTimeRemaining(timeFromCreatedToAttend);
          AutostartTimer(timeFromCreatedToAttend, true);
          AutostartTimer2(attendTimeRemaining);
          setTimer(attendTimeRemaining);
        }
        if (createdAtStatus === "timeout" && attendTimeStatus === "not set") {
          AutostartTimer("00:00", true);
        }
        console.log("callCloseTimeRemaining:", createdAtRemaining);
        console.log("callCloseTimeStatus:", callCloseTimeStatus);

        // Handle timer update
        if (callCloseTimeRemaining !== undefined) {
          setcallCloseTimeRemaining(createdAtRemaining);
          // setTimer(callCloseTimeRemaining); // Update timer based on the response
        } else {
          console.log("No valid callCloseTimeRemaining found");
          // setTimer("00:00"); // Default value if no remaining time found
        }
      } else {
        console.log("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching log times:", error); // Improve error logging
    }
  };
*/
  const updateCreatelogTimes = async (data) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/attendants/update-createlog-times/${DataEmp}/${upcomings[0]._id}`,
        data
      );
      setTimer(res.data);

      await logTimes(DataEmp);
      console.log(res.data);
    } catch (error) {
      console.log("Error updating create log times:", error);
    }
  };

  useEffect(() => {
    // Set up the interval to call logTimes every 10 seconds
    const intervalId = setInterval(() => {
      logTimes(DataEmp);
    }, 10000); // 10,000 milliseconds = 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [DataEmp]); // 10,000 milliseconds = 10 seconds

  // Watch for changes in Timing only, not Timing[0].callCloseTimeRemaining

  // useEffect(() => {
  //   updateCreatelogTimes();
  // }, []);
  const getData = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND
        }/api/customers/getCustomerV2/${clientIdData}`
      );
      setCustomerdata(res.data);
      console.log("customer data", customerdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log("customer data2", customerdata);
  }, [showPopupEdit]);

  // console.log("customer id", clientIdData)
  useEffect(() => {
    if (upcomings?.[0]) {
      setclientName(upcomings[0].ClientName);
      setProject(upcomings[0].ClientProject);
      setClientIdInfo(upcomings[0].ClientId);
    }
  }, [upcomings]);
  // console.log("done", callCloseTimeRemaining);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 lg:p-6 bg-custom-bg">
        <h1 className="text-xl lg:text-2xl font-bold flex items-center gap-1">
          Home
          <IoIosArrowForward className="text-black" />
          <span className="font-medium">Overview</span>
        </h1>
      </div>

      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-[#F7F3E8]">
        {/* Buttons for Mobile View */}
        <div className="flex justify-center mb-6 lg:hidden">
          <button
            className={`py-2 px-4 rounded-l-full ${
              activeSection === "appointments"
                ? "bg-[#3D2314] text-white"
                : "bg-white text-[#3D2314]"
            }`}
            onClick={() => handleSectionChange("appointments")}>
            Appointments
          </button>
          <button
            className={`py-2 px-4 rounded-r-full ${
              activeSection === "history"
                ? "bg-[#3D2314] text-white"
                : "bg-white text-[#3D2314]"
            }`}
            onClick={() => handleSectionChange("history")}>
            Client History
          </button>
        </div>

        {/* Tables for Large Devices */}
        <div className="hidden lg:block">
          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Upcoming Appointments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-[#D7D7D7]">
                  <tr>
                    <th className="py-2 px-2 text-left text-xs text-[#4B4B4B]">
                      Date
                    </th>
                    <th className="py-2 px-2 text-center text-xs text-[#4B4B4B]">
                      Customer ID
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#4B4B4B]">
                      Name
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#4B4B4B]">
                      Project Name
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#4B4B4B]">
                      Timer/Min
                    </th>
                    <th className="py-2 px-2 text-center text-xs text-[#4B4B4B]">
                      Start Time
                    </th>
                    <th className="py-2 px-2 text-center text-xs text-[#4B4B4B]">
                      End Time
                    </th>
                    <th className="py-2 px-4 text-left text-xs text-[#4B4B4B]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomings.map((value, i) => (
                    <tr key={i}>
                      <td className="py-2 px-4 text-xs">
                        {DateupdatedAt(value.createdAt)}
                      </td>
                      <td className="py-2 px-4 text-xs text-center text-[#000AFF] underline font-bold">
                        {value.ClientId}
                      </td>
                      <td className="py-2 px-4 text-xs">
                        <span className="bg-green-200 text-green-800 py-1 px-2 rounded text-xs">
                          New Client
                        </span>
                        <span className="ml-2">{value.ClientName}</span>
                      </td>
                      <td className="py-2 px-4 text-xs">
                        {value.ClientProject}
                      </td>
                      <td
                        className="py-2 px-4 text-xs font-semibold"
                        id="timer-display">
                        {/* 00:00 */}
                        {formatTime(timeLeft)}
                      </td>
                      <td
                        className="py-2 px-4 text-xs font-semibold text-center"
                        id="timer2-display">
                        {time === 0 ? "00 : 00" : formatTime(time)}
                      </td>
                      <td className="py-2 px-4 text-xs font-semibold text-center">
                        {EndCounter === 0 ? "00 : 00" : EndCounter}
                      </td>
                      <td className="py-2 px-4 text-xs">
                        <div className="flex justify-around">
                          <button
                            className="text-green-500 mr-2"
                            onClick={() => {
                              handleCorrectClick("correct1", "cross1");
                              updateCreatelogTimes({
                                attendTime: true,
                                callCloseTime: true,
                              });
                            }}>
                            {iconState.correct1 ? "✓" : ""}
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              if (iconState.correct1 === false) {
                                handleCrossClick("correct1", "cross1");
                              }
                            }}>
                            {iconState.cross1 ? (
                              <span
                                onClick={() => {
                                  rejectMeetingfun(IdEmp);
                                  updateCreatelogTimes({
                                    attendTime: false,
                                    callCloseTime: true,
                                  });
                                }}>
                                ✕
                              </span>
                            ) : (
                              <img
                                src={stopButton}
                                alt="Stop"
                                onClick={stopTime}
                              />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6 headLn">
          <div className="relative w-full max-w-2xl">
            <input
              className="w-full py-2 px-12 rounded-full shadow-md"
              type="text"
              value={valueinput}
              onChange={(e) => setvalueinput(e.target.value)}
              placeholder="Search"
            />
            <img
              src={Searchsvg}
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        {/* Client History */}
        <div style={{ textAlign: " -webkit-center" }} className="headLn">
          <div className="overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Client's History</h2>
            <div
              className="wrapperT"
              style={{ height: "120px", overflowY: "scroll" }}>
              <table className="w-full bg-white shadow-sm rounded-lg">
                <thead className="bg-[#E8E8E8] w-full">
                  <tr>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Name
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Customer ID
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Email
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Phone No.
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Property Interest
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Schedule Meeting
                    </th>
                    <th className="py-2 px-2 text-left text-xs text-[#5C5C5C]">
                      Status
                    </th>
                    <th className="py-2 px-4 text-left text-xs text-[#5C5C5C]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(({ ClientName }) =>
                      ClientName.toLowerCase().includes(
                        valueinput.toLowerCase()
                      )
                    )
                    .map((visitor, index) => (
                      <tr key={index}>
                        <td className="py-2 px-2 text-xs">
                          {visitor.ClientName}
                        </td>
                        <td className="py-2 px-2 text-xs">
                          <Link
                            to={`/SalesExecutive/Notes/IDHistory/${visitor.ClientId}`}
                            className="text-[#000AFF] underline font-bold">
                            {visitor.ClientId}
                          </Link>
                        </td>
                        <td className="py-2 px-2 text-xs">
                          {visitor.ClientEmail}
                        </td>
                        <td className="py-2 px-2 text-xs">
                          {visitor.ClientMobile}
                        </td>
                        <td className="py-2 px-2 text-xs">
                          {visitor.ClientProject}
                        </td>
                        <td className="py-2 px-2 text-xs">
                          {DateupdatedAt(visitor.createdAt)}
                        </td>
                        <td className="py-2 px-2 text-xs flex items-center ">
                          <span
                            className={`py-1 px-2 rounded  ${
                              visitor.completed === "completed"
                                ? "bg-[#E1F8D7] text-[#48A321]"
                                : visitor.completed === "notCompleted"
                                ? "bg-[#A321211A] text-[#A32121]"
                                : visitor.completed === "progress"
                                ? "bg-[lightyellow] text-[yellowgreen]"
                                : ""
                            }`}>
                            {visitor.completed === "notCompleted"
                              ? "Not completed"
                              : visitor.completed === "completed"
                              ? "Completed"
                              : visitor.completed === "progress"
                              ? "In Progress"
                              : ""}
                          </span>
                          <span className="ml-2">
                            {visitor.completed === "completed" ? (
                              <FaCheck className="text-[#48A321]" />
                            ) : visitor.completed === "notCompleted" ? (
                              <RxCross2 className="text-[#A32121]" />
                            ) : visitor.completed === "progress" ? (
                              <BsThreeDots className="text-[yellowgreen]" />
                            ) : null}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-xs">
                          <div className="flex space-x-2">
                            <img
                              src={edit}
                              alt="Edit"
                              className="cursor-pointer"
                              onClick={() => {
                                setShowPopupEdit(true);
                                setClientIdData(visitor.ClientId);
                              }}
                            />
                            <img
                              src={delt}
                              alt="Delete"
                              className="cursor-pointer"
                              onClick={() =>
                                handleDeleteClick(visitor.ClientId)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tables for Mobile Devices */}
        {activeSection === "appointments" && (
          <div className="lg:hidden h-full appointmenttable">
            {/* Upcoming Appointments */}
            <div
              className="tab4 h-full"
              style={{ textAlign: "-webkit-center" }}>
              <div className="mb-6  w-full h-full">
                <div className=" rounded-[12px]">
                  <div className="">
                    <div className="upcomingtb rounded-[12px]">
                      {upcomings.map((value, i) => (
                        <div key={i} className="mb-4">
                          {/* Timer Section */}
                          <div className="mb-4 p-4 bg-white px-[40px] py-[18px] rounded-lg shadow-sm">
                            <div className="header text-center mb-2">
                              <h3 className="text-[14px] text-[#888888] font-semibold">
                                Upcoming Client
                              </h3>
                            </div>
                            <div className="Timer w-[232px] h-[115px] bg-[#D7D7D7] flex justify-center items-center text-center mb-2 rounded-lg">
                              <span className="text-[53px] text-[#888888] font-bold">
                                {formatTime(timeLeft)}
                              </span>
                            </div>
                            <div className="flex justify-around mt-4">
                              <button
                                className="correct1 w-[102px] h-[44px] bg-[#CFF3C9] text-[#3A972B] rounded-lg font-semibold"
                                onClick={() =>
                                  handleCorrectClick("correct1", "cross1")
                                }>
                                ✓ Accept
                              </button>
                              <button
                                className="cross1 w-[102px] h-[44px] text-[#ED1111] bg-[#eecfcf] rounded-lg font-semibold"
                                onClick={stopTime}>
                                ✕ Decline
                              </button>
                            </div>
                          </div>
                          {/* Client Info Section */}
                          <div className="p-4 mt-4 bg-white rounded-lg shadow-sm">
                            <div className="flex justify-center items-center text-[14px] text-[#888888] mb-4 font-semibold">
                              Client Info
                            </div>
                            <table className="w-full border-collapse">
                              <tbody>
                                <tr>
                                  <th className="text-[#595757] bg-white p-[7px] text-[14px] border-[1px] border-[#E9E9E9] text-left whitespace-nowrap">
                                    Date
                                  </th>
                                  <td className="text-[#595757] p-[7px] text-[16px] border-[1px] border-[#E9E9E9] font-semibold text-left whitespace-nowrap">
                                    {DateupdatedAt(value.createdAt)}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-[#595757] bg-white p-[7px] text-[14px] border-[1px] border-[#E9E9E9] text-left whitespace-nowrap">
                                    Name
                                  </th>
                                  <td className="text-[#595757] p-[7px] text-[16px] border-[1px] border-[#E9E9E9] font-semibold text-left whitespace-nowrap">
                                    {value.ClientName}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-[#595757] bg-white p-[10px] text-[14px] border-[1px] border-[#E9E9E9] text-left whitespace-nowrap">
                                    Project
                                  </th>
                                  <td className="text-[#595757] p-[10px] text-[16px] border-[1px] border-[#E9E9E9] font-semibold text-left whitespace-nowrap">
                                    {value.ClientProject}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-[#595757] bg-white p-[10px] text-[14px] border-[1px] border-[#E9E9E9] text-left whitespace-nowrap">
                                    Start Time
                                  </th>
                                  <td className="text-[#595757] p-[10px] text-[16px] border-[1px] border-[#E9E9E9] font-semibold text-left whitespace-nowrap">
                                    {time === 0 ? "00 : 00" : formatTime(time)}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-[#595757] bg-white p-[10px] text-[14px] border-[1px] border-[#E9E9E9] text-left whitespace-nowrap">
                                    End Time
                                  </th>
                                  <td className="text-[#595757] p-[10px] text-[16px] border-[1px] border-[#E9E9E9] font-semibold text-left whitespace-nowrap">
                                    {EndCounter === 0 ? "00:00" : EndCounter}
                                  </td>
                                </tr>
                                <tr></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "history" && (
          <div className="lg:hidden">
            {/* Search Bar */}
            <div className="flex flex-row items-center justify-center">
              <div className="flex justify-center place-self-center items-center w-[100%] lg:w-[36rem] relative rounded-full">
                <input
                  className="w-full py-2 px-12 rounded-full h-[48px] lg:h-[48px] lg:w-[619px]"
                  style={{
                    boxShadow: "0px 0px 4px 0px #00000040",
                    padding: "12px 24px 12px 45px",
                    borderRadius: "27px",
                  }}
                  type="text"
                  value={valueinput}
                  onChange={(e) => setvalueinput(e.target.value)}
                  placeholder="Search"
                />
                <img
                  style={{ top: "0.9rem" }}
                  src={Searchsvg}
                  alt="Search"
                  className="absolute left-3"
                />
              </div>
            </div>

            {/* Client's History */}
            <div style={{ textAlign: " -webkit-center" }}>
              <div className="w-auto mt-4">
                <h2
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "24.59px",
                    color: "#2B2B2B",
                  }}
                  className="text-lg font-semibold mb-2 text-justify">
                  Client's History
                </h2>
                <div className="wrapperT h-[460px] overflow-x-auto">
                  <table className="w-[1323px]  bg-white shadow-sm rounded-lg ">
                    <thead
                      style={{
                        background: "#E8E8E8E8",
                      }}>
                      <tr>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            textAlign: "left",
                            color: "#5C5C5C",
                            textAlign: "center",
                          }}
                          className="py-2 px-4 text-left th1">
                          Name
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            textAlign: "left",
                            color: "#5C5C5C",
                            textAlign: "center",
                          }}
                          className="py-2 px-4 text-left th1">
                          Email
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            color: "#5C5C5C",
                            textAlign: "center",
                          }}
                          className="py-2 px-4 text-left th1">
                          Phone No.
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            textAlign: "center",
                            color: "#5C5C5C",
                          }}
                          className="py-2 px-4 text-left th1">
                          Property Interest
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            textAlign: "center",
                            color: "#5C5C5C",
                          }}
                          className="py-2 px-4 text-left th1">
                          Schedule Meeting
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            textAlign: "center",
                            color: "#5C5C5C",
                          }}
                          className="py-2 px-4 text-left th1">
                          Status
                        </th>

                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.12px",
                            textAlign: "center",
                            color: "#5C5C5C",
                          }}
                          className="py-2 px-4 text-left th1">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "21.86px",
                        color: "#2B2B2B",
                        textAlign: "center",
                        padding: "10px",
                      }}>
                      {data
                        .filter(({ ClientName }) =>
                          ClientName.toLowerCase().includes(
                            valueinput.toLowerCase()
                          )
                        )
                        .map((visitor, index) => (
                          <tr key={index} style={{ height: "48px" }}>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-4">
                              {visitor.ClientName}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-4">
                              {visitor.ClientEmail}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-4">
                              {visitor.ClientMobile}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-4">
                              {visitor.ClientProject}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-2">
                              {DateupdatedAt(visitor.createdAt)}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-2 flex flex-wrap justify-between">
                              <span
                                style={{ borderBottom: "1px solid #E4E7EC" }}
                                className={`rounded ${
                                  visitor.completed === "completed"
                                    ? "bg-[#E1F8D7] text-[#48A321] py-2 px-2 rounded"
                                    : visitor.completed === "notCompleted"
                                    ? "bg-[#A321211A] text-[#A32121] py-1 px-2 rounded"
                                    : visitor.completed === "progress"
                                    ? "bg-[lightyellow] text-[yellowgreen] py-1 px-2 rounded"
                                    : ""
                                }`}>
                                {visitor.completed === "notCompleted"
                                  ? "Not completed"
                                  : visitor.completed === "completed"
                                  ? "Completed"
                                  : visitor.completed === "progress"
                                  ? "In Progress"
                                  : ""}
                              </span>
                              <span style={{ alignContent: "center" }}>
                                {visitor.completed === "completed" ? (
                                  <FaCheck style={{ color: "#48A321" }} />
                                ) : visitor.completed === "notCompleted" ? (
                                  <RxCross2 style={{ color: "#A32121" }} />
                                ) : visitor.completed === "progress" ? (
                                  <BsThreeDots
                                    style={{ color: "yellowgreen" }}
                                  />
                                ) : (
                                  ""
                                )}
                              </span>
                            </td>

                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-4">
                              <button className="text-green-500 mr-4 correct1">
                                <img src={eyes} alt="View" />
                              </button>
                              <button className="text-blue-500 mr-4">
                                <img src={edit} alt="Edit" />
                              </button>
                              <button className="text-red-500">
                                <img src={delt} alt="Delete" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showAddNotePopup && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            ref={addNotePopupRef}
            className="fixed inset-0 flex items-center justify-center z-50">
            <div className="add-team-members w-[688px] h-auto p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[664px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => {
                  setShowAddNotePopup(false);
                }}>
                X
              </button>
              <input
                type="text"
                value={clientName || upcomings?.[0]?.ClientName}
                onChange={(e) => setclientName(e.target.value)}
                className="w-[640px] h-12 mb-4"
                placeholder="Client Name"
                style={{
                  color: "rgba(0, 0, 0, 0.68)",
                  fontWeight: 400,
                  fontSize: "16px",
                  padding: "16px 24px",
                  lineHeight: "19.2px",
                  fontFamily: "Manrope",
                  gap: "10px",
                  border: "0.8px solid rgba(0,0,0,0.44) ",
                  borderRadius: "6px",
                }}
              />
              <input
                type="text"
                value={project || upcomings?.[0]?.ClientProject}
                onChange={(e) => setProject(e.target.value)}
                className="w-[640px] h-12 mb-4"
                placeholder="Client Name"
                style={{
                  color: "rgba(0, 0, 0, 0.68)",
                  fontWeight: 400,
                  fontSize: "16px",
                  padding: "16px 24px",
                  lineHeight: "19.2px",
                  fontFamily: "Manrope",
                  gap: "10px",
                  border: "0.8px solid rgba(0,0,0,0.44) ",
                  borderRadius: "6px",
                }}
              />
              {/* <div
                className="relative w-[640px] h-[48px]   mb-4 block   focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                style={{
                  color: "rgba(0, 0, 0, 0.68)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "19.2px",
                  fontFamily: "Manrope",
                  gap: "10px",
                  border: "0.8px solid rgba(0,0,0,0.44) ",
                  borderRadius: "6px",
                }}
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                ref={projectDropdownRef}>
                <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                  {project || "Choose Project"}
                  <img
                    className="ml-2 h-2 w-3 "
                    src={DropIcon}
                    alt="Dropdown Icon"
                  />
                </div>
              </div> */}

              <div
                style={{
                  padding: "16px 24px",
                  width: "640px",
                  height: "127px",
                  color: "rgba(0, 0, 0, 0.68)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "19.2px",
                  fontFamily: "Manrope",
                  gap: "10px",
                  border: "0.8px solid rgba(0,0,0,0.44) ",
                  borderRadius: "6px",
                }}
                className="rounded-md border border-gray-300 font-manrope  div2 mb-4">
                <textarea
                  type="text"
                  placeholder="Add your Briefing"
                  style={{
                    border: "none",
                    overflowY: "scroll",
                    outline: "none",
                    width: "600px",
                    height: "100px",
                    fontWeight: 400,
                  }}
                  onChange={(e) => setBriefing(e.target.value)}
                />
              </div>

              <div
                style={{ padding: "16px 24px" }}
                className="rounded-md border mb-4 border-gray-300 font-manrope flex flex-wrap w-[640px] h-[51px] justify-between">
                <div
                  style={{
                    color: "rgba(0, 0, 0, 0.68)",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "19.2px",
                    fontFamily: "Manrope",
                  }}>
                  Client Conversation
                </div>
                <div className="flex flex-wrap">
                  <label
                    className="mr-2"
                    style={{
                      color: "rgba(0, 0, 0, 0.68)",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "19.2px",
                      fontFamily: "Manrope",
                    }}>
                    <input
                      className="mr-2 custom-radio"
                      type="radio"
                      name="Yes"
                      value="Yes"
                      checked={clientConversation === "Yes"}
                      onChange={handleOptionChange}
                    />
                    Yes
                  </label>
                  <label
                    className="mr-2"
                    style={{
                      color: "rgba(0, 0, 0, 0.68)",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "19.2px",
                      fontFamily: "Manrope",
                    }}>
                    <input
                      className="mr-2 custom-radio"
                      type="radio"
                      name="No"
                      value="No"
                      checked={clientConversation === "No"}
                      onChange={handleOptionChange}
                    />
                    No
                  </label>
                  <label
                    className="mr-2"
                    style={{
                      color: "rgba(0, 0, 0, 0.68)",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "19.2px",
                      fontFamily: "Manrope",
                    }}>
                    <input
                      className="mr-2 custom-radio"
                      type="radio"
                      name="Tentative"
                      value="Tentative"
                      checked={clientConversation === "Tentative"}
                      onChange={handleOptionChange}
                    />
                    Tentative
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="create-team-btn h-12 p-[10px] bg-[#3D2314] rounded-[4px] text-center font-manrope text-lg font-medium text-white"
                disabled={isCreating}>
                {createStatus || "Add Note"}
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        </>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="Delete-popup w-[257px] h-[192px] py-[12px] px-[24px] rounded-md bg-white shadow-md z-50 flex items-center justify-center">
            <div className="text-center">
              <p className="font-manrope text-[20px] font-medium">
                Are you sure you want to delete this row?
              </p>
              <p className="font-manrope text-[12px] font-medium text-[#6A6A6A] mt-2">
                This action cannot be undone.
              </p>
              <div className="delete-cont ml-1 flex justify-center items-center w-[197px] h-[33px] gap-6 mt-4">
                <button
                  className="w-[85px] h-[33px] p-2.5 bg-[#FFD9D9] rounded-md text-[#C71212] flex items-center justify-center"
                  onClick={confirmDelete}>
                  Delete
                </button>
                <button
                  className="w-[85px] h-[33px] p-2.5 rounded-md border border-black flex items-center justify-center"
                  onClick={() => setDeleteShowPopup(false)}>
                  Cancel
                </button>
              </div>
              <p className="font-manrope text-[12px] text-[#6A6A6A] font-medium text-center mt-2">
                Select "Delete" to confirm.
              </p>
            </div>
          </div>
        </div>
      )}

      {showPopupEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            ref={popupRef}
            className="popup-container w-[581px] h-fit p-6 gap-6 rounded-lg bg-white flex flex-col items-center z-50">
            <button
              className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[572px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
              onClick={() => setShowPopupEdit(false)}>
              X
            </button>

            <input
              type="text"
              className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg "
              placeholder="Client Name"
              value={customerdata?.name || customerdata?.customerName || ""}
              onChange={(e) => setClientName2(e.target.value)}
            />

            <input
              type="text"
              className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg "
              placeholder="Choose Project"
              value={
                customerdata?.projectName || customerdata?.projectName || ""
              }
              onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
              className="project-address-input w-[533px] min-h-[134px] p-4 rounded-md border border-gray-300 "
              style={{
                fontFamily: "Manrope",
                fontWeight: "400",
                fontSize: "16px",
                color: "#000000",
              }}
              placeholder="Add your Briefing"
              value={briefing2}
              name="notes"
              onChange={(e) => setBriefing2(e.target.value)}
            />
            <button
              onClick={handleSubmit2}
              className="`justify-between create-team-btn flex flex-wrap  h-[44px] p-[10px] bg-[#3D2314] justify-around rounded-[4px]  font-manrope text-lg font-medium text-white"
              disabled={isCreating2}>
              <img src={edit2} />
              {isCreating ? createStatus2 : "Edit Note"}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetails;


