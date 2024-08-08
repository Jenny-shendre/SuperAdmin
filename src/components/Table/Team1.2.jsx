import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "../Home.css";

const Table12 = () => {
  const [data, setdata] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const employeeId = decodeURIComponent(
    pathname.substring(pathname.lastIndexOf("/") + 1)
  );
  console.log(employeeId);
  

  const callApi = async (employeeId) => {
    try {
      const res = await axios.get(
        `https://project-rof.vercel.app/api/clientManagement/history/${employeeId}`
      );

      setdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi(employeeId);
  }, []);
  console.log("done", data);

  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };

  return (
    <div className="bg-[#F7F3E8] p-4 ">
      <div
        className="flex items-center [#000000]"
        style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}>
        <span>Home</span>
        <IoIosArrowForward style={{ color: "#1C1B1F" }} />

        <span
          style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}
          className="font-semibold">
          Team A
        </span>
        <IoIosArrowForward style={{ color: "#1C1B1F" }} />

        <span
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
          }}>
          {employeeId}
        </span>
      </div>

      <div className="flex justify-between  mb-5 ml-[280px] mt-[20px] ">
        <input
          type="text"
          onChange={(e) => setvalueinput(e.target.value)}
          placeholder="Search"
          className=" w-[619px] h-[48px] px-12 py-2 rounded-full border border-[#3D2314] "
        />
        <img
          style={{ marginLeft: "15px", marginTop: "12px" }}
          src={Searchsvg}
          alt="Search"
          className="absolute "
        />
      </div>

      <div className="w-[1090px] h-[496px] ml-[90px] ">
        <div className="bg-[#D7D7D7] ">
          <h2
            className=" mb-2 text-center"
            style={{
              fontFamily: "Manrope",
              fontSize: "24px",
              fontWeight: "600",
            }}>
            Team A
          </h2>
          <p
            className="text-sm mb-2 text-center [#313131]"
            style={{
              fontSize: "16px",
              fontFamily: "Manrope",
              fontWeight: "700",
              lineHeight: "21.86px",
            }}>
            Samyak Gupta (Sales Executive)
          </p>

          <table className="w-full ">
            <thead>
              <tr
                className="text-center text-sm font-medium [#5C5C5C] bg-[#E8E8E8] h-[28px]"
                style={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "16.39px",
                  height: "35px",
                }}>
                <th className="px-4 py-2" style={{ width: "181px" }}>
                  Name
                </th>
                <th className="px-4 py-2" style={{ width: "210px" }}>
                  Email
                </th>
                <th className="px-4 py-2" style={{ width: "136px" }}>
                  Phone no
                </th>
                <th className="px-4 py-2" style={{ width: "187px" }}>
                  Property Interest
                </th>
                <th className="px-4 py-2" style={{ width: "187px" }}>
                  Schedule Meeting
                </th>
                <th className="px-4 py-2" style={{ width: "187px" }}>
                  Meeting Action
                </th>
              </tr>
            </thead>

            <tbody
              className=" bg-white text-center [#2B2B2B] divide-y divide-gray-200"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "Manrope",
              }}>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2" style={{ height: "64px" }}>
                    {item.ClientName}
                  </td>
                  <td className="px-4 py-2">{item.ClientEmail}</td>
                  <td className="px-4 py-2">{item.ClientMobile}</td>
                  <td className="px-4 py-2">{item.ClientProject}</td>
                  <td className="px-4 py-2">{DateupdatedAt(item.createdAt)}</td>
                  <td className="px-4 py-2">
                    <span
                      className="py-1 px-2 rounded"
                      style={{
                        color: "#48A321",
                        background: "#E1F8D7",
                        fontSize: "12px",
                        fontWeight: "600",
                        width: "87px",
                        height: "24px",
                      }}>
                      {item.completed}
                    </span>
                    <span
                      className="ml-2"
                      style={{
                        color: "#48A321",
                        width: "24px",
                        height: "24px",
                      }}>
                      &#10003;
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table12;
