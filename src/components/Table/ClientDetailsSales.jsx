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
import axios from "axios";
import { format } from "date-fns";
import eyes from "../../assets/eyes.png";
import view from "../../assets/hugeicons_view (1).png";
import edit from "../../assets/akar-icons_edit (2).png";
import delt from "../../assets/material-symbols_delete-outline.png";
import edit2 from "../../assets/akar-icons_edit (3).png";
import { Link } from "react-router-dom";

function ClientDetails() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [data, setdata] = useState([]);
  const [upcomings, setupcoming] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const [timeLeft, setTimeLeft] = useState(300000);
  const [timerActive, setTimerActive] = useState(true);
  const [time, setTime] = useState(0);
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

  const fetchData = async () => {
    setLoading(true);

    const res2 = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/projects`
    );
    setdata2(res2.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
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

  const [clientName, setclientName] = useState(
    upcomings?.[0]?.ClientName || ""
  );
  const [project, setProject] = useState(upcomings?.[0]?.ClientProject || "");
  const [briefing, setBriefing] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // state for error message
  const [timeResponseStart, settimeResponseStart] = useState(""); // state for error message

  const handleProjectChange = (projectName) => {
    setProject(projectName);
    setIsProjectDropdownOpen(false);
  };

  // useEffect(() => {
  //   const EmpId = localStorage.getItem("EmpId");
  //   setClientID(EmpId);
  // }, []);

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
        setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0));
      }, 1000);

      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      // Timer expired
      console.log("Rejecting");
      console.log(Date.now());
      setTimerActive(false);
    }
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (isActive) {
      // Start the timer
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
      setIntervalId(id);
    } else {
      // Stop the timer
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

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
        <p className="text-sm text-gray-600 mb-2">{note.date}</p>
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
      console.log("setupcoming", res.data);
      const currentDate = new Date();
      const formattedDate = format(currentDate, "mm:ss");
      setRes(formattedDate);
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
    } catch (error) {
      console.log(error);
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

  const TimeCal = async (StartDateTime, EndDateTime) => {
    console.log("StartDateTime.......", StartDateTime);
    console.log("EndDateTime.......", EndDateTime);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/timeSheet/timeline/${ClientID}`,
        {
          StartTime: StartDateTime,
          EndTime: EndDateTime,
        }
      );
      setCalRes("response", res);
      console.log("response", ClientID);
    } catch (error) {
      console.log(error);
    }
  };

  const timeResponse = async () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "mm:ss");
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND
        }/api/timeSheet/timeResponse/${ClientID}`,
        {
          StartTime: resstart,
          EndTime: formattedDate,
        }
      );
      setCalRes("response", res);
      console.log("response", ClientID);
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

  useEffect(() => {
    historyData(IdEmp);
    upcoming(IdEmp);
  }, [IdEmp]);

  useEffect(() => {
    if (upcomings.length > 0) {
      setClientID(upcomings[0]?.ClientId);
    }
  }, [upcomings]);

  const [clientConversation, setclientConversation] = useState("");

  const handleOptionChange = (event) => {
    setclientConversation(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(
      clientName,

      upcomings?.[0]?.ClientName,
      "&&",
      upcomings?.[0]?.ClientProject,
      project,
      "&&",
      briefing,
      "&&",
      clientConversation
    );
    if (
      upcomings?.[0]?.ClientName &&
      upcomings?.[0]?.ClientProject &&
      briefing &&
      clientConversation
    ) {
      setIsCreating(true);
      setErrorMessage(""); // Clear any previous error messages
      console.log("Come");
      ClientDetails(upcomings[0].ClientId, IdEmp);

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
        clientName: upcomings?.[0]?.ClientNamentName,
        project: upcomings?.[0]?.ClientProject,
        briefing: briefing,
        clientConversation: clientConversation,
      };

      try {
        setCreateStatus("Note Successfully Added ✓");
        console.log("Response send", notedata);
        historyData(IdEmp);
        upcoming(IdEmp);
      } catch (error) {
        console.error("Error creating Note:", error);
        setCreateStatus("Error Creating Note");
      } finally {
        setIsCreating(false);
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  // console.log("clientConversation", clientConversation);

  //Delete PopUp
  const [showDeletePopup, setDeleteShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDeleteClick = (ClientId) => {
    setDeleteId(ClientId);
    setDeleteShowPopup(true);
  };
  const confirmDelete = async () => {
    await axios.delete(
      `${
        import.meta.env.VITE_BACKEND
      }/api/clientManagement/deleteHistory/${IdEmp}/${deleteId}`
    );
    setDeleteShowPopup(false);
    fetchData();
  };

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
                    <th className="py-2 px-4 text-left text-sm text-[#4B4B4B]">
                      Date
                    </th>
                    <th className="py-2 px-4 text-center text-sm text-[#4B4B4B]">
                      Customer ID
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#4B4B4B]">
                      Name
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#4B4B4B]">
                      Project Name
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#4B4B4B]">
                      Timer/Min
                    </th>
                    <th className="py-2 px-4 text-center text-sm text-[#4B4B4B]">
                      Start Time
                    </th>
                    <th className="py-2 px-4 text-center text-sm text-[#4B4B4B]">
                      End Time
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#4B4B4B]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomings.map((value, i) => (
                    <tr key={i}>
                      <td className="py-2 px-4 text-sm">
                        {DateupdatedAt(value.createdAt)}
                      </td>
                      <td className="py-2 px-4 text-sm text-center text-[#000AFF] underline font-bold">
                        ROF001
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <span className="bg-green-200 text-green-800 py-1 px-2 rounded text-xs">
                          New Client
                        </span>
                        <span className="ml-2">{value.ClientName}</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        {value.ClientProject}
                      </td>
                      <td className="py-2 px-4 text-sm font-semibold">
                        {formatTime(timeLeft)}
                      </td>
                      <td className="py-2 px-4 text-sm font-semibold text-center">
                        {time === 0 ? "00 : 00" : formatTime(time)}
                      </td>
                      <td className="py-2 px-4 text-sm font-semibold text-center">
                        {EndCounter === 0 ? "00 : 00" : EndCounter}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <div className="flex justify-around">
                          <button
                            className="text-green-500 mr-2"
                            onClick={() =>
                              handleCorrectClick("correct1", "cross1")
                            }>
                            {iconState.correct1 ? (
                              "✓"
                            ) : (
                              <img src={backButtton} alt="Back" />
                            )}
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              if (iconState.correct1 === false) {
                                handleCrossClick("correct1", "cross1");
                              }
                            }}>
                            {iconState.cross1 ? (
                              <span onClick={() => rejectMeetingfun(IdEmp)}>
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
        <div className="flex justify-center mb-6">
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
            <div className="wrapperT">
              <table className="w-full bg-white shadow-sm rounded-lg">
                <thead className="bg-[#E8E8E8]">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Name
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Customer ID
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Email
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Phone No.
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Property Interest
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Schedule Meeting
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
                      Status
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-[#5C5C5C]">
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
                        <td className="py-2 px-4 text-sm">
                          {visitor.ClientName}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          <Link
                            to={`/SalesExecutive/Notes/IDHistory/${visitor.ClientId}`}
                            className="text-[#000AFF] underline font-bold">
                            {visitor.ClientId}
                          </Link>
                        </td>
                        <td className="py-2 px-4 text-sm">
                          {visitor.ClientEmail}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          {visitor.ClientMobile}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          {visitor.ClientProject}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          {DateupdatedAt(visitor.createdAt)}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          <span
                            className={`py-1 px-2 rounded ${
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
                        <td className="py-2 px-4 text-sm">
                          <div className="flex space-x-2">
                            <img
                              src={view}
                              alt="View"
                              className="cursor-pointer"
                            />
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
                  <table className="w-[1323px]  bg-white shadow-sm rounded-lg">
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
                              className="py-4 px-4">
                              {DateupdatedAt(visitor.createdAt)}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #E4E7EC" }}
                              className="py-4 px-4 flex flex-wrap justify-between">
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
                onClick={() => setShowAddNotePopup(false)}>
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
