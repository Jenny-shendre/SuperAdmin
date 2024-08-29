import React, { useEffect, useState } from "react";
import rofImage from "../../../assets/ROf Image 1.svg";
import navicon1 from "../../../assets/Vector (2).svg";
import navicon2 from "../../../assets/Vector (2)-2.svg";
import carbon_customer1 from "../../../assets/carbon_customer.svg";
import carbon_customer2 from "../../../assets/carbon_customer - Copy.svg";
import material1 from "../../../assets/add_notes (white).png";
import material2 from "../../../assets/ri_team-line.png";
import team2 from '../../../assets/Vector (4).png';
import material3 from "../../../assets/add_notes.png";
import Settings2 from "../../../assets/Settings.svg";
import Logout2 from "../../../assets/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/TokenUtils";

const SideNavM = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (initialLoad) {
      setActiveItem("Client");
      navigate("/SalesManager/Client");
      setInitialLoad(false); // Disable initial load after the first load
    } else {
      if (locationPath.startsWith("/SalesManager/Client")) {
        setActiveItem("Client");
      } else if (locationPath.startsWith("/SalesManager/My_Team")) {
        setActiveItem("My_Team");
      } else if (locationPath.startsWith("/SalesManager/ClientHistory")) {
        setActiveItem("My_Team");
      } else if (locationPath.startsWith("/SalesManager/IDMan")) {
        setActiveItem("Client");
      }}
  }, [locationPath, initialLoad]);

  return (
    <div
      style={{
        zIndex: "+1",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
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
          <Link to="/SalesManager/Client">
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
              Overview
            </li>
          </Link>
           <Link to="/SalesManager/My_Team">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${activeItem === "My_Team"
                ? "bg-[#3D2314] text-[#FFFFFF]"
                : ""
                }`}
              onClick={() => handleItemClick("My_Team")}
            >
              {activeItem === "My_Team" ? (
                <img
                  src={team2}
                  alt=""
                  style={{ width: "24px", marginBottom: "7px" }}
                />
              ) : (
                <img
                  src={material2}
                  alt=""
                  style={{ width: "24px", marginBottom: "7px" }}
                />
              )}
              My Team
            </li>
          </Link>

       {/*   <Link to="/SalesManager/Notes">
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
                <img src={material3} alt="" />
              )}
              Notes
            </li>
          </Link> */}
        </ul>
      </div>
      <div>
        <ul className="flex flex-col" style={{ gap: "8px" }}>
          <Link to="/SalesManager/Setting">
            <li
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "27.32px",
                textAlign: "left",
              }}
              className={`text-[#3D2314] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-sm lg:text-lg font-[Manrope] ${activeItem === "Setting"
                ? "bg-[#3D2314] text-[#FFFFFF]"
                : ""
                }`}
              onClick={() => handleItemClick("Setting")}
            >
              {activeItem === "Setting" ? (
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
            }}
            className={`text-[red] cursor-pointer font-medium flex flex-row gap-3 w-auto  lg:w-52 p-2 text-[s] lg:text-lg font-[Manrope]`}
          >
            <img src={Logout2} alt="Logout" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavM;
