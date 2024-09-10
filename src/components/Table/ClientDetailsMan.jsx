import React, { useEffect, useState, useCallback, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { format, isValid } from "date-fns";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { RxCross2 } from "react-icons/rx";


function ClientDetailsMang() {
  const [data, setData] = useState([]);
  const [valueinput, setValueinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const addNotePopupRef = useRef();

  const truncateText = (text, limit = 10) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text || "";
  };

  const handleOutsideClick = (event) => {
    if (addNotePopupRef.current && !addNotePopupRef.current.contains(event.target)) {
      setShowAddNotePopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/salesManager/findSalesManagerlastTeamData/${email}`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const DateupdatedAt = (date) => {
    const parsedDate = new Date(date);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd MMM | hh:mm a");
    } else {
      return "Invalid Date";
    }
  };

  const onNoteIconClick = (item) => {
    setSelectedClient(item);
    setShowAddNotePopup(true);
  };

  return (
    <div className="bg-[#F7F3E8] min-h-screen font-manrope">
      <div className="container mx-auto px-4 py-8">
        <div className="  mb-8">
          <h1 className=" text-2xl font-medium mb-4 md:mb-0">
            Home <IoIosArrowForward className="inline-block" /> Overview
          </h1>
          </div>
          <div className="flex items-center justify-center text-center w-full">
                <div className="flex justify-start items-center w-[50%] lg:block mx-auto relative lg:w-[36rem] rounded-full">
                  <input
                    className="w-full py-2 px-12 rounded-full "
                    style={{
                      border: "1px solid #3D2314",
                      boxShadow: " 0px 0px 4px 0px #00000040",
                    }}
                    type="text"
                    value={valueinput}
                    onChange={(e) => setValueinput(e.target.value)}
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
        
        <div className="bg-white rounded-lg shadow-md mt-8 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#D7D7D7] text-[#4B4B4B] text-[Manrope] text-sm leading-normal">
                <th className="text-[Manrope] py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Project Name</th>
                <th className="py-3 px-6 text-left">Customer ID</th>
                <th className="py-3 px-6 text-left">Client Name</th>
                <th className="py-3 px-6 text-left">Duration</th>
                <th className="py-3 px-6 text-left">Executive</th>
                <th className="py-3 px-6 text-center">Meeting Status</th>
              </tr>
            </thead>
            <tbody className= "bg-[#FFFFFF] text-gray-600 text-sm font-light">
              {data
                .filter((executive) => {
                  if (!executive.lastClientName) return false;
                  const clientName = executive.lastClientName?.ClientName?.toLowerCase() || "";
                  const projectName = executive.lastClientName?.ClientProject?.toLowerCase() || "";
                  const executiveName = executive.name?.toLowerCase() || "";
                  return (
                    clientName.includes(valueinput.toLowerCase()) ||
                    projectName.includes(valueinput.toLowerCase()) ||
                    executiveName.includes(valueinput.toLowerCase())
                  );
                })
                .map((executive, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {executive.lastClientName?.createdAt
                        ? DateupdatedAt(executive.lastClientName.createdAt)
                        : "Not Found"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {truncateText(executive.lastClientName?.ClientProject || "Not Assigned")}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        to={`/SalesManager/IDMan/${executive.lastClientName?.ClientId}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {executive.lastClientName?.ClientId || "Not Found"}
                      </Link>
                    </td>

                    <td className="py-3 px-6 text-left">
                       {truncateText(executive.lastClientName?.ClientName || "No Last Client")} 
                   
                    </td>

                    <td className="py-3 px-6 text-left font-semibold">
                      {executive.lastClientName?.timeDuration || "Not Assigned"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {truncateText(executive.name || "Not Found")}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {executive.lastClientName?.completed === "completed" ? (
                        <IoCheckmarkOutline className="w-6 h-6 text-green-500 mx-auto" />
                      ) : executive.lastClientName?.completed === "progress" ? (
                        <img
                        src="/talk.png"
                        alt="progress"
                        className="w-[24px] h-[24px] flex justify-center items-center mx-auto"
                      />
                      ) : executive.lastClientName?.accepted === "rejected" ? (
                        <RxCross2 className="ml-[71px] w-[24px] h-[24px]" />
                      ) : (
                        <span className="text-gray-500">No Action</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddNotePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={addNotePopupRef} className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddNotePopup(false)}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">Add Note</h2>
            <input
              type="text"
              value={selectedClient.executiveName || "Not Found"}
              readOnly
              className="w-full px-4 py-2 mb-4 border rounded"
              placeholder="Sales Executive Name"
            />
            <input
              type="text"
              value={selectedClient.project || "Not Assigned"}
              readOnly
              className="w-full px-4 py-2 mb-4 border rounded"
              placeholder="Project Name"
            />
            <textarea
              value={selectedClient.note || "Empty"}
              readOnly
              className="w-full px-4 py-2 mb-4 border rounded h-32 resize-none"
              placeholder="Add your Briefing"
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={() => setShowAddNotePopup(false)}
            >
              Close Note
            </button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetailsMang;