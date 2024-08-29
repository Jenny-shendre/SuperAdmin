import React, { useEffect, useState } from "react";
import rofImage from "../../assets/ROf Image 1.svg";
import navicon1 from "../../assets/Vector (2).svg";
import navicon2 from "../../assets/Vector (2)-2.svg";
import carbon_customer1 from "../../assets/carbon_customer.svg";
import carbon_customer2 from "../../assets/carbon_customer - Copy.svg";
import material1 from "../../assets/material-symbols_real-estate-agent-outline-sharp - Copy.svg";
import material2 from "../../assets/material-symbols_real-estate-agent-outline-sharp.svg";
import ChannelPartners1 from "../../assets/Vectors (2).svg";
import ChannelPartners2 from "../../assets/Vectors (3).svg";
import Projects1 from "../../assets/ph_buildings-bold - Copy.svg";
import Projects2 from "../../assets/ph_buildings-bold.svg";
import Team1 from "../../assets/ri_team-line - Copy.svg";
import Team2 from "../../assets/ri_team-line.svg";
import mat1 from "../../assets/add_notes (white).png";
import mat2 from "../../assets/add_notes.png";
import Settings2 from "../../assets/Settings.svg";
import Logout2 from "../../assets/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utils/TokenUtils";

const Navber = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleItemClick = (item) => {
    if (activeItem !== item) {
      setActiveItem(item); // Set the active item
      navigate("/SuperAdmin/`${item}`"); // Navigate to the selected item
    }
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();

    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (initialLoad) {
      setActiveItem("OverViewAdmin");
      // navigate("/SuperAdmin");
      setInitialLoad(false); // Disable initial load after the first load
    } else {
      if (locationPath.startsWith("/SuperAdmin/Direct_Visitors")) {
        setActiveItem("Direct_Visitors");
      } else if (locationPath.startsWith("/SuperAdmin/Channel_Visitors")) {
        setActiveItem("ChannelVisitors");
      } else if (locationPath.startsWith("/SuperAdmin/Channel_Partners")) {
        setActiveItem("ChannelPartners");
      } else if (locationPath.startsWith("/SuperAdmin/Rainbow_overseas")) {
        setActiveItem("ChannelPartners");
      } else if (locationPath.startsWith("/SuperAdmin/EditForm2")) {
        setActiveItem("ChannelPartners");
      } else if (locationPath.startsWith("/SuperAdmin/Project")) {
        setActiveItem("Projects");
      } else if (locationPath.startsWith("/SuperAdmin/project/")) {
        setActiveItem("Projects");
      } else if (locationPath.startsWith("/SuperAdmin/Team")) {
        setActiveItem("Team");
      } else if (locationPath.startsWith("/SuperAdmin/Note_Pages")) {
        setActiveItem("Note_Pages");
      } else if (locationPath.startsWith("/SuperAdmin/SettingAdmin")) {
        setActiveItem("SettingAdmin");
      } else {
        setActiveItem("OverViewAdmin");
      }
    }
  }, [locationPath, initialLoad]);

  return (
    <div
      style={{
        zIndex: "+1",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="right-shadow border-0 bg-[#FFFFFF] h-screen text-white flex flex-col justify-between p-4 shadow-md  pt-0">
      <div
        className="flex flex-col  W-[70%] md::w-auto"
        style={{ gap: "10px" }}>
        <Link
          to="/SuperAdmin"
          style={{
            textAlign: "-webkit-center",
          }}>
          <img
            src={rofImage}
            alt="ROF"
            className="sm:w-[60%] mt-2 lg:mt-0 xl:w-40 xl:h-40 "
          />
        </Link>
        <ul className="flex flex-col " style={{ gap: "10px" }}>
          <Link to="/SuperAdmin/">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] font-medium flex flex-row gap-3  cursor-pointer w-auto  lg:w-52 p-2 lg:text-lg font-[Manrope] ${
                activeItem === "OverViewAdmin"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
              }`}
              onClick={() => handleItemClick("OverViewAdmin")}>
              {activeItem === "OverViewAdmin" ? (
                <img src={navicon2} alt="" className="w-4 lg:w-auto" />
              ) : (
                <img src={navicon1} alt="" />
              )}
              Overview
            </li>
          </Link>
          <Link to="/SuperAdmin/Direct_Visitors">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${
                activeItem === "Direct_Visitors"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
              }`}
              onClick={() => handleItemClick("Direct_Visitors")}>
              {activeItem === "Direct_Visitors" ? (
                <img src={carbon_customer1} alt="" />
              ) : (
                <img src={carbon_customer2} alt="" />
              )}
              Direct Visitors
            </li>
          </Link>
          <Link to="/SuperAdmin/Channel_Visitors">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${
                activeItem === "ChannelVisitors"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
              }`}
              onClick={() => handleItemClick("ChannelVisitors")}>
              {activeItem === "ChannelVisitors" ? (
                <img src={material1} alt="" />
              ) : (
                <img src={material2} alt="" />
              )}
              Channel Visitors
            </li>
          </Link>
          <Link to="/SuperAdmin/Channel_Partners">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "19px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${
                activeItem === "ChannelPartners"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
              }`}
              onClick={() => handleItemClick("ChannelPartners")}>
              {activeItem === "ChannelPartners" ? (
                <img src={ChannelPartners1} alt="" />
              ) : (
                <img src={ChannelPartners2} alt="" />
              )}
              Channel Partners
            </li>
          </Link>
          <Link to="/SuperAdmin/Project">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${
                activeItem === "Projects" ? "bg-[#3D2314] text-[#FFFFFF]" : ""
              }`}
              onClick={() => handleItemClick("Projects")}>
              {activeItem === "Projects" ? (
                <img src={Projects1} alt="" />
              ) : (
                <img src={Projects2} alt="" />
              )}
              Projects
            </li>
          </Link>
          <Link to="/SuperAdmin/Team">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
                width: "217px",
                height: "47px",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${
                activeItem === "Team" ? "bg-[#3D2314] text-[#FFFFFF]" : ""
              }`}
              onClick={() => handleItemClick("Team")}>
              {activeItem === "Team" ? (
                <img
                  src={Team1}
                  alt="Team"
                  style={{ width: "24px", marginBottom: "7px" }}
                />
              ) : (
                <img
                  src={Team2}
                  alt="Team"
                  style={{ width: "24px", marginBottom: "7px" }}
                />
              )}
              Team
            </li>
          </Link>

        </ul>
      </div>
      <div>
        <ul className="flex flex-col" style={{ gap: "8px" }}>
          <Link to="/SuperAdmin/SettingAdmin">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${
                activeItem === "SettingAdmin"
                  ? "bg-[#3D2314] text-[#FFFFFF]"
                  : ""
              }`}
              onClick={() => handleItemClick("SettingAdmin")}>
              {activeItem === "SettingAdmin" ? (
                <img src={Settings2} alt="" />
              ) : (
                <img src={Settings2} alt="" />
              )}
              Settings
            </li>
          </Link>
          <li
            onClick={handleLogOut}
            style={{
              fontFamily: "Manrope",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "27.32px",
              textAlign: "left",
              color: "#F13737",
            }}
            className={
              "text-[#F13737] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-[s] lg:text-lg font-[Manrope]"
            }>
            <img src={Logout2} alt="Logout" style={{ color: "#3D2314" }} />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navber;
