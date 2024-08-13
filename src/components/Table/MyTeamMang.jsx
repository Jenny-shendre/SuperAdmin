import React, { useState, useEffect, useCallback, useRef } from "react";
import DropIcon from "../../assets/DropIcon.png";
import { IoIosArrowForward } from "react-icons/io";
import CiUser from "../../assets/ion_person-outline.png";
import FaPhoneAlt from "../../assets/call.png";
import CgMail from "../../assets/ic_outline-email.png";
import noteImg from "../../assets/add_notes.png";
import Searchsvg from "../../assets/material-symbols_search.svg";
import add from "../../assets/akar-icons_edit (1).png";
import axios from "axios";
import "../Home.css";

const TabBar = ({ activeTab, setActiveTab }) => (
  <div className="flex" style={{background:'white', width:'354px', borderRadius:'24px', boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}}>
    {["All", "Available", "In meet"].map((tab) => (
      <button
        key={tab}
        style={{fontFamily: "Manrope",fontWeight:"500",fontSize:"14px",lineHeight:"19.12px", padding: "10px 24px 10px 24px", height:"39px" }}
        className={` ${
          activeTab === tab
            ? "bg-[#3D2314] text-white w-[118px]"
            : " text-[#3D2314] w-[118px]"
        }  ${tab === 'All' ? "rounded-l-[24px] " : ""} ${tab === 'In meet' ? "rounded-r-[24px] " : ""}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

function MyTeamMang() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeRole, setActiveRole] = useState('Client');
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown
 
 //BACKEND
 
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async (url) => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      const resData = res.data;
      if (resData && resData.allTeamMembers) {
        setNotes(resData.allTeamMembers);
      } else {
        setNotes([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setNotes([]);
    }
  };

  useEffect(() => {
    let url;
    if (activeTab === "All") {
      url = "https://project-rof.vercel.app/api/teamMember/fetch-all";
    } else if (activeTab === "Available") {
      url = "https://project-rof.vercel.app/api/teamMember/fetch-available";
    } else if (activeTab === "In meet") {
      url = "https://project-rof.vercel.app/api/teamMember/fetch-assigned";
    }
    getData(url);
  }, [activeTab]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearch(query);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(search.toLowerCase())
  );




  //FRONTEND

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
        setCreateStatus("Note Successfully Added ✓");

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

  return (
    <div className="p-4 pt-0">
      <div
        style={{ gap: "20px", paddingTop: "30px", fontFamily: "Manrope" }}
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
            Notes
          </span>
        </h1>
      </div>
      <br />
      <div className="flex flex-row items-center justify-center">
        <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
          <input
            className="w-full  rounded-full "
            style={{
              width: "619px",
              height: "48px",
              fontFamily: "Manrope",
              fontSize:"16px",
              fontWeight:"500",
              lineHeight:"21.86px",
              padding: "12px 24px 12px 48px",
              gap: "24px",
              borderRadius: "27px",
              opacity: "0px",

              boxShadow: " 0px 0px 4px 0px #00000040",
            }}
            type="text"
            onChange={handleSearchChange}
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

      <br />
      <div className="flex justify-center">
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      </div>
     
     
      <br />
      {loading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
      <div className="Cards gap-8">
        <div className="flex flex-wrap gap-8 mb-[30px]">
        {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
          <div
          key={note.name}
            className=" bg-white rounded-[12px] p-[24px] max-w-xs w-[310px] h-[272px]"
            style={{
              boxShadow: "0px 0px 4px 0px #00000040",
            }}
          >
            <div className="flex items-center mb-4 justify-between">
              <div className="">
                <img src={CiUser} alt="User" className="w-[92px] h-[92px] text-[92px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24.59px",
                    paddingBottom: "10px",
                  }}
                  className=" text-center text-[#3D2314]"
                >
                        {note.name?.length > 0 ? note?.name : "Not found"}
                        </h2>
                <div>
                  <div className="flex flex-wrap">
                    <img src={CgMail} alt="Email" className="text-[14px]" />

                    <p
                      style={{ fontFamily: "Manrope" }}
                      className="text-[#3D2314] text-[14px] ml-3 font-[Manrope]"
                    >
                     {note.emailID?.length > 0
                              ? note?.emailID
                              : "Not found"}
                    </p>
                  </div>
                  <div className=" flex flex-wrap pt-[5px]">
                    <img src={FaPhoneAlt} alt="Phone" className="text-[24px]" />

                    <p className="text-[#3D2314] text-[14px] ml-3 font-[Manrope]">
                    {note.phone?.length > 0 ? note?.phone : "Not found"}

                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <div>
                <div
                  className="flex flex-wrap justify-between"
                  style={{ alignContent: "center" }}
                >
                  <p className="text-sm text-gray-600 font-[Manrope]">
                    Clients Attended
                  </p>
                  <p className="text-lg font-semibold ml-[7px] font-[Manrope]">
                  {note.clientsAttended}
                  </p>
                </div>
                <div
                  className="flex flex-wrap justify-between "
                  style={{ alignContent: "center", paddingTop: "5px" }}
                >
                  <p className="text-sm text-gray-600 font-[Manrope]">
                    Clients Converted
                  </p>
                  <p className="text-lg font-semibold ml-[7px] font-[Manrope]">
                  {note.clientsAttended}
                  </p>
                </div>
              </div>

              <div
                      style={{ borderRadius: "8px", fontFamily: "Manrope" }}
                      className={`font-[Manrope] w-[70px] h-[28px] ${
                        note.status === "available"
                          ? "bg-[#BAEFB1] text-[#1D750E]"
                          : "bg-[#F4E8C8] text-[#AF8414]"
                      } text-[12px] px-[10px] py-[6px] mt-[15px] item-center justify-center`}
                    >
                                      {note.status === "assigned" ? "In meet" : "available"}

              </div>
            </div>
            <button
              className="font-[Manrope] w-[262px] h-[36px] gap-2 text-[#3D2314] bg-white py-[6px] px-[10px] rounded-lg flex items-center justify-center"
              style={{ border: "1px solid #3D2314",fontSize:"12px",fontWeight:"500",lineHeight:"16.39px" }}

              onClick={() => {
                setShowNotePopup(false);
                setShowAddNotePopup(true);
              }}
            >
              <img src={noteImg} className="text-[24px]" />
              Add Note
            </button>
          </div>

))
) : (
  <div className="flex justify-center items-center w-full">
    <p>No notes found</p>
  </div>
 )}
 </div>
</div>
)}
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
                    padding: "16px 24px 16px 16px",
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
                    fontWeight: "400",
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
                  ref={projectDropdownRef}
                >
                  <div className="cursor-pointer w-[640px] h-[48px] flex justify-between items-center"
                  style={{fontFamily:"Manrope",fontSize:"16px",lineHeight:"19.2px",fontWeight:"400",padding:"16px 24px 16px 16px"}}>
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
                          onClick={() => handleProjectChange(projects.name)}
                        >
                          {projects.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "16px 24px 16px 16px",
                    width: "640px",
                    height: "127px",
                    color: "rgba(0, 0, 0, 0.68)",
                    fontWeight: "400",
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
                  className=" flex flex-wrap gap-[10px] justify-between create-team-btn w-[192px] h-[44px] p-[10px] bg-[#3D2314] rounded-[4px] text-center font-manrope text-lg font-medium text-white"
                  disabled={isCreating}
                  style={{ alignSelf: "center" }}
                >
                  {createStatus || "Add Note"}
                </button>
                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
              </div>
            </div>
          </>
        )}
     

</div>
);
}

      
    
     
       
    




// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default MyTeamMang;
