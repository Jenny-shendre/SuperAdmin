import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import  { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import edit from "../../assets/Group.png";


import MyProfileAdmin from './MyProfileAdmin';
import PasswordAdmin from './PasswordAdmin';





const SettingPageAdmin = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const inputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode =  () => {
    setEditMode(!editMode);
  }

    ///Add Image Logic


  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
   inputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log('File', file);
    setImage(event.target.files[0]);
     };

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
    <div className='p-[24px]'>

<h1
          className="font-bold flex items-center gap-1 font-[Manrope] pb-[10px]"
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
            Settings
          </span>
        </h1>
    
      <div className="flex  min-h-screen  bg-[white] w-[1238px]">
        <div className="w-1/6 h-[794px]  text-black flex flex-col"style={{borderRight:'1px solid #D0D0D0', alignItems:'center'}}>
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

       <div className='w-[1032px] h-[724px] gap-[16px] p-[24px] ' >

      <div className="w-full h-[142px] p-6 flex justify-between items-center mb-6 border-2 border-[#D0D0D0] rounded-lg">
          <div className="flex items-center gap-4" >
            <div  onChange={handleImageChange}  >
  { image ? <img src={URL.createObjectURL(image)} alt='' style={{
        position: 'absolute',
        top: '196px',
        width: '77px',
        height: '77px',
        borderRadius: '50%',
  }}/> : <img src='' alt='' />}
  <img src={''} className="w-[77px] h-[77px] bg-gray-300 rounded-full mr-4"/>
             <input type='file' ref={inputRef} style={{display:'none'}}/>
            </div>
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
                Super Admin
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
            className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[138px] h-[48px]"
            onClick={handleEditClick && handleImageUpload}
          >
            <h4 className="w-[54px] h-[22px] lg:mt-1 lg:relative lg:right-2 gap-2">
              <img src={edit} />
            </h4>
            <p>Upload</p>
          </button>
        </div>

        
        <div>
        {activeItem === 'MyProfilePage' && <MyProfileAdmin />}
        {activeItem === 'PasswordPage' && <PasswordAdmin />}
          
        </div>
        </div>


       
      </div>
      </div>
  );
}

export default SettingPageAdmin;