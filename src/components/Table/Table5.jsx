import { useEffect, useState } from "react";
import { LuPencilLine, LuEyeOff, LuEye } from "react-icons/lu";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";
import "../Home.css";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaCircle } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";

const Table5 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [viewedItems, setViewedItems] = useState([]);
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleView = (id) => {
    if (viewedItems.includes(id)) {
      setViewedItems((prevViewedItems) =>
        prevViewedItems.filter((item) => item !== id)
      );
    } else {
      setViewedItems((prevViewedItems) => [...prevViewedItems, id]);
    }
  };

  const deletedAt = async (id, customerId) => {
    const confirmDelete = window.confirm(
     ` Do you really want to delete the record with ID ${customerId}?`
    );

    if (confirmDelete) {
      await axios.delete(
       " https://project-rof.vercel.app/api/customers/delete/${id}"
      );
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://project-rof.vercel.app/api/customers/fetch-all"
    );
    setdata(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };

  const ResponseAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "hh:mm a");
    return formattedDate;
  };

  const getTeamName = (index) => {
    const teamLetter = String.fromCharCode(65 + index);
    return `Team ${teamLetter}`;
  };

  return (
    <div className="arrowss">
      {loading ? (
        <Loding />
      ) : (
        <div
          style={{ gap: "10px" }}
          className="Tab3 p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen"
        >
          <div
            style={{ gap: "20px", paddingLeft: "0px" }}
            className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg"
          >
            <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Team
              </span>
            </h1>

            <div className="flex flex-row items-center justify-center text-center">
              <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
                <input
                  className="w-full py-2 px-12 rounded-full"
                  style={{
                    border: "1px solid #3D2314",
                    boxShadow: " 0px 0px 4px 0px #00000040",
                  }}
                  type="text"
                  value={valueinput}
                  onChange={(e) => setvalueinput(e.target.value)}
                  placeholder="Search"
                />
                <img
                  style={{ top: "0.6rem" }}
                  src={Searchsvg}
                  alt="Search"
                  className="absolute left-4"
                />
              </div>
              <button
                className="bg-[#3D2314] text-white px-4 py-2 rounded-full flex items-center justify-center h-[48px] ml-4 mt-4 lg:mt-0"
                style={{
                  height: "48px",
                  width: "120px",
                  border: "1px solid #3D2314",
                  boxShadow: "0px 0px 4px 0px #00000040",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>

          <div className="outer-wrapper text-center flex items-center justify-center">
            <div className="table-wrapper" style={{ width: "999px" }}>
              {data.length !== 0 ? (
                <table
                  className="min-w-full bg-white"
                  style={{
                    boxShadow: " 0px 0px 4px 0px #00000040",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr className="text-[9px] lg:text-[15px] text-left bg-[#E8E8E8]">
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          paddingLeft: "10px",
                          width: "65px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          justifyContent: "center",
                        }}
                      >
                        Teams
                      </th>
                      <th
                        className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "180px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Manager Name
                      </th>
                      <th
                        className="border-b text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "253px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Manager Email ID
                      </th>
                      <th
                        className="border-b text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          width: "253px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Current Project
                      </th>
                      <th
                        className="border-b text-center "
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "44px",
                          height: "16px",
                          justifyItems: "center",
                          alignItems: "center",
                          border: "1px solid #ddd",
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data
                      .slice(
                        (currentPage - 1) * recordsPerPage,
                        currentPage * recordsPerPage
                      )
                      .map((visitor, index) => (
                        <tr
                          key={index}
                          className="border-b text-[9px] lg:text-[14px]"
                        >
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                              width: "188px",
                              height: "54px",
                            }}
                          >
                            <div
                              className="py-3 text-center flex items-center "
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {getTeamName(index)}
                            </div>
                          </td>

                          <td
                            className="py-3 border-b text-center"
                            style={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                              padding: "10px",
                              width: "178px",
                              height: "54px",
                            }}
                          >
                            Anirudh
                          </td>

                          <td
                            className=" py-3 border-b text-center"
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              width: "224px",
                              height: "54px",
                            }}
                          >
                            rainbowoverseas@gmail.com
                          </td>

                          <td
                            className="  py-3 border-b text-center"
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              width: "174px",
                              height: "54px",
                            }}
                          >
                            ROF Aalayas
                          </td>

                          <td
                            className="  py-3 border-b text-center"
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              width: "118px",
                              height: "54px",
                              justifyItems: "center",
                            }}
                          >
                            <div
                              className="py-3  flex gap-5 "
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <LuEye
                                style={{
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  color: "#632E04",
                                }}
                              />
                              <IoOpenOutline
                                onClick={() => deletedAt(visitor._id, visitor.customerId)}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  color: "#632E04",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No records found...!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table5;