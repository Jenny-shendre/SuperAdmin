import React, { useState } from 'react';
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from 'react-router-dom';

function LoginTwo() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setErrorMessage("");
    console.log("Generated OTP:", newOtp); // In real application, send this OTP to user's email
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !otp) {
      setErrorMessage("Please fill in both email and OTP.");
      return;
    }
    if (otp !== generatedOtp) {
      setErrorMessage("Invalid OTP. Please try again.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    console.log("Email:", email);
    console.log("OTP:", otp);
    // send the data to backend
    navigate('/login-three');
  };

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
          <div className="text-left mb-4 mx-auto" style={{ maxWidth: '426px' }}>
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",
              }}
              className="block text-[#353535] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Enter Email ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {!otpSent && (
              <button type="button" onClick={sendOtp} className="mt-8 bg-[#632E04] shadow-xl text-white font-bold py-2 px-4 rounded w-full h-[45px] mx-auto" style={{ maxWidth: '426px', fontFamily: 'Manrope', fontSize: '18px', fontWeight: '500', borderRadius: '8px' }}>
                Send OTP
              </button>
            )}
          </div>
          {otpSent && (
            <>
              <div className="text-left mb-6 mx-auto" style={{ maxWidth: '426px' }}>
                <label
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                  className="block text-[#353535] text-sm font-bold mb-2"
                  htmlFor="otp"
                >
                  Enter OTP
                </label>
                <input
                  className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="otp"
                  type="text"
                  placeholder="1234"
                  value={otp}
                  onChange={handleOtpChange}
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
              <button type="submit" className="bg-[#632E04] shadow-xl text-white font-bold py-2 px-4 rounded w-full h-[45px] mx-auto" style={{ maxWidth: '426px', fontFamily: 'Manrope', fontSize: '18px', fontWeight: '500', borderRadius: '8px' }}>
                Submit
              </button>
            </>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-4" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginTwo;
