import React, { useEffect, useState, useCallback, useRef} from "react";
import '../Home.css';
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { CgNotes } from "react-icons/cg";
import { IoCheckmarkOutline } from "react-icons/io5";
import close from '../../assets/close.png';
import axios from "axios";
import { format, isValid } from "date-fns";
import Loading from "../Loding/Loding";
function ClientDetailsMang() {
  const [data, setData] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("All");

  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");



 





  const notePopupRef = useRef();
  const addNotePopupRef = useRef();

  const dropdownRef = useRef();
  const projectDropdownRef = useRef(); // ref for project dropdown

  const [data2, setdata2] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    const res2 = await axios.get("https://project-rof.vercel.app/api/projects");
    setdata2(res2.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //New

  const handleOutsideClick = (event) => {
    if (notePopupRef.current && !notePopupRef.current.contains(event.target)) {
      setShowNotePopup(false);
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

  const [clientName, setclientName] = useState("");
  const [project, setProject] = useState("");
  const [briefing, setBriefing] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // state for error message



  const handleProjectChange = (projectName) => {
    setProject(projectName);
    setIsProjectDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (clientName && project && briefing) {
      setIsCreating(true);
      setErrorMessage(""); // Clear any previous error messages
      console.log("Come");

      const teamdata = {
        clientName: clientName,
        project: project,
        briefing: briefing,
      };

      try {
        // setCreateStatus("Note Successfully Added ✓");

        console.log("Response send", teamdata);
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



  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://project-rof.vercel.app/api/attendants/fetch-all`);
      const resData = res.data;
      // console.log("API Response Data:", responseData);
      setData(resData);
      console.log(resData[0].ClientName);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);

    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);

  // const DateupdatedAt = (DateupdatedAt) => {
  //   const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
  //   return formattedDate;
  // };

  const DateupdatedAt = (date) => {
    const parsedDate = new Date(date);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd MMM | hh:mm a");
    } else {
      return "Invalid Date";
    }
  };
  

  return (
    <> {loading ? (
      <Loading />
    ) : (
      <div>
        <div
          style={{ gap: "20px", paddingTop: "30px", fontFamily: 'Manrope' }}
          className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;
        "
        >
          <h1
            className="font-bold flex items-center gap-1 font-[Manrope]"
            style={{
              fontFamily: "Poppins",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Home
            <IoIosArrowForward style={{ color: "#1C1B1F" }} />
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "24px",
              }}
              className="font-medium font-[Manrope]"
            >
              Clients
            </span>
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center font-[Manrope]">
          <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
            <input
              className="w-full py-2 px-12 rounded-full "
              style={{

                boxShadow: " 0px 0px 4px 0px #00000040",
              }}
              type="text"
              value={valueinput}
              onChange={(e) => setvalueinput(e.target.value)}

              placeholder="Search"
            />
            <img
              style={{ top: "0.6rem" }}
              src={Searchsvg}
              alt="Search"
              className="absolute left-4"
            />
          </div>
        </div>


        <main className=" overflow-x-hidden overflow-y-auto p-6 font-[Manrope]">

          <div style={{ textAlign: '-webkit-center' }} className="outer-wrapperT">
            <div className="table-wrapperT">
              <table className="w-[956px] h-[477px] bg-white shadow-md  overflow-hidden font-[Manrope]  wrapperT">

                <thead className="bg-[#D7D7D7] font-[Manrope] team1">
                  <tr className="text-center text-[#4B4B4B] w-[171px]  h-[36px] font-[Manrope]">
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                      width:'175px'
                    }} className="px-4 py-2 ">Date</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Project Name</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Client Name</th>
                    <th style={{
                      width:'171px',
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Duration</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Notes</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Executive</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2 ">Actions</th>
                  </tr>
                </thead>

                <tbody className="font-[Manrope] ">
                  {data.flatMap((visitor, index) =>
                    visitor.ClientName.filter(({ ClientName }) =>
                      ClientName.toLowerCase().includes(valueinput.toLowerCase())
                    ).map((client, clientIndex) => (
                      <tr className="text-[#5C5C5C] text-center" key={`${index}-${clientIndex}`}>
                        <td className="px-4 py-2 ">{client.createdAt ? DateupdatedAt(client.createdAt) : "Invalide date"}</td>
                        <td className="px-4 py-2 ">{client.ClientProject?.length > 0 ? client?.ClientProject : "Not Assign"}</td>
                        <td className="px-4 py-2 ">{client.ClientName?.length > 0 ? client?.ClientName : "Not found"}</td>
                        <td className="px-4 py-2 text-[#000000] " style={{ fontWeight: '800' }}>{client.timeDuration?.length > 0 ? client?.timeDuration : "Not Assign"}</td>
                        <td className="px-4 py-2 r">
                          <div style={{ textAlign: '-webkit-center' }}    onClick={() => {
                setShowNotePopup(false);
                setShowAddNotePopup(true);
              }}>
                            <CgNotes className="w-[20px] h-[22px] text-black " />
                            {client.notes}
                          </div>
                        </td>
                        <td className="px-4 py-2">{visitor.name?.length > 0 ? visitor?.name : "Not found"}</td>
                       
                        {client.completed === 'completed' ? (
                            <IoCheckmarkOutline className="w-[24px] h-[24px] text-[#49DA31]" />
                          ) : (
                            
                            <img src={close} alt="Progress" className="w-[24px] h-[24px] ml-5" />

                           
                          )}
                      </tr>
                    )))}
                </tbody>
              </table>

            </div>
          </div>
        </main>


        {showAddNotePopup && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div
              ref={addNotePopupRef}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="add-team-members w-[688px] h-auto p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
                <button
                  className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[664px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                  onClick={() => setShowAddNotePopup(false)}
                >
                  X
                </button>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setclientName(e.target.value)}
                  className="w-[640px] h-12 mb-4"
                  placeholder="Sales Executive Name"
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
                
                >
                  <input type="text" placeholder="Project Name" className="cursor-pointer w-full h-full p-4 flex justify-between items-center" />
                    
                  
               
                </div>

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
                  className="rounded-md border border-gray-300 font-manrope  div2 mb-4"
                >
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

                <button
                  onClick={handleSubmit}
                  className=" flex flex-wrap gap-[10px] justify-between create-team-btn h-12 p-[10px] bg-[#3D2314] rounded-[4px] text-center font-manrope text-lg font-medium text-white"
                  disabled={isCreating}
                  style={{ alignSelf: "center" }}
                >
                  {createStatus || "Close Note"}
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

export default ClientDetailsMang;