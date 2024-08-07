import React from 'react';
import  { useState } from "react";
import { FaRegEdit } from "react-icons/fa";


const PasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleButtonClick = (data) => {
    console.log(data);
  };

  const handleEditClick = () => {
    const data = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };
    handleButtonClick(data);
  };
  return (
    <div className="p-4">
              <div>
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontWeight: '700', fontFamily: 'Manrope' }} className="text-[#3C3C3C] text-[Manrope] text-[20px]">Change Password</h2>
            <button
              className="flex lg:px-8 lg:py-3 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full w-[114px] h-[48px] mr-7"
              onClick={handleEditClick}
            >
              <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                <FaRegEdit />
              </h4>
              <p>Edit</p>
            </button>
          </div>

          <div className="mb-2">
            <div className="mr-24 mb-4">
              <label style={{ fontWeight: '400', lineHeight: '19.12px',fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">Old Password</label>
              <input
                type="text"
                className="w-[280px] h-[39px] p-4 border rounded-lg"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mr-24 mb-4">
              <label style={{ fontWeight: '400', lineHeight: '19.12px',fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">Add New Password</label>
              <input
                type="text"
                className="w-[280px] h-[39px] p-2 border rounded-lg"
                placeholder="Add new Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <div className="mr-24 mb-4">
              <label style={{ fontWeight: '400', lineHeight: '19.12px',fontFamily:"Manrope" }} className="block text-[#5B5B5B] text-[14px] text-[Manrope]">Confirm New Password</label>
              <input
                type="text"
                className="w-[280px] h-[39px] p-2 border rounded-lg"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr className="mt-1 mb-4" />


    </div>
  );
}

export default PasswordPage;