import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";
import { IoIosArrowForward } from "react-icons/io";


import MyProfileAdmin from './MyProfileAdmin';
import PasswordAdmin from './PasswordAdmin';
import axios from 'axios';




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
      console.log('File', file);
      setImage(file);

    }
  };

  const handleImageUpload = async () => {
    inputRef.current.click();
    const formData = new FormData();
    formData.append('CoverImage', image);

    try {
      const res = await axios.put(`https://project-rof.vercel.app/api/settingsAdmin/CoverImage/${IdEmp}`, formData, {
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
      `https://project-rof.vercel.app/api/settingsAdmin/${employeeId}`
    );
    setAdminData(res.data);
  };
  useEffect(() => {
    gitAPiData(IdEmp);
  }, []);

  return (

    <div className='p-[24px]'>

      <h1
        className="font-bold flex items-center gap-1 pb-[20px]"
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

      <div className="flex h-[819px] w-[1285px] bg-white">
        <div className="w-[25%] h-[794px] text-black flex flex-col" style={{ borderRight: '1px solid #D0D0D0', alignItems: 'center' }}>
          <div className="flex flex-col items-center mt-10 w-[122px] h-[101px] gap-[17px] justify-between">

            <button
              style={{ fontWeight: "500", fontFamily: "Manrope", borderRadius: '24px', gap: '29px', lineHeight: '21.86px' }}
              className={`w-[122px]  p-[10px]   text-[16px] items-center text-center ${activeItem === "MyProfileAdmin" ? "bg-[#8B7B72]  text-white" : ""}`}
              onClick={handleItemClick}
            >
              My Profile
            </button>


            <button
              style={{ fontWeight: "500", fontFamily: "Manrope", borderRadius: '24px', gap: '29px', lineHeight: '21.86px' }}
              className={`w-[122px]  p-[10px]  text-[16px] items-center text-center ${activeItem === "PasswordAdmin" ? "bg-[#8B7B72]  text-white" : ""}`}
              onClick={handleItemClick2}
            >
              Password
            </button>


          </div>
        </div>

        <div className='w-[1032px] h-[724px] gap-[16px] p-[24px] ' >

          <div className="w-full h-[142px] p-6 flex justify-between items-center mb-6 border-2 border-[#D0D0D0] rounded-lg">
            <div className="flex items-center gap-4" >
              <div onChange={handleImageChange} >
                {image ? <img src={URL.createObjectURL(image)} alt='' style={{
                  position: 'absolute',
                  top: '196px',
                  width: '77px',
                  height: '77px',
                  borderRadius: '50%',
                }} /> : <img src='' alt='' />}
                <img src={adminData.CoverImage} className="w-[77px] h-[77px] bg-gray-300 rounded-full mr-4" />
                <input type='file' ref={inputRef} style={{ display: 'none' }} />
              </div>
              <div>
                <div
                  style={{ fontWeight: "700", lineHeight: "27.32px", fontFamily: "Manrope" }}
                  className="text-[Manrope] text-[20px] text-[#3C3C3C]"
                >
                  {adminData.name}
                </div>
                <div
                  style={{ fontWeight: "600", lineHeight: "19.12px", fontFamily: "Manrope" }}
                  className="mt-2 text-[Manrope] text-[14px] text-[#5B5B5B]"
                >
                  {adminData.role}
                </div>
                <div
                  style={{ fontWeight: "400", lineHeight: "19.12px", fontFamily: "Manrope" }}
                  className="mt-1 text-[Manrope] text-[14px] text-[#5B5B5B]"
                >
                  {adminData.location}
                </div>
              </div>
            </div>
            <button
              className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[138px] h-[48px] justify-end"
              onClick={handleEditClick && handleImageUpload}
            >
              <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                <img src={edit} />
              </h4>
              <p>Upload</p>
            </button>
          </div>


          <div>
            {activeItem === 'MyProfileAdmin' && <MyProfileAdmin />}
            {activeItem === 'PasswordAdmin' && <PasswordAdmin email={adminData.email} />}


          </div>
        </div>
      </div>

    </div>



  );
}

export default SettingPageAdmin;