import React, { useEffect, useState } from "react";
import "./App.css";
import SuperAdminScreen from "../src/components/Role/SuperAdminScreen";
import SalesExecutiveScreen from "../src/components/Role/SalesExecutiveScreen";
import SalesManagerScreen from "../src/components/Role/SalesManagerScreen";
import Logo from "./assets/Logo.png";
import Eye from "./assets/Eye.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginCred() {
  const [role, setRole] = useState("super admin");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [isRadioChecked, setIsRadioChecked] = useState(false);

  const navigate = useNavigate();
  const handleRadioChange = (e) => {
    // setIsRadioChecked(!isRadioChecked);
    setIsRadioChecked(true);
    setRole(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // phone & Password validation

    if (!phone || !password) {
      setErrorMessage("Please fill in both phone and password.");
      return;
    }

    // phone validation

    // if (!/\S+@\S+\.\S+/.test(phone)) {
    //   setErrorMessage("Please enter a valid phone address.");
    //   return;
    // }
    // Password validation

    if (
      password.length < 6 ||
      !/[A-Za-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setErrorMessage("Please enter a correct password.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages

    const loginData = {
      phone: phone,
      password: password,
      role: role,
    };
    //  send the data to backend
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/login`,
        loginData
      );
      console.log("Response rend", res);
      const { token, role: userRole, employeeId, email } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("EmpId", employeeId);
      localStorage.setItem("phone", phone);
      localStorage.setItem("email", email);

      setRole(userRole);
      setLoggedIn(true);
      navigate("/SuperAdmin");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  // useEffect(() => {}, []);
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <div>
        {role === "super admin" && <SuperAdminScreen />}
        {role === "sales executive" && <SalesExecutiveScreen />}
        {role === "manager" && <SalesManagerScreen />}
      </div>
    );
  }

  return (
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
          className="text-[#353535] mb-2">
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
          className="text-[#747474] mb-6">
          Use your work phone to log in your team workspace
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 mx-auto" style={{ maxWidth: "426px" }}>
            <div className="flex justify-between mb-6">
              <label
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                }}>
                <input
                  type="radio"
                  value="super admin"
                  checked={role === "super admin" && isRadioChecked}
                  onChange={handleRadioChange}
                  className="mr-2 custom-radio"
                />
                Super Admin
              </label>
              <label
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                }}>
                <input
                  type="radio"
                  value="manager"
                  checked={role === "manager" && isRadioChecked}
                  onChange={handleRadioChange}
                  className="mr-2 custom-radio"
                />
                Manager
              </label>
              <label
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                }}>
                <input
                  type="radio"
                  value="sales executive"
                  checked={role === "sales executive" && isRadioChecked}
                  onChange={handleRadioChange}
                  className="mr-2 custom-radio"
                />
                Sales Executive
              </label>
            </div>

            <div
              className="jumbo"
              style={{ filter: isRadioChecked ? "none" : "opacity(35%)" }}>
              <label
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                className="block text-[#353535] text-start text-sm font-bold mb-2"
                htmlFor="phone">
                Phone number
              </label>
              <input
                className="shadow appearance-none  rounded w-full h-[49px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="phone"
                disabled={!isRadioChecked}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "426px",
                  borderWidth: "1.5px",
                  borderColor: "#353535",
                  border: "1.5px solid rgba(53, 53, 53, 0.5)",
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  // backgroundColor: !isRadioChecked ? '#e0e0e0' : 'white'
                }}
              />
              <br />
              <br />

              <div
                className="text-left mb-6 mx-auto"
                style={{ maxWidth: "426px" }}>
                <div className="flex justify-between items-center mb-2">
                  <label
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                    className="text-[#353535] text-sm font-bold"
                    htmlFor="password">
                    Password
                  </label>
                  <Link to="/login-two">
                    <span
                      className="text-[#632E04] text-sm font-medium"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}>
                      Forgot your password?
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className="shadow appearance-none rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    id="password"
                    disabled={!isRadioChecked}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={15}
                    style={{
                      width: "426px",
                      borderWidth: "1.5px",
                      borderColor: "#353535",
                      fontFamily: "Manrope",
                      border: "1.5px solid rgba(53, 53, 53, 0.5)",
                      fontSize: "18px",
                      fontWeight: "500",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      // backgroundColor: !isRadioChecked ? '#e0e0e0' : 'white'
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
                <p
                  className="text-red-500 mb-4"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!isRadioChecked}
                className=" bg-[#632E04] shadow-xl text-white font-bold py-2 px-4 rounded w-full h-[45px] mx-auto"
                style={{
                  maxWidth: "426px",
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                  borderRadius: "8px",
                }}>
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginCred;
