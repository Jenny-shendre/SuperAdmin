import React from 'react';
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";
import { Link } from 'react-router-dom';
import "../Home.css";


const MyProfileAdmin = () => {
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
    <div className="px-[24px] py-[8px]">
              <hr className="mb-6" />

{/* Second Box */}
<div>
  <div className="flex justify-between items-center mb-4">
    <h2
      style={{ fontWeight: "700", fontFamily: "Manrope" }}
      className="text-[#3C3C3C] text-[Manrope] text-[20px]"
    >
      Personal Information
    </h2>
    <button
      className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[114px] h-[48px] "
      onClick={handleEditClick}
    >
      <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
        <img src={edit} />
      </h4>
      <p style={{fontFamily:'Manrope'}}>Edit</p>
    </button>
  </div>

  <div className="flex flex-wrap dumbo mb-2 ">
    <div className="mr-24 mb-4  ">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        value={profile.firstName}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter first name"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        value={profile.lastName}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg"
        placeholder="Enter last name"
      />
    </div>
  </div>
  <div className="flex flex-wrap dumbo mb-2">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Email Address
      </label>
      <input
        type="text"
        name="email"
        value={profile.email}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter email address"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        value={profile.phoneNumber}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter phone number"
      />
    </div>
  </div>
  <div className="flex flex-wrap dumbo">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Designation
      </label>
      <input
        type="text"
        name="designation"
        value={profile.designation}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter designation"
      />
    </div>
    <div>
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Employee ID
      </label>
      <input
        type="text"
        name="employeeId"
        value={profile.employeeId}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter employee ID"
      />
    </div>
  </div>
</div>

<hr className="mt-1 mb-4" />

{/* Third Box */}
<div>
  <div className="flex justify-between items-center ">
    <h2
      style={{ fontWeight: "700", fontFamily: "Manrope" }}
      className="text-[#3C3C3C] text-[Manrope] text-[20px]"
    >
      Address
    </h2>
    <button
      className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[114px] h-[48px] "
      onClick={handleEditClick}
    >
      <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
        <img src={edit} />
      </h4>
      <p style={{fontFamily:'Manrope'}}>Edit</p>
    </button>
  </div>

  <div className="flex flex-wrap dumbo mt-6">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Country
      </label>
      <input
        type="text"
        name="country"
        value={profile.country}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter country"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        City/State
      </label>
      <input
        type="text"
        name="cityState"
        value={profile.cityState}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter city/state"
      />
    </div>
  </div>
  <div className="flex flex-wrap dumbo">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Postal Code
      </label>
      <input
        type="text"
        name="postalCode"
        value={profile.postalCode}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter postal code"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
        Adhaar Card
      </label>
      <input
        type="text"
        name="adhaarCard"
        value={profile.adhaarCard}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
        placeholder="Enter Adhaar card number"
      />
    </div>
  </div>
</div>

    </div>
  );
}

export default MyProfileAdmin;