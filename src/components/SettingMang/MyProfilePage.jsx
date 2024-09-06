import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import edit from "../../assets/Group.png";
import axios from "axios";

const MyProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    employeeId: "",
    country: "",
    location: "",
    postalCode: "",
    aadharCard: "",
  });

  const [IdEmp, setIdEmp] = useState(localStorage.getItem("EmpId") || "ROFEMO3");

  useEffect(() => {
    const EmpId = localStorage.getItem("EmpId");
    setIdEmp(EmpId);
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [editMode1, setEditMode1] = useState(false);

  const gitAPiData = async (employeeId) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/settingsManager/${employeeId}`);
    setProfile(res.data);
  };

  useEffect(() => {
    gitAPiData(IdEmp);
  }, []);

  const toggleEditMode = async (employeeId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/settingsManager/${employeeId}`,
        { ...profile }
      );
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    toggleEditMode(profile.employeeId);
  };

  const handleEditClick2 = () => {
    setEditMode1(!editMode1);
    toggleEditMode(profile.employeeId);
  };

  return (
    <div className="p-6 lg:p-12">
      <hr className="mb-6" />

      {/* Personal Information Section */}
      <div className="h-full">
        <div className="h-4 flex justify-between items-center mb-4">
          <h2 className="text-gray-800 font-bold text-xl lg:text-2xl">Personal Information</h2>
          <button
            className="flex border border-green-300 items-center bg-[#3D2314] text-white rounded-full w-28 h-12 justify-center lg:w-36 lg:h-12"
            onClick={handleEditClick}
          >
            <img src={edit} alt="edit" className="w-5 h-5 mr-2" />
            <p> {editMode ? "Save" : "Edit"} </p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter first name"
              readOnly={!editMode}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter phone number"
              readOnly={!editMode}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Email Address</label>
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter email address"
              readOnly={true}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={profile.employeeId}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter employee ID"
              readOnly={true}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Designation</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter role"
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Address Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 font-bold text-xl lg:text-2xl">Address</h2>
          <button
            className="flex items-center bg-[#3D2314] text-white rounded-full w-28 h-12 justify-center lg:w-36 lg:h-12"
            onClick={handleEditClick2}
          >
            <img src={edit} alt="edit" className="w-5 h-5 mr-2" />
            <p>{editMode1 ? "Save" : "Edit"}</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 text-sm mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter country"
              readOnly={!editMode1}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">City/State</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter city/state"
              readOnly={!editMode1}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={profile.postalCode}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter postal code"
              readOnly={!editMode1}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Aadhar Card</label>
            <input
              type="text"
              name="aadharCard"
              value={profile.aadharCard}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Enter Aadhar card number"
              readOnly={!editMode1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
