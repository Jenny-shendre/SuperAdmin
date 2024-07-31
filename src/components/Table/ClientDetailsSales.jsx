import React, { useEffect, useState } from "react";
import "../Home.css";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { IoIosArrowForward } from "react-icons/io";
import notify from "../../assets/add_notes (black).png";
import backButtton from "../../assets/back-button.png";
import stopButton from "../../assets/stop-button.png";
import axios from "axios";
import { format } from "date-fns";

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
  const [ClientID, setClientID] = useState();

  const [IdEmp, setIdEmp] = useState("ROFEX1");
  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setClientID(EmpId);
  }, []);
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

  const handleClick = () => {
    stopTimer();
    startTimer();
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
        `https://project-rof.vercel.app/api/clientManagement/history/${employeeId}`
      );
      setdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const upcoming = async (employeeId) => {
    try {
      const res = await axios.get(
        `https://project-rof.vercel.app/api/clientManagement/upcoming/${employeeId}`
      );
      setupcoming(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const TimeCal = async () => {
    try {
      const res = await axios.put(
        `https://project-rof.vercel.app/api/timeSheet/timeline`,
        {
          StartTime: StartDateTime,
          EndTime: EndDateTime,
          customerId: ClientID,
        }
      );
      setupcoming(res.data);
      console.log("response", ClientID);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    historyData(IdEmp);
    upcoming(IdEmp);
    // setClientID(upcomings[0]?.ClientId);
    setClientID(upcomings[0]?.ClientId);
  }, []);

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
    console.log("END", formattedDate);
    TimeCal();
  };

  return (
    <div>
      <div
        style={{ gap: "20px", paddingTop: "30px" }}
        className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg">
        <h1
          className="font-bold flex items-center gap-1"
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
            color: "black",
          }}>
          Home
          <IoIosArrowForward style={{ color: "black" }} />
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "24px",
              color: "black",
            }}
            className="font-medium">
            Client Managment
          </span>
        </h1>
      </div>

      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-[#F7F3E8]">
        <div style={{ textAlign: "-webkit-center" }}>
          <div className="mb-6 w-[964px]">
            <h2
              style={{
                textAlign: "justify",
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "24.59px",
              }}
              className="text-lg font-semibold mb-2">
              Upcoming Appointments
            </h2>
            <div className="wrapperD rounded-[12px]">
              <div className="wrapperD-outer">
                <table className="w-full bg-white rounded-[12px]">
                  <thead className=" bg-[#D7D7D7]">
                    <tr>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                        }}
                        className="py-2 px-4 text-left th1">
                        Date
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                        }}
                        className="py-2 px-4 text-left">
                        Client
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                        }}
                        className="py-2 px-4 text-left">
                        Project Name
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                          width: "85px",
                        }}
                        className="py-2 px-4 text-left">
                        Time Left
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                          textAlign: "center",
                        }}
                        className="py-2 px-4 ">
                        Start Time
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                          textAlign: "center",
                        }}
                        className="py-2 px-4 ">
                        End Time
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                        }}
                        className="py-2 px-4 text-left">
                        Notes
                      </th>
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
                          color: "#4B4B4B",
                        }}
                        className="py-2 px-4 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomings.map((value, i) => (
                      <tr>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                          }}
                          className="py-2 px-2">
                          {DateupdatedAt(value.createdAt)}
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                            alignContent: "center",
                            alignItems: "center",
                          }}>
                          <span className="bg-green-200 text-green-800 py-1 px-2 rounded">
                            New Client
                          </span>
                          <span style={{ color: "#5C5C5C", fontSize: "18px" }}>
                            {value.ClientName}
                          </span>
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            textAlign: "center",
                          }}
                          className="py-2 px-2">
                          {" "}
                          {value.ClientProject}
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            textAlign: "center",
                          }}
                          className="py-2 px-2">
                          {formatTime(timeLeft)}
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            textAlign: "center",
                          }}
                          className="py-2 px-2">
                          {time === 0 ? "00 : 00" : formatTime(time)}
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            textAlign: "center",
                          }}
                          className="py-2 px-2">
                          {EndCounter === 0 ? "00 : 00" : EndCounter}
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            textAlign: "-webkit-center",
                          }}
                          className="py-2 px-2">
                          <img
                            src={notify}
                            onClick={() =>
                              togglePopup({
                                name: "Kapil Verma",
                                date: "26 June | 5:33 PM",
                                content:
                                  "Discussed budget and preferred location. Client is interested in a 2-bedroom condo in a central area with easy access to public transportation. Suggested scheduling a property tour for next week.",
                              })
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                        <td
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                            color: "#5C5C5C",
                            borderBottom: "1px solid #E4E7EC",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                          className="py-2 px-2">
                          <button
                            className="text-green-500 mr-2 correct1"
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
                            className="text-red-500 cross1"
                            onClick={() =>
                              iconState.correct1 === false &&
                              handleCrossClick("correct1", "cross1")
                            }>
                            {iconState.cross1 ? (
                              "✕"
                            ) : (
                              <img
                                src={stopButton}
                                onClick={() => endTimer()}
                                alt="Stop"
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* <tr>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                        }}
                        className="py-2 px-2">
                        26 June | 5:33 PM
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          display: "flex",
                          justifyContent: "space-between",
                          textAlign: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}>
                        <span className="bg-[#EBEE5D] text-[#9E932A]  rounded px-[8px] py-[4px]">
                          Existing
                        </span>
                        <span style={{ color: "#5C5C5C", fontSize: "18px" }}>
                          Suraj Tiwari
                        </span>
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          textAlign: "center",
                        }}
                        className="py-2 px-2">
                        Project Arisyas
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "600",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          textAlign: "center",
                        }}
                        className="py-2 px-2">
                        05 : 00
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          textAlign: "center",
                        }}
                        className="py-2 px-2">
                        -
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          textAlign: "center",
                        }}
                        className="py-2 px-2">
                        -
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          textAlign: "-webkit-center",
                        }}
                        className="py-2 px-2">
                        <img
                          src={notify}
                          onClick={() =>
                            togglePopup({
                              name: "Kapil Verma",
                              date: "26 June | 5:33 PM",
                              content:
                                "Discussed budget and preferred location. Client is interested in a 2-bedroom condo in a central area with easy access to public transportation. Suggested scheduling a property tour for next week.",
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21.86px",
                          color: "#5C5C5C",
                          borderBottom: "1px solid #E4E7EC",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                        className="py-2 px-2">
                        <button
                          className="text-green-500 mr-2 correct2"
                          onClick={() =>
                            handleCorrectClick("correct2", "cross2")
                          }>
                          {iconState.correct2 ? (
                            "✓"
                          ) : (
                            <img src={backButtton} alt="Back" />
                          )}
                        </button>
                        <button
                          className="text-red-500 cross2"
                          onClick={() =>
                            iconState.correct2 === false &&
                            handleCrossClick("correct2", "cross2")
                          }>
                          {iconState.cross2 ? (
                            "✕"
                          ) : (
                            <img src={stopButton} alt="Stop" />
                          )}
                        </button>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="flex flex-row items-center justify-center ml-96">
          <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full  mr-96 ">
            <input
              className="w-full py-2 px-12 rounded-full h-[48px]"
              style={{
                boxShadow: " 0px 0px 4px 0px #00000040",
                width: "619px",
                height: "48px",
                padding: "12px 24px 12px 45px",
                gap: "24px",
                borderRadius: "27px",
                opacity: "0px",
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

        <br />
        <div style={{ textAlign: " -webkit-center" }}>
          <div className="w-[1088px] ">
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
            <div className="wrapperT">
              <table className="w-full bg-white shadow-sm rounded-lg">
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
                      Meeting Status
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
                  }}>
                  {data
                    .filter(({ ClientName }) =>
                      ClientName.toLowerCase().includes(
                        valueinput.toLowerCase()
                      )
                    )
                    .map((visitor, index) => (
                      <tr>
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
                            className="bg-[#E1F8D7] text-[#48A321] py-1 px-2 rounded">
                            {visitor.completed}
                          </span>

                          <span>
                            <button className="text-[#48A321] mr-2">✓</button>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {showPopup && (
        <NotePopup note={currentNote} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default ClientDetails;