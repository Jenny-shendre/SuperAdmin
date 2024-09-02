import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BreadCrumbsSales = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    switch (locationPath) {
      case "/SalesExecutive":
        setActiveItem("OverviewEX");
        break;
      case "/SalesExecutive/Client":
        setActiveItem("Client");
        break;
      case "/SalesExecutive/Note":
        setActiveItem("Note");
        break;
    

      default:
        setActiveItem("Overview");
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

export default BreadCrumbsSales;
