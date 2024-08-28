import React, { useEffect, useRef, useState } from "react";
import userImg from "../../assets/A2.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/TokenUtils";
import axios from "axios";


const TopNav = () => {
  const [title, setTitle] = useState("Sales Executive");
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
      boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)', paddingRight: '0px'
    }}
      className={`TNav border-0 bottom-shadow w-full h-[3.688rem] lg:h-[50px] bg-white bg-opacity-50  flex flex-row justify-end px-5 gap-5 items-center font-[Manrope] font-medium relative shadow-b-lg shadow-Black-1000`}>
      <div style={{
        fontFamily: 'Manrope',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '27.32px',
      }}>Welcome! {title} </div>
      <div>
        <img
          src={userImg}
          alt="Userimg"
          className="w-8 rounded-full mr-12 cursor-pointer"
          onClick={clickfun}
        />
      </div>
      <div ref={popupRef} style={{ boxShadow: '0px 0px 4px 0px #00000040', padding: '6px 14px' }}
        className={`absolute right-7 top-14 bg-white p-4 ${click ? "" : "hidden"}`}>
        <ul className="flex flex-col gap-1 ">
          <Link to='/SalesExecutive/SettingEx'>
            <li style={{ fontFamily: 'Manrope', fontSize: '20px' }} className="font-[Manrope] cursor-pointer font-medium">
              Go to Settings
            </li>
          </Link>
          <li style={{ fontFamily: 'Manrope', fontSize: '20px' }} className="font-[Manrope] cursor-pointer font-medium">Profile</li>
          <li onClick={handleLogOut} style={{ fontFamily: 'Manrope', fontSize: '20px' }} className="font-[Manrope] cursor-pointer font-medium text-[#F13737]">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;