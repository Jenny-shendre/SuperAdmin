import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import CiUser from "../../assets/ion_person-outline.png";
import FaPhoneAlt from "../../assets/call.png";
import CgMail from "../../assets/ic_outline-email.png";
import noteImg from "../../assets/add_notes.png";
import Searchsvg from "../../assets/material-symbols_search.svg";
import "../Home.css";

const TabBar = ({ activeTab, setActiveTab }) => (
  <div className="flex mb-4 justify-center">
    {["All", "Available", "Assigned"].map((tab) => (
      <button
        key={tab}
        style={{ fontFamily: "Manrope", padding: "10px 10px", width: "121px" }}
        className={`px-4 py-2 ${
          activeTab === tab
            ? "bg-[#3D2314] text-white rounded-[24px]"
            : "bg-white text-[#3D2314]"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

function NotesDetailsMang() {
  const [activeTab, setActiveTab] = useState("All");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
    } else if (activeTab === "Assigned") {
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

  return (
    <div className="p-4 pt-0">
      <div
        style={{ gap: "20px", paddingTop: "30px", fontFamily: "Manrope" }}
        className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;"
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
            className="w-full py-2 px-12 rounded-full"
            style={{
              boxShadow: "0px 0px 4px 0px #00000040",
            }}
            type="text"
            onChange={handleSearchChange}
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

      <br />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
                  className="bg-white rounded-[12px] p-[12px] max-w-xs w-[310px] h-[272px]"
                  style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
                >
                  <div className="flex items-center mb-4 justify-between">
                    <div>
                      <img
                        src={CiUser}
                        className="w-[92px] h-[92px] text-[92px]"
                        alt="User"
                      />
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
                        className="text-center text-[#3D2314]"
                      >
                        {note.name?.length > 0 ? note?.name : "Not found"}
                      </h2>
                      <div>
                        <div className="flex flex-wrap">
                          <img
                            src={CgMail}
                            className="text-[14px]"
                            alt="Email"
                          />
                          <p
                            style={{ fontFamily: "Manrope" }}
                            className="text-[#3D2314] text-[14px] ml-3 font-[Manrope]"
                          >
                            {note.emailID?.length > 0
                              ? note?.emailID
                              : "Not found"}
                          </p>
                        </div>
                        <div className="flex flex-wrap pt-[5px]">
                          <img
                            src={FaPhoneAlt}
                            className="text-[24px]"
                            alt="Phone"
                          />
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
                      {note.status === "assigned" ? "in meet" : "available"}
                    </div>
                  </div>
                  <button
                    className="font-[Manrope] w-full gap-2 text-[#3D2314] bg-white py-2 px-4 rounded-lg flex items-center justify-center"
                    style={{ border: "1px solid #3D2314" }}
                  >
                    <img src={noteImg} className="text-[24px]" alt="Add Note" />
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

export default NotesDetailsMang;
