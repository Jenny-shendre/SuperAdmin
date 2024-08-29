import React, { useEffect, useState, useRef } from "react";
import userImg from "../../../assets/A2.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/TokenUtils";
import axios from "axios";

const TopNavM = () => {
  const [title, setTitle] = useState("Sales Manager");
  const [click, setclick] = useState(false);
  const navigate = useNavigate();

  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX10"
  );

  const popupRef = useRef(null);

  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setIdEmp(EmpId);
  }, []);

  const clickfun = () => {
    setclick(!click);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();
    navigate("/");
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
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
  }, []);

  const sendStatusToBackend = async (status) => {
    try {
      const response = await axios.post(
        `https://project-rof.vercel.app/api/attendants/status/${IdEmp}`,
        {
          StaffStatus: status ? "online" : "offline",
        }
      );
      console.log("Status sent:", response.data);
    } catch (error) {
      console.error("Error sending status:", error);
    }
  };




  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setclick(false);
      }
    };

    if (click) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [click]);



  return (
    <div
      style={{
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        paddingRight: "0px",
      }}
      className={`TNav border-0 bottom-shadow w-full h-[3.688rem] lg:h-[50px] bg-white bg-opacity-50 flex flex-row justify-end px-5 gap-5 items-center font-[Manrope] font-medium relative shadow-b-lg shadow-Black-1000`}
    >
      <div
        style={{
          fontFamily: "Manrope",
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "27.32px",
        }}
      >
        Welcome! {title}
      </div>
      <div>
        <img
          src={userImg}
          alt="Userimg"
          className="w-8 rounded-full mr-12 cursor-pointer"
          onClick={clickfun}
        />
      </div>
      <div ref={popupRef} 
      style={{boxShadow: "0px 0px 4px 0px #00000040",padding: "6px 14px",zIndex: "+1",}}
        className={`absolute right-7 top-14 bg-white p-4 ${
          click === true ? "" : "hidden"
        } `}
      >
        <ul className="flex flex-col gap-1 ">
          
          <li onClick={handleLogOut}style={{ fontFamily: "Manrope", fontSize: "20px" }}className="font-[Manrope] cursor-pointer font-medium text-[#F13737]">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavM;


























































































































































































































