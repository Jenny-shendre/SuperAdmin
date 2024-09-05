import { useEffect, useState, useRef } from "react";
import { LuPencilLine } from "react-icons/lu";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { useNavigate } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";

import "../Home.css";
import { Link } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

// const navigate=useNavigate()

const API_URL = import.meta.env.VITE_API_URL;

const Table2 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [channelName, setChannelName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [channelEmailID, setChannelEmailID] = useState("");
  const [data, setdata] = useState([]);

  const [loading, setLoading] = useState(false);
  const id = location.state || 0;
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // state for error message

  const handleDeleteClick = async (deleteId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/channels/${deleteId}`
      );
      console.log("Channel deleted", res);
      setdata((prevData) => prevData.filter((item) => item._id !== deleteId));
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setDeleteId(null); // Clear the deleteId when the popup is closed
  };

  const popupRef = useRef();
  const fileInputRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  const [createStatus, setCreateStatus] = useState("Register Channel");
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setChannelName("");
    setChannelEmailID("");
    setphone("");
    setaddress("");
    setCreateStatus("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!channelName || !channelEmailID || !phone || !address) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const teamdata = {
      name: channelName,
      email: channelEmailID,
      phone: phone,
      address: address,
    };

    // console.log("Data to be sent:", teamdata);

    setCreateStatus("Registering Channel....");
    setIsCreating(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/channels`,
        teamdata
      );

      console.log("Successfully Added:", res.data);

      setCreateStatus("Channel Successfully Added ✓");

      resetForm();

      getData1();
    } catch (error) {
      console.error("Error Registering Channel:", error);

      setCreateStatus("Error Registering Channel");
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const getData1 = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/channels`
      );
      setdata(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchRecordByChannelID = async (id) => {
    console.log("id>>>>>>", id);
    const res = await axios.get(`${API_URL}/api/channels/fetchChannelBy/`, {
      params: {
        id: id,
      },
    });
    setdata(res.data);
  };

  // console.log(data);
  useEffect(() => {
    getData1();
  }, []);

  // Data Time
  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };

  const ResponseAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "hh:mm a");
    return formattedDate;
  };
  //vb
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text || "";
  };

  return (
    <div className="arrowss">
      {loading ? (
        <Loding />
      ) : (
        <div
          style={{ gap: "10px" }}
          className="Tab3 p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen;
 ">
          {/* bg: #F7F3E8 */}
          <div
            style={{ gap: "20px", paddingLeft: "0px" }}
            className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;
 ">
            <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
              <Link to="/SuperAdmin">
                <span>Home</span>
              </Link>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                {/* Direct Visitors */}
                Channel Partners
              </span>
            </h1>

            <div className="flex flex-row  text-center  items-center   ">
              <div style={{ width: "70%", textAlign: "-webkit-center", display:'flex', justifyContent:'space-between' }}>
                <div className="flex justify-center items-center w-[70%] lg:block relative lg:w-[36rem] rounded-full">
                  <input
                    className="w-[619px] h-[48px] py-2 px-12 rounded-full "
                    style={{
                      border: "1px solid #3D2314",
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
                    className="absolute  left-4"
                  />
                </div>
              </div>
              <div className="w-[30%]">
                <button
                  onClick={() => setShowPopupAdd(true)}
                  className="bg-[#3D2314] text-white  rounded-full flex items-center justify-center h-[48px] w-[250px]"
                  style={{ padding: "12px 24px 12px 24px", gap: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Channel Partner
                </button>
              </div>
            </div>
          </div>
          <div className="outer-wrapper text-center flex items-center justify-center">
            <div className="table-wrapper" style={{ width: "999px" }}>
              {data.length !== 0 ? (
                <table
                  className="w-[950px] bg-white"
                  style={{ boxShadow: " 0px 0px 4px 0px #00000040" }}>
                  <thead>
                    <tr className="text-[9px] lg:text-[15px] text-left  bg-[#E8E8E8]">
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "left",
                          // paddingLeft: "7px",
                          //TC-181
                          width: "100px",
                          // padding: "6px, 10px, 6px, 10px",
                          height: "28px",
                        }}
                        //TC-186
                        className="px-[10px] py-[6px]">
                        {/* Date */}
                        Serial No
                      </th>
                      <th
                        className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          //TC-197
                          textAlign: "center",
                          padding: "7px",
                          width: "100px", //tc-3
                          height: "28px",
                        }}>
                        {/* Response Time */}
                        Channel ID
                      </th>
                      <th
                        className="border-b text-center px-[10px] py-[6px] "
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          //TC-213
                          textAlign: "center",

                          width: "253px",
                          height: "28px",
                        }}>
                        {/* Meeting Duration */}
                        List of Channel Name
                      </th>
                      <th
                        className="border-b "
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          //TC-228
                          textAlign: "center",
                          width: "253px",
                          height: "28px",
                          //TC-231
                          padding: "6px 10px 6px 10px",
                        }}>
                        {/* Customer Name */}Email
                      </th>
                      <th
                        className="border-b text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "109px",
                          height: "28px",
                          //TC-247
                          padding: "6px 10px 6px 10px",
                        }}>
                        Phone No
                      </th>
                      <th
                        className="border-b"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "139px",
                          height: "28px",
                          //TC-263
                          padding: "6px 10px 6px 10px",
                        }}>
                        Address
                      </th>

                      <th
                        className="border-b"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "139px",
                          height: "28px",
                          //TC-263
                          padding: "6px 10px 6px 10px",
                        }}>
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data
                      .filter(
                        ({ name, channelID, email, phone, address }) =>
                          name
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          channelID
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          email
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          phone
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          address
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase())
                      )
                      .map((visitor, index) => (
                        <tr
                          style={{ paddingLeft: "5px" }}
                          className="py-1 border-b text-[9px] lg:text-[14px]  "
                          key={index}>
                          {/* <td className="p-2">{index + 1}</td> */}
                          <td style={{ paddingLeft: "5px" }}>
                            {/* {DateupdatedAt(visitor.updatedAt)} */}
                            <td className="py-3  ml-6 text-center flex items-center ">
                              {index + 1}
                            </td>
                          </td>

                          <td className="py-3 border-b text-center">
                            {/* {ResponseAt(visitor.updatedAt)} */}

                            <Link
                              onClick={() =>
                                navigate(
                                  `/SuperAdmin/Rainbow_overseas/${visitor.channelID}`
                                )
                              }
                              style={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                fontWeight: "700",
                                lineHeight: "19.12px",
                                textAlign: "left",
                                color: "#000AFF",
                                textDecoration: "underline",
                              }}>
                              {visitor.channelID}
                            </Link>
                          </td>

                          <td className="py-3  text-left flex items-center justify-center">
                            <FaCircle
                              className="mr-2 ml-16 text-gray-500 "
                              style={{ width: "30px", height: "30px" }}
                            />
                            <span
                              className="truncate flex-grow ml-2 #000000"
                              style={{ fontSize: "16px" }}>
                              {visitor.name}{" "}
                            </span>
                          </td>

                          <td
                            className="  py-3 border-b text-center max-w-[150px] overflow-hidden"
                            title={visitor.email}>
                            {truncateText(visitor.email, 17)}
                          </td>

                          <td className=" py-3 border-b text-center">
                            {visitor.phone}
                          </td>

                          <td
                            className="  py-3 border-b text-center max-w-[150px] overflow-hidden"
                            title={visitor.address}>
                            {truncateText(visitor.address, 13)}
                          </td>
                          <td className="py-1 px-3 border-b text-center">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}>
                              <RiDeleteBin6Line
                                // onClick={() => handleDeleteClick(visitor._id)}
                                onClick={() => {
                                  setShowPopup(true);
                                  setDeleteId(visitor._id);
                                }}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  color: "#930000",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p> No records founds...!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showPopup && deleteId !== null && (
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
                  // onClick={confirmDelete}
                  onClick={() => handleDeleteClick(deleteId)} // Delete the project
                >
                  Delete
                </button>
                <button
                  className="w-[85px] h-[33px] p-2.5 rounded-md border border-black flex items-center justify-center"
                  // onClick={() => setShowPopup(false)}
                  onClick={handleClosePopup} // Close the popup
                >
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

      {showPopupAdd && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            ref={popupRef}
            className="popup-container w-[581px] h-fit p-6 gap-6 rounded-lg bg-white flex flex-col items-center z-50">
            <button
              className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[572px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
              onClick={() => setShowPopupAdd(false)}>
              X
            </button>

            <input
              type="text"
              className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg "
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />

            <input
              type="email"
              className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg "
              placeholder="Channel Email ID"
              value={channelEmailID}
              onChange={(e) => setChannelEmailID(e.target.value)}
            />
            <input
              type="text"
              className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg "
              placeholder="Phone No"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
            <textarea
              className="project-address-input w-[533px] min-h-[134px] p-4 rounded-md border border-gray-300 "
              style={{
                fontFamily: "Manrope",
                fontWeight: "400",
                fontSize: "16px",
                color: "#000000",
              }}
              placeholder="Address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="`create-team-btn flex flex-wrap  h-[44px] p-[10px] bg-[#3D2314] justify-around rounded-[4px]  font-manrope text-lg font-medium text-white"
              disabled={isCreating}>
              {isCreating ? createStatus : "Register Channel"}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table2;
