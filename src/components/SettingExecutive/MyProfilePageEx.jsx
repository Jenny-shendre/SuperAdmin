import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";
import { Link } from "react-router-dom";
import "../Home.css";
import axios from "axios";

const MyProfilePageEx = () => {
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Executive",
    employeeId: "",
    country: "",
    location: "",
    postalCode: "",
    aadharCard: "",
  });
  const [IdEmp, setIdEmp] = useState(
    localStorage.getItem("EmpId") || "ROFEX10"
  );
  const [editMode, setEditMode] = useState(false);
  const [editMode1, setEditMode1] = useState(false);
  const [ClientID, setClientID] = useState();

  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setIdEmp(EmpId);
  }, []);
  const gitAPiData = async (employeeId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/settingsExecutive/${employeeId}`
    );
    setProfile(res.data);
  };

  useEffect(() => {
    gitAPiData(IdEmp);
  }, []);
  const toggleEditMode = async (employeeId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/settingsExecutive/${employeeId}`,
        {
          ...profile,
        }
      );
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(`Setting`, profile);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    console.log(profile);
    toggleEditMode(profile.employeeId);
  };
  const handleEditClick2 = () => {
    setEditMode1(!editMode1);
    console.log(profile);
    toggleEditMode(profile.employeeId);
  };
  return (
    <div className="px-[24px] py-[8px]">
      <hr className="mb-6" />

      {/* Second Box */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2
            style={{ fontWeight: "700", fontFamily: "Manrope" }}
            className="text-[#3C3C3C] text-[Manrope] text-[20px]">
            Personal Information
          </h2>
          <button
            className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[114px] h-[48px] "
            onClick={handleEditClick}>
            <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
              <img src={edit} />
            </h4>
            <p style={{ fontFamily: "Manrope" }}>
              {editMode ? "Save" : "Edit"}
            </p>
          </button>
        </div>

        <div className="flex flex-wrap dumbo mb-2 ">
          <div className="mr-24 mb-4  ">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter first name"
              readOnly={!editMode}
            />
          </div>
          <div className="mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter phone number"
              readOnly={!editMode}
            />
          </div>
        </div>
        <div className="flex flex-wrap dumbo mb-2">
          <div className="mr-24 mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter email address"
              readOnly={true}
            />
          </div>

          <div>
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={profile.employeeId}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter employee ID"
              readOnly={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap dumbo">
          <div className="mr-24 mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Designation
            </label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter designation"
              readOnly={true}
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
            className="text-[#3C3C3C] text-[Manrope] text-[20px]">
            Address
          </h2>
          <button
            className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[114px] h-[48px] "
            onClick={handleEditClick2}>
            <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
              <img src={edit} />
            </h4>
            <p style={{ fontFamily: "Manrope" }}>
              {editMode1 ? "Save" : "Edit"}
            </p>
          </button>
        </div>

        <div className="flex flex-wrap dumbo mt-6">
          <div className="mr-24 mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter country"
              readOnly={!editMode1}
            />
          </div>
          <div className="mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              City/State
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter city/state"
              readOnly={!editMode1}
            />
          </div>
        </div>
        <div className="flex flex-wrap dumbo">
          <div className="mr-24 mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={profile.postalCode}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter postal code"
              readOnly={!editMode1}
            />
          </div>
          <div className="mb-4">
            <label
              style={{
                fontWeight: "400",
                lineHeight: "19.12px",
                fontFamily: "Manrope",
              }}
              className="block text-[#5B5B5B] text-[14px] text-[Manrope] mb-[4px]">
              Adhaar Card
            </label>
            <input
              type="text"
              name="aadharCard"
              value={profile.aadharCard}
              onChange={handleInputChange}
              className="w-[280px] h-[39px] px-[10px] py-[10px] border rounded-lg "
              placeholder="Enter Adhaar card number"
              readOnly={!editMode1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePageEx;
