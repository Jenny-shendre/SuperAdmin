import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbsSales from "../BreadCrumbs/BreadCrumbsSales";

const OverviewEX = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    switch (locationPath) {
      case "/SalesExecutive":
        setActiveItem("OverviewPage");
        break;
      case "/SalesExecutive/Client":
        setActiveItem("Client");
        break;
      case "/SalesExecutive/Note":
        setActiveItem("Note");
        break;
    

      default:
        setActiveItem("OverviewPage");
        break;
    }
  }, []);
  console.log(activeItem);
  return (
    <div>
      <BreadCrumbsSales />
    </div>
  );
};

export default OverviewEX;
