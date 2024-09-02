import React, { useState } from "react";
import SuperAdminScreen from '.././components/Role/SuperAdminScreen';



import Logo from "../assets/Logo.png";
import Eye from "../assets/Eye.png";
import { Link } from 'react-router-dom';
import SalesExecutiveScreen from ".././components/Role/SalesExecutiveScreen";
import SalesManagerScreen from ".././components/Role/SalesManagerScreen";

function LoginOne() {
  const [role, setRole] = useState("Super Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
    //  send the data to backend
  };

  const handleLogin = () => {

   
      // e.preventDefault();
      // if (!email || !password) {
      //   setErrorMessage("Please fill in both email and password.");
      //   return;
      // }
      // setErrorMessage("");
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Role:", role);
     

    if ((role === 'SuperAdmin' && email === 'superadmin@gmail.com' && password === 'password') ||
      (role === 'SalesExecutive' && email === 'salesexecutive@gmail.com' && password === 'password') ||
      (role === 'SalesManager' && email === 'salesmanager@gmail.com' && password === 'password')) {
      setLoggedIn(true);
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  if (loggedIn) {
    return (
      <div>
        {role === "SuperAdmin" && <SuperAdminScreen />}
        {role === "SalesExecutive" && <SalesExecutiveScreen />}
        {role === "SalesManager" && <SalesManagerScreen />}
      </div>
    );
  }

  return (
    // <div className="text-center">
    //   <h2 style={{background:'grey'}}>Login</h2>
    //   <div>
    //     <label>
    //       <input
    //         type="radio"
    //         value="SuperAdmin"
    //         checked={role === 'SuperAdmin'}
    //         onChange={(e) => setRole(e.target.value)}
    //       />
    //       Super Admin
    //     </label><br />
    //     <label>
    //       <input
    //         type="radio"
    //         value="SalesExecutive"
    //         checked={role === 'SalesExecutive'}
    //         onChange={(e) => setRole(e.target.value)}
    //       />
    //       Sales Executive
    //     </label> <br />
    //     <label>
    //       <input
    //         type="radio"
    //         value="SalesManager"
    //         checked={role === 'SalesManager'}
    //         onChange={(e) => setRole(e.target.value)}
    //       />
    //       Sales Manager
    //     </label>
    //   </div> <br />
    //   <div>
    //     <input style={{border:'1px solid grey'}}
    //       type="text"
    //       placeholder="ID"
    //       value={id}
    //       onChange={(e) => setId(e.target.value)}
    //     />
    //   </div> <br />
    //   <div>
    //     <input style={{border:'1px solid grey'}}
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div> <br />
    //   <button style={{background:'red', padding:'6px 12px'}} onClick={handleLogin}>Login</button>
    // </div>

    <div className="bg-[#F7F3E8] flex items-center justify-center min-h-screen px-4">
    <div className="bg-white shadow-md rounded-lg py-[40px] px-[20px] text-center w-[555px] h-auto max-w-lg hero">
      <img
        src={Logo}
        alt="ROF Logo"
        className="mx-auto mb-4 w-[188px] h-[131px] max-w-xs"
      />
      <p
        style={{
          fontFamily: "Poppins",
          fontSize: "32px",
          fontWeight: "600",
          lineHeight: "36px",
          textAlign: "center",
        }}
        className="text-[#353535] mb-2"
      >
        Welcome to ROF Team Portal
      </p>

      <p
        style={{
          fontFamily: "Manrope",
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "24.59px",
          textAlign: "center",
        }}
        className="text-[#747474] mb-6"
      >
        Use your work email to log in your team workspace
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 mx-auto" style={{ maxWidth: '472px' }}>
          <div className="flex justify-between mb-6">
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",

              }}
            >
              <input
                type="radio"
                
                value="SuperAdmin"
             checked={role === 'SuperAdmin'}
             onChange={(e) => setRole(e.target.value)}
                className="mr-2 custom-radio"
              />
              Super Admin
            </label>
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",

              }}
            >
              <input
                type="radio"
                value="SalesManager"
             checked={role === 'SalesManager'}
             onChange={(e) => setRole(e.target.value)}
                className="mr-2 custom-radio "
              />
              Manager
            </label>
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",

              }}
            >
              <input
                type="radio"
                
                value="SalesExecutive"
                         checked={role === 'SalesExecutive'}
                         onChange={(e) => setRole(e.target.value)}
                className="mr-2 custom-radio "
              />
              Sales Executive
            </label>
          </div>

          <label
            style={{
              fontFamily: "Manrope",
              fontSize: "38px",
              fontWeight: "500",
              width:"66px",
              height:"25px",
              
            }}
            className="block text-[#353535] text-start text-sm font-bold mb-2 w-[425px] h-[25px]"
            htmlFor="email"

          >
            Email ID 
          </label>
          <input
            className="shadow appearance-none border rounded w-full h-[49px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              borderRadius: '8px',
              padding:'12px 24px 12px 24px',
            }}
          />
        </div>

        <div className="text-left mb-6 mx-auto" style={{ maxWidth: '426px' }}>
          <div className="flex justify-between items-center mb-2">
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",
              }}
              className="text-[#353535] text-sm font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <Link to="/login-two">
              <span
                className="text-[#632E04] text-sm font-medium"
                style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500",width:"81px",height:"20px",padding:'12px 24px 12px 24px', }}
              >
                Forgot your password?
              </span>
            </Link>
          </div>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={10}
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

        <button onClick={handleLogin} type="submit" className="bg-[#632E04] shadow-xl text-white font-bold rounded w-full h-[49px] mx-auto" style={{ maxWidth: '426px', fontFamily: 'Manrope', fontSize: '18px', fontWeight: '500', borderRadius: '8px',padding:"10px 10px 10px 10px", }}>
          Log in
        </button>
      </form>
    </div>
  </div>
  );
}

export default LoginOne;