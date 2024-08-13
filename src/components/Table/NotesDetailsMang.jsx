import React, { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { TbBrandTelegram } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

import Searchsvg from "../../assets/material-symbols_search.svg";
import close from "../../assets/add_notes (white).png";
import info from "../../assets/carbon_customer.png";
import info2 from "../../assets/hugeicons_manager.png";
import info3 from "../../assets/eos-icons_admin-outlined.png";
import add from '../../assets/akar-icons_edit (1).png';
import { FaRegEdit } from "react-icons/fa";

import "../Home.css";
import axios from "axios";

import { IoOpenOutline } from "react-icons/io5";
import DropIcon from "../../assets/DropIcon.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";

import edit from "../../assets/hugeicons_view.png";
import share from "../../assets/Vector (3).png";
import { FcEditImage } from "react-icons/fc";

const TabBar = ({ activeTab, setActiveTab }) => (
  <div className="flex" style={{background:'white', width:'472px', borderRadius:'24px', boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}}>
    {["All", "Client", "Manager", "Super Admin"].map((tab) => (
      <button
        key={tab}
        style={{ fontFamily: "Manrope", padding: "10px 10px", width: "121px" }}
        className={`  ${
          activeTab === tab
            ? "bg-[#3D2314] text-white"
            : " text-[#3D2314] "
        } ${tab === 'All' ? "rounded-l-[24px] " : ""} ${tab === 'Super Admin' ? "rounded-r-[24px] " : ""}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
      
  </div>
);

function NotesDetailsMang() {
  const [activeTab, setActiveTab] = useState("All");
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [showViewNotePopup, setShowViewNotePopup] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown
  const [loading, setLoading] = useState(false);

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

  
   
  const [clientConversation, setclientConversation] = useState("");

  const handleOptionChange = (event) => {
    setclientConversation(event.target.value);
  };


  const handleOutsideClick = (event) => {
    if (notePopupRef.current && !notePopupRef.current.contains(event.target)) {
      setShowNotePopup(false);
    }
    if (
      addNotePopupRef.current &&
      !addNotePopupRef.current.contains(event.target)
    ) {
      setShowViewNotePopup(false);
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

  const [showIcon, setShowIcon] = useState(true);
  const handleClick = () => {
    setShowIcon(false);
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
  }, [
    showNotePopup,
    showAddNotePopup,
    isDropdownOpen,
    isProjectDropdownOpen,
  ]);

  // Add note popup logic

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
      console.log("Come")

      const teamdata = {
        clientName: clientName,
        project : project,
        briefing :briefing,
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


  const [clientName2, setclientName2] = useState("");
  const [project2, setProject2] = useState("");
  const [briefing2, setBriefing2] = useState("");
  // const [isCreating, setisCreating] = useState(false);
  const [createStatus2, setCreateStatus2] = useState("");
  const [errorMessage2, setErrorMessage2] = useState(""); // state for error message
 
  const handleProjectChange2 = (projectName2) => {
    setProject2(projectName2);
    setIsProjectDropdownOpen(false);
  };



  const handleSubmit2 = async () => {
    if (clientName2 && project2 && briefing2) {
      // isCreating(true);
      setErrorMessage2(""); // Clear any previous error messages
      console.log("View Note")

      const ViewData = {
        clientName2: clientName2,
        project2 : project2,
        briefing2 :briefing2,
      };

      try {
       
        
        setCreateStatus2("Done");
        
        console.log("Response send", ViewData);
      } catch (error) {
        console.error("Error Editing Note:", error);
        setCreateStatus2("Error Editing Note");
      } finally {
        // setisCreating(false);
      }
    } 
  };




  //SEARCH

  return (
    <div>
      <div
        style={{ gap: "20px", paddingTop: "30px" }}
        className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;
        "
      >
        <h1
          className="font-bold flex items-center gap-1"
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
            color: "black",
          }}
        >
          Home
          <IoIosArrowForward style={{ color: "black" }} />
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "24px",
              color: "black",
            }}
            className="font-medium"
          >
            Notes
          </span>
        </h1>
      </div>
      <br />
      <div className="flex flex-row items-center justify-center">
        <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
          <input
            className="w-full py-2 px-12 rounded-full "
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
            value=""
            placeholder="Search"
          />
          <img
            style={{ top: "0.8rem" }}
            src={Searchsvg}
            alt="Search"
            className="absolute left-4"
          />
        </div>
        <div style={{ position: "absolute", right: "145px" }}>
          <button
            className="flex bg-[#3D2314] text-white w-[162px] h-[48px] gap-[12px]"
            style={{
              borderRadius: "26px",
              padding: "12px 24px",
              fontFamily: "Manrope",
            }}

            onClick={() => {
              setShowNotePopup(false);
              setShowAddNotePopup(true);
            }}
           
          >
            <img src={close} />
            <span style={{ fontFamily: "Manrope" }}>Add Notes </span>
          </button>
        </div>
      </div>

      {showViewNotePopup && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            ref={addNotePopupRef}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="add-team-members w-[688px] h-auto p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[664px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => setShowViewNotePopup(false)}
              >
                X
              </button>
              <input
                type="text"
                value={clientName2}
                onChange={(e) => setclientName2(e.target.value)}
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
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                ref={projectDropdownRef}
              >
                <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                  {project2 || "Choose Project"}
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
                        onClick={() => handleProjectChange2(projects.name)}
                      >
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
                    fontWeight:400
                  }}
                  onChange={(e) => setBriefing2(e.target.value)}
                />
              </div>

              
            
             

              <button
                onClick={handleSubmit2}
                className="`create-team-btn flex flex-wrap w-[192px] h-[44px] p-[10px] bg-[#3D2314] justify-around rounded-[4px]  font-manrope text-lg font-medium text-white"
                disabled={isCreating}
              >
                {createStatus2||(
        <div className="flex flex-wrap ">
    <span>
        <FaEdit className="mr-2 mt-1 font-bold font-[24px]" />
        </span> <span> Edit Note </span> 
        </div>
      )}
              </button>
              {errorMessage2 && (
                <p className="text-red-500 mt-2">{errorMessage2}</p>
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
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                ref={projectDropdownRef}
              >
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
                    fontWeight:400
                  }}
                  onChange={(e) => setBriefing(e.target.value)}
                />
              </div>

              
            
             

              <button
                onClick={handleSubmit }
                className="`create-team-btn flex flex-wrap  h-[44px] p-[10px] bg-[#3D2314] justify-around rounded-[4px]  font-manrope text-lg font-medium text-white"
                disabled={isCreating}
              >
                {createStatus||(
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

      <br />
      <div className="flex justify-center">
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      </div>
     
      <br />
      <div className="Cards gap-4 flex flex-wrap px-[55px] cardT">
        
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="">
              <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

             
            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <br />
            <div className="flex justify-between mt-[11px]">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info2} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Manager
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Discussed Riyaana Dey’s financing options and need for
                pre-approval assistance.
              </p>
            </div>
            <br />
            <br />
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info3} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Superadmin
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Confirmation on available closing dates for shortlisted
                properties.
              </p>
            </div>
            <br />
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
        
        
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
        

        
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
          <div className=" bg-white rounded-lg shadow-md p-4 w-[287px]">
            <div className="flex justify-around items-center mb-4">
              <div className="">
                <img src={info} className="text-[60px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "700",
                    textAlign: "justify",
                    fontFamily: "Manrope",
                  }}
                  className="text-[18px] text-center text-[#3D2314]"
                >
                  Ramesh Kulkarni
                </h2>
                <br />
                <div className="flex flex-wrap">
                  <div>
                    <p
                      className="text-[#3D2314] text-[14px]"
                      style={{ textAlign: "justify", fontFamily: "Manrope" }}
                    >
                      24 June | 12:50 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4 gap-[10px]">
              <p
                style={{
                  fontSize: "12px",
                  margin: "10px",
                  lineHeight: "16.39px",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                }}
              >
                Client expressed interest in [Property Name]. Followed up on
                email with additional details and brochure. Awaiting response.
              </p>
            </div>
            <div className="flex justify-between">
            <button
                className="flex bg-[#3D2314] text-white gap-[8px]"
                style={{
                  borderRadius: "4px",
                  padding: "8px 24px",
                  fontFamily: "Manrope",
                  width: '-webkit-fill-available',
                  justifyContent:'center'
                }}

                onClick={() => {
                  setShowNotePopup(false);
                  setShowViewNotePopup(true);
                }}

                
              >
                <img src={edit} />
                <span style={{ fontFamily: "Manrope" }}>View</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    
  );
}

export default NotesDetailsMang;
