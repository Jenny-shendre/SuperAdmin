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
import { IoIosArrowForward } from "react-icons/io";

import MyProfileAdmin from "./MyProfileAdmin";
import PasswordAdmin from "./PasswordAdmin";
import axios from "axios";

const SettingPageAdmin = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const inputRef = useRef(null);
  const [adminData, setAdminData] = useState([]);
  const [image, setImage] = useState(null);

  ///Add Image Logic

  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX10"
  );

  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setIdEmp(EmpId);
  }, []);

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
        `${import.meta.env.VITE_BACKEND}/api/settingsAdmin/CoverImage/${IdEmp}`,
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

  const handleItemClick = () => {
    setActiveItem("MyProfileAdmin");
  };

  const handleItemClick2 = () => {
    setActiveItem("PasswordAdmin");
  };
  useEffect(() => {
    switch (locationPath) {
      case "/profileAd":
        setActiveItem("MyProfileAdmin");
        break;

      case "/passwordAd":
        setActiveItem("PasswordAdmin");
        break;

      default:
        setActiveItem("MyProfileAdmin");
        break;
    }
  }, []);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    employeeId: "",
    country: "",
    cityState: "",
    postalCode: "",
    adhaarCard: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    console.log(profile);
  };

  const gitAPiData = async (employeeId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/settingsAdmin/${employeeId}`
    );
    setAdminData(res.data);
  };
  useEffect(() => {
    gitAPiData(IdEmp);
  }, []);

  return (
    <div className="p-[16px]  flex flex-col items-start h-screen">
      <div className="h-[7%]">
        <h1
          className="font-bold flex items-center gap-1 "
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
          }}>
          Home
          <IoIosArrowForward style={{ color: "#1C1B1F" }} />
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "24px",
            }}
            className="font-medium">
            {/* Direct Visitors */}
            Setting
          </span>
        </h1>
      </div>

      <div className="flex h-[85%] overflow-auto w-full bg-white">
        <div
          className="w-[25%] h-full text-black flex flex-col overflow-hidden"
          style={{ borderRight: "1px solid #D0D0D0", alignItems: "center" }}>
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
                activeItem === "MyProfileAdmin"
                  ? "bg-[#8B7B72]  text-white"
                  : ""
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
                activeItem === "PasswordAdmin" ? "bg-[#8B7B72]  text-white" : ""
              }`}
              onClick={handleItemClick2}>
              Password
            </button>
          </div>
        </div>

        <div className="w-[75%] h-full gap-[16px] p-[24px] overflow-auto hide-scrollbar">
          <div className="w-full h-[142px] p-6 flex justify-between items-center mb-6 border-2 border-[#D0D0D0] rounded-lg">
            <div className="flex items-center gap-4">
              {/* <div onChange={handleImageChange}>
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    style={{
                      position: "relative",
                      top: "37px",
                      left:'9px',
                      width: "77px",
                      height: "77px",
                      borderRadius: "50%",
                      zIndex:'+1'
                    }}
                  />
                ) : (
                  <img src="" alt="" />
                )}
                <img
                  src={adminData.CoverImage}
                  style={{position:'relative', top:'-40px', left:'8px'}}
                  className="w-[77px] h-[77px] bg-gray-300 rounded-full mr-4"
                />
                <input type="file" ref={inputRef} style={{ display: "none" }} />
              </div> */}
              <div>
                <div
                  style={{
                    fontWeight: "700",
                    lineHeight: "27.32px",
                    fontFamily: "Manrope",
                  }}
                  className="text-[Manrope] text-[20px] text-[#3C3C3C]">
                  {adminData.name}
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    lineHeight: "19.12px",
                    fontFamily: "Manrope",
                  }}
                  className="mt-2 text-[Manrope] text-[14px] text-[#5B5B5B]">
                  {adminData.role}
                </div>
                <div
                  style={{
                    fontWeight: "400",
                    lineHeight: "19.12px",
                    fontFamily: "Manrope",
                  }}
                  className="mt-1 text-[Manrope] text-[14px] text-[#5B5B5B]">
                  {adminData.location}
                </div>
              </div>
            </div>
           
          </div>

          <div>
            {activeItem === "MyProfileAdmin" && <MyProfileAdmin />}
            {activeItem === "PasswordAdmin" && (
              <PasswordAdmin phone={adminData.phone} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPageAdmin;
