import React from 'react';
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';


const MyProfilePage = () => {
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
    <div className="p-4">
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
        <FaRegEdit />
      </h4>
      <p>Edit</p>
    </button>
  </div>

  <div className="flex flex-wrap mb-2">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        value={profile.firstName}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-4 border rounded-lg "
        placeholder="Enter first name"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        value={profile.lastName}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg"
        placeholder="Enter last name"
      />
    </div>
  </div>
  <div className="flex flex-wrap mb-2">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Email Address
      </label>
      <input
        type="text"
        name="email"
        value={profile.email}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter email address"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        value={profile.phoneNumber}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter phone number"
      />
    </div>
  </div>
  <div className="flex flex-wrap">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Designation
      </label>
      <input
        type="text"
        name="designation"
        value={profile.designation}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter designation"
      />
    </div>
    <div>
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Employee ID
      </label>
      <input
        type="text"
        name="employeeId"
        value={profile.employeeId}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
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
        <FaRegEdit />
      </h4>
      <p>Edit</p>
    </button>
  </div>

  <div className="flex flex-wrap mt-6">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Country
      </label>
      <input
        type="text"
        name="country"
        value={profile.country}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter country"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        City/State
      </label>
      <input
        type="text"
        name="cityState"
        value={profile.cityState}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter city/state"
      />
    </div>
  </div>
  <div className="flex flex-wrap">
    <div className="mr-24 mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Postal Code
      </label>
      <input
        type="text"
        name="postalCode"
        value={profile.postalCode}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter postal code"
      />
    </div>
    <div className="mb-4">
      <label style={{ fontWeight: "400", lineHeight: "19.12px",fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">
        Adhaar Card
      </label>
      <input
        type="text"
        name="adhaarCard"
        value={profile.adhaarCard}
        onChange={handleInputChange}
        className="w-[280px] h-[39px] p-2 border rounded-lg "
        placeholder="Enter Adhaar card number"
      />
    </div>
  </div>
</div>

    </div>
  );
}

export default MyProfilePage;