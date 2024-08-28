import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbsMang from "../BreadCrumbs/BreadCrumbsMang";

const OverviewMang = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    switch (locationPath) {
      case "/SalesManager":
        setActiveItem("Overview");
        break;
      case "/SalesManager/":
        setActiveItem("Overview");
        break;
      case "/SalesManager/Client":
        setActiveItem("Client");
        break;
      case "/SalesManager/My_Team":
        setActiveItem("My_Team");
        break;
        case "/SalesManager/Client_History":
          setActiveItem("Client_History");
          break;

      default:
        setActiveItem("Overview");
        break;
    }
  }, []);
  console.log(activeItem);
  return (
    <div>
      <BreadCrumbsMang />
    </div>
  );
};

export default OverviewMang;
