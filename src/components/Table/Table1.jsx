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
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deletePartnerId, setDeletePartnerId] = useState(null);
  //vb
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text || "";
  };

  const deletedAt = async () => {
    if (deleteId) {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/partners/delete/${deleteId}`
      );
      setdata((prevData) => prevData.filter((item) => item._id !== deleteId));
      setShowPopup(false); // Hide popup after deletion
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/partners/fetch-all`
    );
    setdata(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          className="Tab3 p-1 overflow-x-auto flex flex-col bg-custom-bg h-screen
        ">
          <div
            style={{ gap: "", paddingTop: "" }}
            className="overflow-x-auto flex flex-col justify-start items-center bg-custom-bg h-screen">
            {/* firstbox */}
            <div
              style={{ gap: "20px", paddingLeft: "0px" }}
              className="p-4 overflow-x-auto flex flex-col items-start  gap-9 bg-custom-bg  w-full ">
              <h1
                className="flex items-center"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontWeight: "500",
                }}>
                <Link to="/SuperAdmin">
                  <span>Home</span>
                </Link>
                <IoIosArrowForward style={{ color: "#1C1B1F" }} />
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "20px",
                  }}
                  className="font-medium">
                  Channel Visitors
                </span>
              </h1>

              <div className="flex items-center justify-center text-center w-full">
                <div className="flex justify-start items-center w-[50%] lg:block mx-auto relative lg:w-[36rem] rounded-full">
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
            </div>

            {/* Second box */}
            <div className="outer-wrapper w-full h-[65%]">
              <div className="text-center w-full mb-5 h-full overflow-y-scroll">
                {data.length !== 0 ? (
                  <table
                    className="min-w-full bg-white"
                    style={{ boxShadow: " 0px 0px 4px 0px #00000040" }}>
                    <thead>
                      <tr className="text-[9px] lg:text-[15px] text-left  bg-[#E8E8E8]">
                        <th
                          className="border-b"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16.39px",
                            textAlign: "left",
                            paddingLeft: "7px",
                            width: "125px",
                            padding: "5px",
                          }}>
                          Date
                        </th>
                        <th
                          className="text-center border-b"
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
                          Customer ID
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
                            width: "144px",
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
                            // width:"112px",
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
                        .filter(
                          ({
                            channelPartnerName,
                            updatedAt,
                            partnerId,
                            attendantName,
                            customerName,
                            customerMobileLastFour,
                            projectName,
                            channelPartnerCompanyName,
                          }) =>
                            channelPartnerName
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            DateupdatedAt(updatedAt)
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            partnerId
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            attendantName
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            customerName
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            customerMobileLastFour
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            channelPartnerCompanyName
                              ?.toLowerCase()
                              .includes(valueinput.toLowerCase()) ||
                            projectName
                              ?.toLowerCase()
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
                              {visitor.timeResponse}
                            </td>
                            <td className="py-1 border-b text-center">
                              {" "}
                              {visitor.timeDuration}
                            </td>
                            <td className="py-1 border-b text-center">
                              <Link
                                to={`/SuperAdmin/Channel_Visitors/${visitor.partnerId}`}
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

                            <td
                              className="py-1 border-b text-center max-w-[150px] overflow-hidden"
                              title={visitor.channelPartnerCompanyName}>
                              {truncateText(
                                visitor.channelPartnerCompanyName,
                                12
                              )}
                            </td>

                            <td
                              className="px-4 py-2 max-w-[144px] overflow-hidden "
                              style={{
                                borderBottom: "1px solid #E8E8E8",
                                textAlign: "center",
                                textOverflow: "ellipsis",
                              }}
                              title={visitor.channelPartnerName}>
                              {truncateText(visitor.channelPartnerName, 12)}
                            </td>

                            <td
                              className="px-4 py-2 max-w-[112px] overflow-hidden "
                              style={{
                                borderBottom: "1px solid #E8E8E8",
                                textAlign: "center",
                                textOverflow: "ellipsis",
                              }}
                              title={visitor.customerName}>
                              {truncateText(visitor.customerName, 12)}
                            </td>

                            <td className="py-1 border-b text-center">
                              {visitor.customerMobileLastFour}
                            </td>

                            <td
                              className="py-1 border-b text-center max-w-[150px] overflow-hidden "
                              title={visitor.projectName}>
                              {truncateText(visitor.projectName, 13)}
                            </td>

                            <td
                              className="py-1 border-b text-center max-w-[150px] overflow-hidden "
                              title={visitor.attendantName}>
                              {truncateText(visitor.attendantName, 12)}
                            </td>

                            <td
                              className="py-6 px-1 border-b flex gap-4"
                              style={{ height: "35px", alignItems: "center" }}>
                              <Link
                                to={`/SuperAdmin/Channel_Visitors/${visitor.partnerId}`}>
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
                                onClick={() => {
                                  setShowPopup(true);
                                  setDeleteId(visitor._id);
                                  setDeletePartnerId(visitor.partnerId);
                                }}
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
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="Delete-popup w-[257px] h-[192px] py-[12px] px-[24px] rounded-md bg-white shadow-md z-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-manrope text-[20px] font-medium">
                    Are you sure you want to delete this row?
                  </p>
                  <p className="font-manrope text-[12px] font-medium text-[#6A6A6A] mt-2">
                    This action cannot be undone.
                  </p>
                  <div className="delete-cont ml-1 flex justify-center items-center w-[197px] h-[33px] gap-6 mt-4">
                    <button
                      className="w-[85px] h-[33px] p-2.5 bg-[#FFD9D9] rounded-md text-[#C71212] flex items-center justify-center"
                      onClick={deletedAt}>
                      Delete
                    </button>
                    <button
                      className="w-[85px] h-[33px] p-2.5 rounded-md border border-black flex items-center justify-center"
                      onClick={() => setShowPopup(false)}>
                      Cancel
                    </button>
                  </div>
                  <p className="font-manrope text-[12px] text-[#6A6A6A] font-medium text-center mt-2">
                    Select "Delete" to confirm.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Table1;
