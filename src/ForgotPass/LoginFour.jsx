import React from 'react';
import Logo from "../assets/Logo.png";
import { Link } from 'react-router-dom';

function LoginFour() {
  return (
    <div className="bg-[#F7F3E8] flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center w-[555px] h-[408px] max-w-lg">
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
          Your Password has been successfully changed
        </p>
        <div className="mb-[70px]">
          <Link to="/">
            <button className="bg-[#632E04] text-white font-bold py-2 px-4 rounded w-full h-12 shadow-xl" style={{ maxWidth: '426px', fontFamily: 'Manrope', fontSize: '18px', fontWeight: '500', borderRadius: '8px' }}>
              Go back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginFour;
