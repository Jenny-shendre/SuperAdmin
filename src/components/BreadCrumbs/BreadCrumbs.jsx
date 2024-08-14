import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OverViewAdmin from "../Overview/OverViewAdmin";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumbs = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    switch (locationPath) {
      case "/SuperAdmin":
        setActiveItem("Overview");
        break;
      case "/SuperAdmin/Direct_Visitors":
        setActiveItem("Overview");
        break;
      case "/SuperAdmin/Channel_Visitors":
        setActiveItem("ChannelVisitors");
        break;
      case "/SuperAdmin/Channel_Partners":
        setActiveItem("ChannelPartners");
        break;
      case "/SuperAdmin/Project":
        setActiveItem("Project");
        break;
      case "/SuperAdmin/Team":
        setActiveItem("Team");
        break;

      default:
        setActiveItem("DirectVisitors");
        break;
    }
  }, []);
  console.log(activeItem);
  return (
    <div>
       <h1
          className="font-bold flex items-center gap-1 font-[Manrope] p-[24px] pb-0"
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
          }}>
          Home
          <IoIosArrowForward style={{ color: "#1C1B1F" }} />
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "24px",
            }}
            className="font-medium font-[Manrope]">
            Overview
          </span>
        </h1>

      <OverViewAdmin />
    </div>
  );
};

export default BreadCrumbs;
