import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OverViewAdmin from "../Overview/OverViewAdmin";

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
      <h1 style={{
        fontFamily: 'Poppins',
        fontSize: '24px',
        fontWeight: '500',
        lineHeight: '36px',
        textAlign: 'left',
        color:'black',
        padding:'24px 0px 0px 24px'
        
      }}>
        Home / <span  style={{
        fontFamily: 'Poppins',
        fontSize: '24px',
        fontWeight: '400',
        lineHeight: '36px',
        textAlign: 'left',
        color:'black'

        
      }}>{activeItem}</span>
      </h1>

      <OverViewAdmin />
    </div>
  );
};

export default BreadCrumbs;
