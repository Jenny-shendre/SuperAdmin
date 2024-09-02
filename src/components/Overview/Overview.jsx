import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

const Overview = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    switch (locationPath) {
      case "/SuperAdmin":
        setActiveItem("Overview");
        break;
      case "/SuperAdmin/Direct_Visitors":
        setActiveItem("Direct_Visitors");
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
        setActiveItem("Overview");
        break;
    }
  }, []);
  console.log(activeItem);
  return (
    <div>
      <BreadCrumbs />
    </div>
  );
};

export default Overview;
