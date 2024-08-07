import React from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import  { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";

import MyProfilePage from './MyProfilePage';
import PasswordPage from './PasswordPage';




const SettingPages = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
const handleItemClick = () => {
    setActiveItem("MyProfilePage");
    
  };

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
  return (
    
      <div className="flex  min-h-screen ">
        <div className="w-1/6 h-[794px] text-black flex flex-col"style={{borderRight:'1px solid #D0D0D0'}}>
        <div className="flex flex-col items-center mt-10 w-[122px] h-[101px] gap-[17px] justify-between">
         
          <button
            style={{ fontWeight: "500", fontFamily: "Manrope",borderRadius:'24px',gap:'29px', lineHeight:'21.86px' }}
            className={`w-[122px]  p-[10px]   text-[16px] items-center text-center ${activeItem === "MyProfilePage" ? "bg-[#8B7B72]  text-white":""}`}
            onClick={handleItemClick}
          >
            My Profile
          </button>
          
          
          <button
            style={{ fontWeight: "500", fontFamily: "Manrope",borderRadius:'24px',gap:'29px', lineHeight:'21.86px' }}
            className={`w-[122px]  p-[10px]  text-[16px] items-center text-center ${activeItem === "PasswordPage" ? "bg-[#8B7B72]  text-white":""}`}
            onClick={ handleItemClick2}
          >
            Password
          </button>
          
          
        </div>
      </div>

       <div className='w-[1032px] h-[724px] gap-[16px] p-[24px] pt-0 ' >

      <div className="w-full h-[142px] p-6 flex justify-between items-center mb-6 border-2 border-[#D0D0D0] rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <div
                style={{ fontWeight: "700", lineHeight: "27.32px", fontFamily: "Manrope" }}
                className="text-[Manrope] text-[20px] text-[#3C3C3C]"
              >
                Ram Mahajan
              </div>
              <div
                style={{ fontWeight: "600", lineHeight: "19.12px", fontFamily: "Manrope" }}
                className="mt-2 text-[Manrope] text-[14px] text-[#5B5B5B]"
              >
                Manager
              </div>
              <div
                style={{ fontWeight: "400", lineHeight: "19.12px", fontFamily: "Manrope" }}
                className="mt-1 text-[Manrope] text-[14px] text-[#5B5B5B]"
              >
                Gurugram, Haryana
              </div>
            </div>
          </div>
          <button
            className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[114px] h-[48px]"
            onClick={handleEditClick}
          >
            <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
              <img src={edit} />
            </h4>
            <p>Edit</p>
          </button>
        </div>
        <div>
        {activeItem === 'MyProfilePage' && <MyProfilePage />}
        {activeItem === 'PasswordPage' && <PasswordPage />}
          
        </div>
        </div>


       
      </div>
  
  );
}

export default SettingPages;