import React, { useEffect, useRef, useState } from "react";
import userImg from  "../../../assets/A2.png";
import BellImage from "../../../assets/BellImage.png";
import ROFIMAGE from "../../../assets/ROFIMAGE.png"; // Imported the logo
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/TokenUtils";
import axios from "axios";


const TopNav = () => {
  const [title, setTitle] = useState("Sales Manager");
  const [click, setclick] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null); // Create a ref for the popup

  const clickfun = () => {
    setclick((prev) => !prev);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();
    navigate("/");
    window.location.reload();
  }

  const [IdEmp, setIdEmp] = useState(localStorage.getItem("EmpId") || "ROFEX10");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Function to handle click outside the popup
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setclick(false);
      }
    };

    // Add event listener to detect clicks outside the popup
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  useEffect(() => {
    const sendStatusToBackend = async (status) => {
      try {
        const response = await axios.put(
         ` https://project-rof.vercel.app/api/attendants/status/${IdEmp}`,
          {
            StaffStatus: status ? "online" : "offline",
          }
        );
        console.log("Status sent:", response.data);
      } catch (error) {
        console.error("Error sending status:", error);
        if (!status) {
          localStorage.setItem("pendingStatus", JSON.stringify({ IdEmp, status: "offline" }));
        }
      }
    };

    sendStatusToBackend(isOnline);

    const handleOnline = async () => {
      setIsOnline(true);
      const pendingStatus = localStorage.getItem("pendingStatus");

      if (pendingStatus) {
        const { status } = JSON.parse(pendingStatus);
        if (status === "offline") {
          await sendStatusToBackend(false);
          localStorage.removeItem("pendingStatus");
        }
      }

      sendStatusToBackend(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      sendStatusToBackend(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [IdEmp]);

  return (
    <div style={{
      boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
      paddingLeft:'0px',
      width:'100%'
    }} className={`border-0 bottom-shadow h-[66px] bg-white bg-opacity-50 flex items-center justify-between px-4 font-[Manrope] font-medium relative shadow-b-lg shadow-Black-1000`}>
    {/* logo */}
     <img src={ROFIMAGE}
      alt="ROF Logo"
      className="w-[71px] h-[50px] lg-hidden" />

{/* bell icon */}

<div className="flex items-center mr-2 gap-4 lg:hidden">
        <img
          src={BellImage}
          alt="Notifications"
          className="w-6 h-6"
        />
        <img
          src={userImg}
          alt="User"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={clickfun}
        />
      </div>

{/* Welcome text and User Profile for large screens */}
<div className="hidden mr-4 lg:flex lg:flex-grow lg:justify-end lg:items-center lg:gap-4 ">
<div style={{
  fontFamily:'Manrope',
  fontSize:'20px',
  fontWeight:'500',
  lineHeight:'27.32px'
}}>

  Welcome! {title}

  </div>

  <img src={userImg} alt="User" className="w-8 h-8 rounded-full cursor-pointer" onClick={clickfun} />
  </div>


 {/* DropDown for profile */}

    
      <div ref={popupRef} style={{ boxShadow: '0px 0px 4px 0px #00000040', padding: '6px 14px' }}
        className={`absolute right-7 top-14 bg-white p-4 ${click ? "" : "hidden"}`}>
        <ul className="flex flex-col gap-1 ">
          <li onClick={handleLogOut} style={{ fontFamily: 'Manrope', fontSize: '20px' }} className="font-[Manrope] cursor-pointer font-medium text-[#F13737]">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;