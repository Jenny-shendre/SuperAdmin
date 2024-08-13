import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";

import MyProfilePage from './MyProfilePageEx';
import PasswordPage from './PasswordPageEx';
import MyProfilePageEx from './MyProfilePageEx';
import PasswordPageEx from './PasswordPageEx';
import axios from 'axios';




const SettingPagesEx = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const inputRef = useRef(null);
  const [executiveData, setExectiveData] = useState([]);
  const [image, setImage] = useState(null);



  const [editMode, setEditMode] = useState(false);

  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX10"
  );

  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setIdEmp(EmpId);
  }, []);



  ///Add Image Logic
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log('File', file);
      setImage(file);

    }
  };




  const handleImageUpload = async () => {

    inputRef.current.click();
    const formData = new FormData();
    formData.append('CoverImage', image);

    try {
      const res = await axios.put(`https://project-rof.vercel.app/api/settingsExecutive/CoverImage/${IdEmp}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      console.log("Image sent successfully", res);
    } catch (error) {
      console.log("Error occurred during image upload", error);
    }
   
  };

  const handleItemClick = () => {
    setActiveItem("MyProfilePageEx");

  };

  const handleItemClick2 = () => {
    setActiveItem("PasswordPageEx");

  };
  useEffect(() => {
    switch (locationPath) {
      case "/profileEx":
        setActiveItem("MyProfilePageEx");
        break;

      case "/passwordEx":
        setActiveItem("PasswordPageEx");
        break;


      default:
        setActiveItem("MyProfilePage");
        break;
    }
  }, []);
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Executive",
    employeeId: "",
    country: "",
    cityState: "",
    postalCode: "",
    aadharCard: "",
  });



  const gitAPiData = async (employeeId) => {
    const res = await axios.get(
      `https://project-rof.vercel.app/api/settingsExecutive/${employeeId}`
    );
    // console.log("response", res);
    setExectiveData(res.data);
  };

  useEffect(() => {
    gitAPiData(IdEmp);
  }, []);


  // console.log("executiveData", executiveData);



  const handleEditClick = () => {
    setEditMode(!editMode);
    toggleEditMode(executiveData.employeeId);
  };
  return (

    <div className="flex  min-h-screen ">
      <div className="w-1/6 h-[794px] text-black flex flex-col" style={{ borderRight: '1px solid #D0D0D0', alignItems: 'center' }}>
        <div className="flex flex-col items-center mt-10 w-[122px] h-[101px] gap-[17px] justify-between">

          <button
            style={{ fontWeight: "500", fontFamily: "Manrope", borderRadius: '24px', gap: '29px', lineHeight: '21.86px' }}
            className={`w-[122px]  p-[10px]   text-[16px] items-center text-center ${activeItem === "MyProfilePageEx" ? "bg-[#8B7B72]  text-white" : ""}`}
            onClick={handleItemClick}
          >
            My Profile
          </button>


          <button
            style={{ fontWeight: "500", fontFamily: "Manrope", borderRadius: '24px', gap: '29px', lineHeight: '21.86px' }}
            className={`w-[122px]  p-[10px]  text-[16px] items-center text-center ${activeItem === "PasswordPageEx" ? "bg-[#8B7B72]  text-white" : ""}`}
            onClick={handleItemClick2}
          >
            Password
          </button>


        </div>
      </div>

      <div className='w-[1032px] h-[724px] gap-[16px] p-[24px] pt-0 ' >

        <div className="w-full h-[142px] p-6 flex justify-between items-center mb-6 border-2 border-[#D0D0D0] rounded-lg">
          <div className="flex items-center gap-4" >
            <div onChange={handleImageChange} >
              {image ? <img src={URL.createObjectURL(image)} alt='Uploaded' style={{
                position: 'absolute',
                top: '196px',
                width: '77px',
                height: '77px',
                borderRadius: '50%',
              }} /> : <img src='' alt='' />}
              <img src={executiveData.CoverImage} alt='nk' className="w-[77px] h-[77px] bg-gray-300 rounded-full mr-4" />
              <input type='file' ref={inputRef} style={{ display: 'none' }} />
            </div>
            <div>
              <div
                style={{ fontWeight: "700", lineHeight: "27.32px", fontFamily: "Manrope" }}
                className="text-[Manrope] text-[20px] text-[#3C3C3C]"
              >
                {executiveData.name}
              </div>
              <div
                style={{ fontWeight: "600", lineHeight: "19.12px", fontFamily: "Manrope" }}
                className="mt-2 text-[Manrope] text-[14px] text-[#5B5B5B]"
              >
                {executiveData.role}
              </div>
              <div
                style={{ fontWeight: "400", lineHeight: "19.12px", fontFamily: "Manrope" }}
                className="mt-1 text-[Manrope] text-[14px] text-[#5B5B5B]"
              >
                {executiveData.location}
              </div>
            </div>
          </div>
          <button
            className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[138px] h-[48px]"
            onClick={handleEditClick && handleImageUpload}
            style={{ justifyContent: 'flex-end' }}
          >
            <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
              <img src={edit} />
            </h4>
            <p style={{ fontFamily: "Manrope" }}>
              {image ? "Upload" : "Select"}
            </p>

          </button>
        </div>


        <div>
          {activeItem === 'MyProfilePageEx' && <MyProfilePageEx />}
          {activeItem === 'PasswordPageEx' && <PasswordPageEx />}

        </div>
      </div>



    </div>

  );
}

export default SettingPagesEx;