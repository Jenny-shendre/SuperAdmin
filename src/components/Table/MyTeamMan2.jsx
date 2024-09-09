import React, { useEffect, useState, useCallback, useRef } from "react";
import "../Home.css";
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { CgNotes } from "react-icons/cg";
import { IoCheckmarkOutline } from "react-icons/io5";
import close from "../../assets/close.png";
import axios from "axios";
import { format, isValid } from "date-fns";
import Loading from "../Loding/Loding";
import { FiEye } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

function ClientHistory() {
  const [data, setData] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const [showNotePopup, setShowNotePopup] = useState(false);

  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedExecutive, setSelectedExecutive] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  //vb
  const truncateText = (text, limit = 10) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text || "";
  };

  const notePopupRef = useRef();
  const addNotePopupRef = useRef();

  const dropdownRef = useRef();
  const projectDropdownRef = useRef(); // ref for project dropdown

  // const [data2, setdata] = useState([]);
  const pathname = location.pathname;
  // const employeeId = decodeURIComponent(
  //   pathname.substring(pathname.lastIndexOf("/") + 1)
  // );
  // console.log(employeeId);

  const pathSegments = pathname.split("/");
  const employeeId = decodeURIComponent(pathSegments[3]); // Assuming 'teamName' is at index 3
  // const employeeId = decodeURIComponent(pathSegments[4]); // Assuming 'employeeId' is at index 4

  // console.log("teamName", teamName);
  console.log("employeeId", employeeId);

  const handleOutsideClick = (event) => {
    if (
      addNotePopupRef.current &&
      !addNotePopupRef.current.contains(event.target)
    ) {
      setShowAddNotePopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const callApi = async (employeeId) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/history/${employeeId}`
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi(employeeId);
  }, []);

  console.log("data", data);

  const DateupdatedAt = (date) => {
    const parsedDate = new Date(date);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd MMM | hh:mm a");
    } else {
      return "Invalid Date";
    }
  };

  const onNoteIconClick = (item) => {
    //console.log("Selected Visitor:", client.ClientProject);
    setSelectedClient(item);
    setShowAddNotePopup(true);
  };

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            style={{ gap: "20px", paddingTop: "30px", fontFamily: "Manrope" }}
            className="headLn p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;
        ">
            <h1
              className="font-bold flex items-center gap-1 font-[Manrope]"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <Link to="/SalesManager/My_Team">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "24px",
                  }}
                  className="font-medium font-[Manrope]">
                  My Team
                </span>
              </Link>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "24px",
                }}
                className="font-medium font-[Manrope]">
                Shahrukh
              </span>
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center font-[Manrope]">
            <div className="mt-6 flex justify-start items-center lg:block relative lg:w-[36rem] rounded-full">
              <input
                className="searchBox w-full rounded-full "
                style={{
                  width: "619px",
                  height: "48px",
                  fontFamily: "Manrope",
                  padding: "12px 24px 12px 48px",
                  gap: "24px",
                  borderRadius: "27px",
                  opacity: "0px",

                  boxShadow: " 0px 0px 4px 0px #00000040",
                }}
                type="text"
                value={valueinput}
                onChange={(e) => setvalueinput(e.target.value)}
                placeholder="Search"
              />
              <img
                style={{ top: "0.8rem" }}
                src={Searchsvg}
                alt="Search"
                className="absolute left-4"
              />
            </div>
          </div>

          <main className=" overflow-x-hidden overflow-y-auto p-6 font-[Manrope]">
            <div
              style={{ textAlign: "-webkit-center" }}
              className="outer-wrapperB tableDiv">
              <table className="w-[1170px] h-auto bg-white shadow-md wrapper-b overflow-hidden font-[Manrope]">
                <div className="outer-wrapper">
                  <div className="table-wrapper">
                    {/* <div className="table-wrapperB"> */}
                    <thead className=" font-[Manrope]">
                      <tr className="text-center text-[#4B4B4B] h-[36px] font-[Manrope]">
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "190px",
                          }}
                          className="px-4 py-2 ">
                          Name
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "171px",
                          }}
                          className="px-4 py-2">
                          Customer ID
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "109px",
                          }}
                          className="px-4 py-2">
                          Email
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "171px",
                          }}
                          className="px-4 py-2">
                          Phone No
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "130px",
                          }}
                          className="px-4 py-2">
                          Property Intrest
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "188px",
                          }}
                          className="px-4 py-2">
                          Meeting Date
                        </th>
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            color: "#4B4B4B",
                            width: "187px",
                          }}
                          className="px-4 py-2 ">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="font-[Manrope] ">
                      {data
                        .filter(
                          ({
                            ClientName,
                            ClientId,
                            ClientEmail,
                            ClientMobile,
                            ClientProject,
                            createdAt,
                          }) =>
                            ClientName?.toLowerCase().includes(
                              valueinput.toLowerCase()
                            ) ||
                            ClientId?.toLowerCase().includes(
                              valueinput.toLowerCase()
                            ) ||
                            ClientMobile?.toLowerCase().includes(
                              valueinput.toLowerCase()
                            ) ||
                            ClientProject?.toLowerCase().includes(
                              valueinput.toLowerCase()
                            ) ||
                            DateupdatedAt(createdAt)
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            ClientEmail?.toLowerCase().includes(
                              valueinput.toLowerCase()
                            )
                        )
                        .map((item, index) => (
                          <tr
                            className="text-[#5C5C5C] text-center border-b"
                            key={item}>
                            <td
                              className="px-4 py-2 max-w-[150px] overflow-hidden"
                              style={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                lineHeight: "19px",
                                color: "#5C5C5C",
                              }}
                              title={item.ClientName}>
                              {item.ClientName}
                            </td>

                            <td
                              className="px-4 py-2 max-w-[150px] overflow-hidden"
                              style={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                lineHeight: "19px",
                                color: "#5C5C5C",
                              }}
                              title={item.ClientId}>
                              <Link
                                to={`/SalesManager/IDMan/${item.ClientId}`}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                  fontFamily: "Manrope",
                                  fontWeight: "700",
                                }}>
                                {item.ClientId}
                              </Link>
                            </td>

                            <td
                              className="px-4 py-2 max-w-[150px] overflow-hidden "
                              style={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                lineHeight: "19px",
                                color: "#5C5C5C",
                              }}>
                              {item.ClientEmail}
                            </td>

                            <td
                              className="px-4 py-2 text-[#000000] "
                              style={{ fontWeight: "300" }}>
                              {" "}
                              {item.ClientMobile}
                            </td>
                            <td
                              className="px-2 py-2 max-w-[150px] overflow-hidden"
                              title={
                                item.executiveName?.length > 0
                                  ? item?.executiveName
                                  : "Not found"
                              }>
                              {item.ClientProject}
                            </td>
                            <td className="px-2 py-2 ">
                              {DateupdatedAt(item.createdAt)}
                            </td>
                            <td className="py-2 px-4 text-sm flex items-center justify-start gap-3">
                              <span 
                              className={`py-1 px-2 rounded w-[87px] h-[24px] gap-[8px] ${
                              item.completed === "completed" 
                              ? "bg-[#E1F8D7] text-[#48A321] font-[12px]"
                              : item.completed === "notCompleted" 
                              ? "bg-[#A321211A] text-[#A32121] w-[110px] text-[12px]"
                              : item.completed === "progress"
                              ? "bg-[lightyellow] text-[yellowgreen]"
                              : ""
                             }`}>
                              {item.completed === "notCompleted"
                              ? "Not Completed"
                              : item.completed === "completed"
                              ? "Completed"
                              : item.completed === "progress"
                              ? "In Progress"
                              : ""}
                             </span>

                             <span className="ml-2">
                              {item.completed === "completed" ? (
                                <FaCheck className="text-[#48A321]" />
                              ) : item.completed === "notCompleted" ? (
                                <RxCross2 className="text-[#A32121]" /> 
                              ) : item.completed === "progress" ? (
                                <BsThreeDots className="text-[yellowgreen]" />
                              )  : null}
                              
                              </span> 
                            </td>
                           
                            {/* // <div
                              className="flex justify-center items-center"
                              style={{ alignContent: "center" }}>
                              {item.accepted === "completed" ?  (
                                <span className="bg-green-200 text-green-800 py-1 px-2 rounded text-xs"></span>
                              // ) : item.accepted === "pending" ? (
                              //   <FaCheck className="text-[#48A321]" />
                              ) : item.accepted === "Not completed" ? (
                                <RxCross2 className="text-[#A32121]" />
                              ) : (
                                <span className="text-[#000000] mt-2">
                                  {item.completed}
                                  {item.NotCompleted}
                                </span>
                                
                              )}                            
                            </div> */}
                          </tr>
                        ))}
                    </tbody>
                    </div>
                  </div>
                {/* </div> */}
              </table>
            </div>
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
                    value={selectedClient.executiveName || "Not Found"}
                    onChange={() => {}}
                    className="w-[640px] h-12 mb-4"
                    placeholder="Sales Executive Name"
                    style={{
                      color: "rgba(0, 0, 0, 0.68)",
                      fontWeight: 400,
                      fontSize: "16px",
                      padding: "16px 24px 16px 16px",
                      lineHeight: "19.2px",
                      fontFamily: "Manrope",
                      gap: "10px",
                      border: "0.8px solid rgba(0,0,0,0.44) ",
                      borderRadius: "6px",
                    }}
                  />

                  <input
                    type="text"
                    value={selectedClient.project || "Not Assign"}
                    onChange={() => {}}
                    className="w-[640px] h-12 mb-4"
                    placeholder="Project Name"
                    style={{
                      color: "rgba(0, 0, 0, 0.68)",
                      fontWeight: 400,
                      fontSize: "16px",
                      padding: "16px 24px 16px 16px",
                      lineHeight: "19.2px",
                      fontFamily: "Manrope",
                      gap: "10px",
                      border: "0.8px solid rgba(0,0,0,0.44) ",
                      borderRadius: "6px",
                    }}
                  />

                  <div
                    style={{
                      padding: "16px 24px 16px 16px",
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
                      value={selectedClient.note || "Empty"}
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
                      onChange={() => {}}
                    />
                  </div>

                  <button
                    className="flex flex-wrap gap-[10px] justify-between create-team-btn h-12 p-[10px] bg-[#3D2314] rounded-[4px] text-center font-manrope text-lg font-medium text-white"
                    onClick={() => setShowAddNotePopup(false)}>
                    Close Note
                  </button>

                  {/*<button
                  onClick={handleSubmit}
                  className="w-[192px] h-[44px] flex flex-wrap justify-center create-team-btn bg-[#3D2314] rounded-[4px] text-center text-white"
                  disabled={isCreating}
                  style={{ fontFamily: "Manrope", fontWeight: "400", fontSize: "16px", borderRadius: "4px", padding: "10px", gap: "10px" }}
                >
                  {createStatus || "Close Note"}
                </button>*/}
                  {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}

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
                    value={clientName}
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
                  <div
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
                    onClick={() =>
                      setIsProjectDropdownOpen(!isProjectDropdownOpen)
                    }
                    ref={projectDropdownRef}>
                    <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                      {project || "Choose Project"}
                      <img
                        className="ml-2 h-2 w-3 "
                        src={DropIcon}
                        alt="Dropdown Icon"
                      />
                    </div>
                    {isProjectDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
                        {data2.map((projects) => (
                          <div
                            key={projects.name}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleProjectChange(projects.name)}>
                            {projects.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "16px 24px",
                      width: "640px",
                      height: "127px",
                      color: "rgba(0, 0, 0, 0.68)",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "19.2px",
                      fontFamily: "Manrope",
                      gap: "10px",
                      border: "0.8px solid rgba(0,0,0,0.44) ",
                      borderRadius: "6px",
                    }}
                    className="rounded-md border border-gray-300  mb-4">
                    <textarea
                      type="text"
                      placeholder="Add your Briefing"
                      style={{
                        border: "none",
                        fontFamily: "Manrope",
                        overflowY: "scroll",
                        outline: "none",
                        width: "600px",
                        height: "100px",
                      }}
                      onChange={(e) => setBriefing(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="`create-team-btn flex flex-wrap  h-[44px] p-[10px] bg-[#3D2314] justify-around rounded-[4px]  font-manrope text-lg font-medium text-white"
                    disabled={isCreating}>
                    {createStatus || (
                      <div className="flex flex-wrap ">
                        <span> Add Note </span>
                      </div>
                    )}
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ClientHistory;
