import React, { useEffect, useState } from "react";
import axios from "axios";
import edit from "../../assets/Group.png";

const PasswordPage = ({ email }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userPhone, setUserPhone] = useState(email);

  useEffect(() => {
    setUserPhone(email); // Set user phone/email from props
  }, [email]);

  const handleEditClick = async () => {
    const data = {
      phone: userPhone,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/change-password`,
        data
      );
      console.log("Password Changed Successfully", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 py-4 lg:px-12 lg:py-6 2xl:h-auto lg:h-auto">
      <hr className="mb-6 text-gray-300 2xl:h-auto lg:h-auto" />
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-700 font-bold text-xl lg:text-2xl">
            Change Password
          </h2>
          <button
            className="flex items-center bg-[#3D2314] text-white rounded-full w-28 h-12 lg:w-36 lg:h-12 justify-center"
            onClick={handleEditClick}
          >
            {/* <div className="w-4 h-4 lg:w-5 lg:h-5 mr-2">
              <img src={edit} alt="Edit Icon" />
            </div> */}
            <p className="text-sm lg:text-base">Submit</p>
          </button>
        </div>

        {/* Old Password Input */}
        <div className="mb-4">
          <div className="lg:w-1/2">
            <label className="block text-gray-600 text-sm mb-2">
              Old Password
            </label>
            <input
              type="password"
              className="w-full lg:w-[360px] h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>

        {/* New Password Input */}
        <div className="mb-4">
          <div className="lg:w-1/2">
            <label className="block text-gray-600 text-sm mb-2">
              Add New Password
            </label>
            <input
              type="password"
              className="w-full lg:w-[360px] h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Add new Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Confirm New Password Input */}
        <div className="mb-4">
          <div className="lg:w-1/2">
            <label className="block text-gray-600 text-sm mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full lg:w-[360px] h-10 px-3 border border-gray-300 rounded-lg"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <hr className="mt-4 text-gray-300" />
    </div>
  );
};

export default PasswordPage;
