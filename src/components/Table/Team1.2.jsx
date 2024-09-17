import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "../Home.css";
import { Link } from "react-router-dom";

const Table12 = () => {
  const [data, setdata] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const location = useLocation();
  const pathname = location.pathname;
  // const employeeId = decodeURIComponent(
  //   pathname.substring(pathname.lastIndexOf("/") + 1)
  // );
  // console.log(employeeId);

  const pathSegments = pathname.split("/");
  const teamName = decodeURIComponent(pathSegments[3]); // Assuming 'teamName' is at index 3
  const employeeId = decodeURIComponent(pathSegments[4]); // Assuming 'employeeId' is at index 4
  const memberName = decodeURIComponent(pathSegments[5]); // 'member.name' is at index 5

  console.log("teamName", teamName);
  console.log("employeeId", employeeId);
  console.log("memberName", memberName);


  const callApi = async (employeeId) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND
        }/api/clientManagement/history/${employeeId}`
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

  //vb
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text || "";
  };

  return (
    <div className="bg-[#F7F3E8] p-4 ">
      <div
        className="flex items-center [#000000]"
        style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}>
        <Link to="/SuperAdmin">
          <h1
            className="font-bold flex items-center gap-1"
            style={{
              fontFamily: "Poppins",
              fontSize: "24px",
              fontWeight: "500",
            }}>
            <span>Home</span>
          </h1>
        </Link>
        <IoIosArrowForward style={{ color: "#1C1B1F" }} />

        <span
          style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}
          className="font-semibold">
          {teamName}
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

      <div className="flex  mb-5 justify-center mt-[20px] ">
        <input
          type="text"
          onChange={(e) => setvalueinput(e.target.value)}
          value={valueinput}
          placeholder="Search"
          className=" w-[619px] h-[48px]  rounded-full border border-[#3D2314] "
          style={{ padding: "12px 24px 12px 50px" }}
        />
        <img
          style={{ marginLeft: "-560px", marginTop: "14px" }}
          src={Searchsvg}
          alt="Search"
          className="absolute "
        />
      </div>

      <div className="w-[850px] h-[496px] mx-auto">
        <div className="bg-[#D7D7D7] ">
          <h2
            className=" mb-2 text-center"
            style={{
              fontFamily: "Manrope",
              fontSize: "24px",
              fontWeight: "600",
            }}>
            {teamName}
          </h2>
          <p
            className="text-sm mb-2 text-center [#313131]"
            style={{
              fontSize: "16px",
              fontFamily: "Manrope",
              fontWeight: "700",
              lineHeight: "21.86px",
            }}>
            {memberName} (Sales Executive)
          </p>

          <table className="w-[850px] ">
            <div className="outer-wrapperK">
              <div style={{maxHeight:'300px', overflowY:'scroll'}}>
                <thead className="team1">
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
                      Status
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
                  {data
                    .filter(
                      ({
                        ClientName,
                        ClientEmail,
                        ClientMobile,
                        ClientProject,
                        createdAt,
                      }) =>
                        ClientEmail?.toLowerCase().includes(
                          valueinput.toLowerCase()
                        ) ||
                        ClientMobile?.toLowerCase().includes(
                          valueinput.toLowerCase()
                        ) ||
                        DateupdatedAt(createdAt)
                          ?.toLowerCase()
                          .includes(valueinput.toLowerCase()) ||
                        ClientProject?.toLowerCase().includes(
                          valueinput.toLowerCase()
                        ) ||
                        ClientName?.toLowerCase().includes(
                          valueinput.toLowerCase()
                        )
                    )
                    .map((item, index) => (
                      <tr key={index}>
                        <td
                          className="px-4 py-2 max-w-[150px] overflow-hidden"
                          style={{ height: "64px" }}
                          title={item.ClientName}>
                          {truncateText(item.ClientName, 14)}
                        </td>

                        <td
                          className="px-4 py-2  max-w-[150px] overflow-hidden"
                          title={item.ClientEmail}>
                          {truncateText(item.ClientEmail, 17)}
                        </td>

                        <td
                          className="px-4 py-2   max-w-[150px] overflow-hidden"
                          title={item.ClientMobile}>
                          {truncateText(item.ClientMobile, 10)}
                        </td>

                        <td
                          className="px-4 py-2 max-w-[150px] overflow-hidden"
                          title={item.ClientProject}>
                          {truncateText(item.ClientProject, 14)}
                        </td>

                        <td className="px-4 py-2">
                          {DateupdatedAt(item.createdAt)}
                        </td>
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
                            {item.accepted}
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
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table12;
