import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BreadCrumbsMang = () => {
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

export default BreadCrumbsMang;
