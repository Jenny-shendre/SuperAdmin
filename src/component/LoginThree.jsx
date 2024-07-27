import React, { useState, useEffect, useRef } from 'react';
import Logo from "../assets/Logo.png";
import Eye from "../assets/Eye.png";
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

function LoginThree() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showGuidelines, setShowGuidelines] = useState(false);
  const navigate = useNavigate();
  const guidelinesRef = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 10;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const specialCharPattern = /[@#$%]/;
    const numberPattern = /[0-9]/;

    if (password.length < minLength || password.length > maxLength) {
      return "Password length should be a minimum of 8 characters and a maximum of 10 characters.";
    }
    if (!uppercasePattern.test(password)) {
      return "Password must include at least one uppercase letter (A-Z).";
    }
    if (!lowercasePattern.test(password)) {
      return "Password must include at least one lowercase letter (a-z).";
    }
    if (!specialCharPattern.test(password)) {
      return "Password must include at least one special character (e.g., @, #, $, %).";
    }
    if (!numberPattern.test(password)) {
      return "Password must include at least one number (0-9).";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords does not match. Please try again.");
      return;
    }
    setErrorMessage("");
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // send the data to backend
    navigate('/login-four');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guidelinesRef.current && !guidelinesRef.current.contains(event.target)) {
        setShowGuidelines(false);
      }
    };

    if (showGuidelines) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuidelines]);

  return (
    <div className="bg-[#F7F3E8] flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-lg py-8 px-8 text-center w-[555px] max-w-lg">
        <img
          src={Logo}
          alt="ROF Logo"
          className="mx-auto mb-4 w-[188px] h-[131px] max-w-xs"
        />
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "400",
            lineHeight: "36px",
            textAlign: "center",
          }}
          className="text-[#353535] mb-8"
        >
          Enter details below to get access to your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="text-left mb-4 mx-auto relative" style={{ maxWidth: '426px' }}>
            <div className="flex justify-between items-center mb-2">
              <label
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                className="text-[#353535] text-sm font-bold"
                htmlFor="new-password"
              >
                Enter New Password
              </label>
              <span
                className="text-sm font-medium text-[#632E04] cursor-pointer"
                style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}
                onClick={() => setShowGuidelines(true)}
              >
                Password Guidelines ?
              </span>
            </div>
            <div className="flex items-center">
              <input
                className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="new-password"
                type="text"
                placeholder="Abcd@12345"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                maxLength={10} // Set maxLength to 10
                style={{
                  width: '426px',
                  borderWidth: '1.5px',
                  borderColor: '#353535',
                  fontFamily: "Manrope",
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
          {showGuidelines && (
            <div
              ref={guidelinesRef}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            >
              <div
                className="relative bg-[#F7F3E8] text-black  p-4 rounded-lg shadow-md guidelines-label"
                style={{ fontFamily: "Manrope", fontSize: "16px", fontWeight: "500", width: '426px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={Logo}
                  alt="ROF Logo"
                  className="mx-auto mb-4 w-[188px] h-[131px] max-w-xs"
                />
                <hr className='mt-3 border-[#632E04]' />
                <p className='text-[25px] font-bold mt-2 text-[#632E04]'>Password Guidelines:</p>
                <ul className=" text-left">
                  <p className='text-center mt-3'>Password length should be a minimum of 8 characters and a maximum of 10 characters.</p>
                  <hr className='mt-3 border-[#632E04]' />
                  <li className='mt-4 text-center'> <span className='text-[18px] font-bold text-[#632E04]'>Your password must include:</span>
                    <ul className=" mt-6">
                      <li>At least one special character (e.g., @, #, $, %)</li>
                      <li className='mt-1'>At least one uppercase letter (A-Z)</li>
                      <li>At least one lowercase letter (a-z)</li>

                      <li>At least one number (0-9)</li>
                    </ul>
                  </li>
                </ul>
                <span
                  className='absolute right-2 text-[#632E04] cursor-pointer'
                  onClick={() => setShowGuidelines(false)}
                  style={{ fontFamily: "Manrope", fontSize: "60px", fontWeight: "500", marginTop: "-471px" }}
                >
                  &times;
                </span>
              </div>
            </div>
          )}
          <div className="text-left mb-6 mx-auto" style={{ maxWidth: '426px' }}>
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",
              }}
              className="block text-[#353535] text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="confirm-password"
                type={passwordVisible ? "text" : "password"}
                placeholder="**********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                maxLength={10} // Set maxLength to 10
                style={{
                  width: '426px',
                  borderWidth: '1.5px',
                  borderColor: '#353535',
                  fontFamily: "Manrope",
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '8px'
                }}
              />
              <img
                src={Eye}
                alt="Toggle Password Visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 mb-4" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
              {errorMessage}
            </p>
          )}
          <button type="submit" className="bg-[#632E04] shadow-xl text-white font-bold py-2 px-4 rounded w-full h-[45px] mx-auto" style={{ maxWidth: '426px', fontFamily: 'Manrope', fontSize: '18px', fontWeight: '500', borderRadius: '8px' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginThree;
