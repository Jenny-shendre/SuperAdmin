import React, { useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";

import MyProfilePage from "./MyProfilePage";
import PasswordPage from "./PasswordPage";
import axios from "axios";

const SettingPages = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [managerData, setManagerData] = useState([]);
  const locationPath = location.pathname;
  const [image, setImage] = useState(null);

  const handleItemClick = () => {
    setActiveItem("MyProfilePage");
  };

  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX10"
  );

  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setIdEmp(EmpId);
  }, []);

  const handleItemClick2 = () => {
    setActiveItem("PasswordPage");
  };
  useEffect(() => {
    switch (locationPath) {
      case "/profile":
        setActiveItem("MyProfilePage");
        break;

      case "/password":
        setActiveItem("PasswordPage");
        break;

      default:
        setActiveItem("MyProfilePage");
        break;
    }
  }, []);

  const handleEditClick = () => {
    console.log(profile);
  };

  ///Add Image Logic
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File", file);
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    inputRef.current.click();
    const formData = new FormData();
    formData.append("CoverImage", image);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/settingsManager/CoverImage/${IdEmp}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      console.log("Image sent successfully", res);
    } catch (error) {
      console.log("Error occurred during image upload", error);
    }
  };


  const gitAPiData = async (employeeId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/settingsManager/${employeeId}`
    );
    setManagerData(res.data);
  };

  useEffect(() => {
    gitAPiData(IdEmp);
  }, []);

  return (
    <div className="flex  min-h-screen ">
      <div
        className="w-1/3 h-[994px] text-black flex flex-col"
        style={{ borderRight: "1px solid #D0D0D0" }}>
        <div className="flex flex-col items-center mt-10 w-[122px] h-[101px] gap-[17px] justify-between">
          <button
            style={{
              fontWeight: "500",
              fontFamily: "Manrope",
              borderRadius: "24px",
              gap: "29px",
              lineHeight: "21.86px",
            }}
            className={`w-[122px]  p-[10px]   text-[16px] items-center text-center ${
              activeItem === "MyProfilePage" ? "bg-[#8B7B72]  text-white" : ""
            }`}
            onClick={handleItemClick}>
            My Profile
          </button>

          <button
            style={{
              fontWeight: "500",
              fontFamily: "Manrope",
              borderRadius: "24px",
              gap: "29px",
              lineHeight: "21.86px",
            }}
            className={`w-[122px]  p-[10px]  text-[16px] items-center text-center ${
              activeItem === "PasswordPage" ? "bg-[#8B7B72]  text-white" : ""
            }`}
            onClick={handleItemClick2}>
            Password
          </button>
        </div>
      </div>

      <div className="w-[80%] h-[360px] gap-[16px] p-[24px] overflow-auto hide-scrollbar">
          <div className="w-full h-[142px] p-6 flex justify-between items-center mb-6 border-2 border-[#D0D0D0] rounded-lg">
            <div className="flex items-center gap-4">
          

            <div>
              <div
                style={{
                  fontWeight: "700",
                  lineHeight: "27.32px",
                  fontFamily: "Manrope",
                }}
                className="text-[Manrope] text-[20px] text-[#3C3C3C]">
                {managerData.name}
              </div>
              <div
                style={{
                  fontWeight: "600",
                  lineHeight: "19.12px",
                  fontFamily: "Manrope",
                }}
                className="mt-2 text-[Manrope] text-[14px] text-[#5B5B5B]">
                {managerData.role}
              </div>
              <div
                style={{
                  fontWeight: "400",
                  lineHeight: "19.12px",
                  fontFamily: "Manrope",
                }}
                className="mt-1 text-[Manrope] text-[14px] text-[#5B5B5B]">
                {managerData.location}
              </div>
            </div>
          </div>
       
        </div>
        <div>
          {activeItem === "MyProfilePage" && <MyProfilePage />}
          {activeItem === "PasswordPage" && (
            <PasswordPage email={managerData.email} />
          )}
          {/* {activeItem === 'MyProfilePage' && <MyProfilePage />}
          {activeItem === 'PasswordPage' && <PasswordPage phone={managerData.phone} />} */}
        </div>
      </div>
    </div>
  );
};

export default SettingPages;
