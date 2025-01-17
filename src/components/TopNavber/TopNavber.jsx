import React, { useEffect, useRef, useState } from "react";
import userImg from "../../assets/A2.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/TokenUtils";
import axios from "axios";

const TopNav = () => {
  const [title, setTitle] = useState("Super Admin");
  const [click, setclick] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null); // Create a ref for the popup

  const clickfun = () => {
    setclick((prev) => !prev);
  };

  const handleLogOut = async() => {
    try {

      const token = localStorage.getItem('token'); // Replace 'token' with your actual token key

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log(res.data.message); // Optionally log the success message

      logout();
      window.location.reload();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log('Logout error:', error.response ? error.response.data : error.message);

    }
  };

  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX10"
  );
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
          ` ${import.meta.env.VITE_BACKEND}/api/attendants/status/${IdEmp}`,
          {
            StaffStatus: status ? "online" : "offline",
          }
        );
        console.log("Status sent:", response.data);
      } catch (error) {
        console.error("Error sending status:", error);
        if (!status) {
          localStorage.setItem(
            "pendingStatus",
            JSON.stringify({ IdEmp, status: "offline" })
          );
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
    <div
      style={{
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        paddingRight: "0px",
        background:'white',
        width :'100%',
        display:'flex',
        justifyContent:'end',
        paddingRight:'10px'
      }}
      className={`w-full flex justify-end items-center  h-16 gap-[10px]`}>
      <div
        style={{
          fontFamily: "Manrope",
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "27.32px",
        }}>
        Welcome! {title}{" "}
      </div>
      <div>
        <img
          src={userImg}
          alt="Userimg"
          className="w-8 rounded-full cursor-pointer"
          onClick={clickfun}
        />
      </div>
      <div
        ref={popupRef}
        style={{ boxShadow: "0px 0px 4px 0px #00000040", padding: "6px 14px" }}
        className={`absolute right-7 top-14 bg-white p-4 border  ${
          click ? "" : "hidden"
        }`}>
        <ul className="flex flex-col gap-1 ">
          <li
            onClick={handleLogOut}
            style={{ fontFamily: "Manrope", fontSize: "20px" }}
            className="font-[Manrope] cursor-pointer font-medium text-[#F13737]">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
