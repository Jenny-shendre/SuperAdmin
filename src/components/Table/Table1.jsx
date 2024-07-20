import { useEffect, useState } from "react";
import Searchsvg from "../../assets/material-symbols_search.svg";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";
import { PiNotePencilBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Home.css";

const Table1 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const deletedAt = async (id, partnerId) => {
    const confirmDelete = window.confirm(
      `Do you really want to delete the record with ID ${partnerId}`
    );
    if (confirmDelete) {
      await axios.delete(
        `https://project-rof.vercel.app/api/partners/delete/${id}`
      );
      fetchData(); //Refresh data after deleteing;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://project-rof.vercel.app/api/partners/fetch-all`
    );
    setdata(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data", data);
  // Data Time
  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };
  const ResponseAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "hh:mm a");
    return formattedDate;
  };

  return (
    <>
      {loading ? (
        <Loding />
      ) : (
        <div
          style={{ gap: "10px" }}
          className="Tab3 p-1 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen;
        ">
          <div
            style={{ gap: "20px", paddingTop: "30px" }}
            className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;
        ">
            <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                Channel Visitors
              </span>
            </h1>

            <div className="flex flex-row items-center justify-start flex items-center justify-center ml-80">
              <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full  mr-96 ">
                <input
                  className="w-full py-2 px-12 rounded-full "
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
            </div>
            <div className="outer-wrapper">
              <div className="table-wrapper">
                {data.length !== 0 ? (
                  <table
                    className="min-w-full bg-white"
                    style={{ boxShadow: " 0px 0px 4px 0px #00000040" }}>
                    <thead>
                      <tr className="text-[9px] lg:text-[15px] text-left  bg-[#E8E8E8]">
                        <th
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "left",
                            paddingLeft: "7px",
                            width: "115px",
                            padding: "5px",
                          }}>
                          Date
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
                          }}>
                          Response Time
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
                          }}>
                          Meeting Duration
                        </th>
                        <th
                          className="border-b text-center"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "center",
                          }}>
                          Channel Partner ID
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
                          }}>
                          Channel Name
                        </th>
                        <th
                          className="border-b"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "center",
                            padding: "5px",
                          }}>
                          Channel Partner Name
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
                          }}>
                          Customer Name
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
                          }}>
                          Last 4 Digit
                        </th>
                        <th
                          className="border-b"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "center",
                            padding: "5px",
                          }}>
                          Project
                        </th>
                        <th
                          className="border-b text-center"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "center",
                            width: "100px",
                            padding: "5px",
                          }}>
                          Attendant
                        </th>
                        <th
                          className="border-b"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "left",
                            padding: "5px",
                          }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter(({ channelPartnerName }) =>
                          channelPartnerName
                            .toLowerCase()
                            .includes(valueinput.toLowerCase())
                        )
                        .map((visitor, index) => (
                          <tr className="text-[9px] lg:text-[14px]" key={index}>
                            <td
                              className="py-1 border-b"
                              style={{ paddingLeft: "5px" }}>
                              {DateupdatedAt(visitor.updatedAt)}
                            </td>
                            <td className="py-1 border-b text-center">
                              {ResponseAt(visitor.createdAt)}
                            </td>
                            <td className="py-1 border-b text-center">00:00</td>
                            <td className="py-1 border-b text-center">
                              <Link
                                to={`/Channel_Visitors/${visitor.partnerId}`}
                                style={{
                                  fontFamily: "Manrope",
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  lineHeight: "19.12px",
                                  textAlign: "left",
                                  color: "#000AFF",
                                  textDecoration: "underline",
                                }}>
                                {visitor.partnerId}
                                {/* {visitor.customerId} */}
                              </Link>
                            </td>

                            <td className="py-1 border-b text-center">
                              {visitor.channelPartnerCompanyName}
                            </td>
                            <td className="py-1 border-b text-center">
                              {visitor.channelPartnerName}
                            </td>
                            <td className="py-1 border-b text-center">
                              {visitor.customerName}
                            </td>
                            <td className="py-1 border-b text-center">
                              {visitor.customerMobileLastFour}
                            </td>

                            <td className="py-1 border-b text-center">
                              {visitor.projectName}
                            </td>
                            <td className="py-1 border-b text-center">
                              {visitor.attendantName}
                            </td>

                            <td className="py-1 border-b flex gap-2">
                              <Link to={`/Channel_Visitors/${visitor.partnerId}`}>
                                <PiNotePencilBold
                                  onClick={() => handleEdit(visitor._id)}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    color: "#632E04",
                                  }}
                                />
                              </Link>

                              <RiDeleteBin6Line
                                onClick={() =>
                                  deletedAt(visitor._id, visitor.partnerId)
                                }
                                style={{
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  color: "#930000",
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p> No records found...!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table1;
