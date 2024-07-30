import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
      <h1 className="font-bold mt-8">
        Home / <span className="font-medium">{activeItem}</span>
      </h1>
    </div>
  );
};

export default BreadCrumbs;
