import React, { useEffect, useState } from "react";
import rofImage from "../../../assets/ROf Image 1.svg";
import navicon1 from "../../../assets/Vector (2).svg";
import navicon2 from "../../../assets/Vector (2)-2.svg";
import carbon_customer1 from "../../../assets/carbon_customer.svg";
import carbon_customer2 from "../../../assets/carbon_customer - Copy.svg";
import material1 from "../../../assets/add_notes (white).png";
import material2 from "../../../assets/add_notes.png";
import Settings2 from "../../../assets/Settings.svg";
import Logout2 from "../../../assets/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/TokenUtils";

const SideNav = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();


  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    switch (locationPath) {
      case "/SalesExecutive/":
        setActiveItem("OverviewPage");
        break;

      case "/SalesExecutive/Client":
        setActiveItem("Client");
        break;
      case "/SalesExecutive/Notes":
        setActiveItem("Notes");
        break;

      default:
        setActiveItem("OverviewPage");
        break;
    }
  }, []);

  return (
    <div
      style={{ zIndex: "+1", boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
      className="right-shadow border-0 bg-[#FFFFFF] h-screen text-white flex flex-col justify-between p-4 shadow-md  pt-0"
    >
      <div
        className="flex flex-col  W-[70%] md::w-auto"
        style={{ gap: "10px" }}
      >
        <Link
          to="/"
          style={{
            textAlign: "-webkit-center",
          }}
        >
          <img
            src={rofImage}
            alt="ROF"
            className="sm:w-[60%] mt-2 lg:mt-0 xl:w-40 xl:h-40 "
          />
        </Link>
        <ul className="flex flex-col " style={{ gap: "10px" }}>
          <Link to="/SalesExecutive/">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] font-medium flex flex-row gap-3  cursor-pointer w-auto  lg:w-52 p-2 lg:text-lg font-[Manrope] ${activeItem === "Overview" ? "bg-[#3D2314] text-[#FFFFFF]" : ""
                }`}
              onClick={() => handleItemClick("Overview")}
            >
              {activeItem === "Overview" ? (
                <img src={navicon2} alt="" className="w-4 lg:w-auto" />
              ) : (
                <img src={navicon1} alt="" />
              )}
              Overview
            </li>
          </Link>
          <Link to="/SalesExecutive/Client">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${activeItem === "Client"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
                }`}
              onClick={() => handleItemClick("Client")}
            >
              {activeItem === "Client" ? (
                <img src={carbon_customer1} alt="" />
              ) : (
                <img src={carbon_customer2} alt="" />
              )}
              Client
            </li>
          </Link>
          <Link to="/SalesExecutive/Notes">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${activeItem === "Notes"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
                }`}
              onClick={() => handleItemClick("Notes")}
            >
              {activeItem === "Notes" ? (
                <img src={material1} alt="" />
              ) : (
                <img src={material2} alt="" />
              )}
              Notes
            </li>
          </Link>

        </ul>
      </div>
      <div>
        <ul className="flex flex-col" style={{ gap: "8px" }}>
          <li
            style={{
              fontFamily: "Manrope",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "27.32px",
              textAlign: "left",
            }}
            className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] `}
          >
            <img src={Settings2} alt="Settings" />
            Settings
          </li>
          <li onClick={handleLogOut}
            style={{
              fontFamily: "Manrope",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "27.32px",
              textAlign: "left",
            }}
            className={`text-[red] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-[s] lg:text-lg font-[Manrope] `}
          >
            <img src={Logout2} alt="Logout" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;