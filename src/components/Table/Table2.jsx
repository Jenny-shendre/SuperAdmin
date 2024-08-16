import { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { useNavigate } from 'react-router-dom';

import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";

import "../Home.css";
import { Link } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

// const navigate=useNavigate()

const API_URL = import.meta.env.VITE_API_URL


const Table2 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [viewedItems, setViewedItems] = useState([]);
  const [data, setdata] = useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
  //const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleView = (id) => {
    if (viewedItems.includes(id)) {
      // Item already viewed, remove it from viewedItems
      setViewedItems((prevViewedItems) =>
        prevViewedItems.filter((item) => item !== id)
      );
    } else {
      // Item not viewed, add it to viewedItems
      setViewedItems((prevViewedItems) => [...prevViewedItems, id]);
    }
  };

  /*const deletedAt = async (id, customerId) => {
    const confirmDelete = window.confirm(`Do you really want to delete the record with ID ${customerId}?`);

    if (confirmDelete) {
      await axios.delete(
        `https://project-rof.vercel.app/api/customers/delete/${id}`
      );
      fetchData(); // Refresh data after deletion
    }
  };*/
  const getData1 = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://project-rof.vercel.app/api/channels`
      );
      setdata(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  const fetchRecordByChannelID = async (id) => {
    console.log('id>>>>>>',id)
    const res = await axios.get(
      `${API_URL}/api/channels/fetchChannelBy/`,
      {
        params: {
          id: id
        },
      }
    );
    setdata(res.data);
  };

  console.log(data);
  useEffect(() => {
    getData1();
  }, []);

  /*const fetchData = async () => {
    setLoading(true)
    const res = await axios.get(
      ` https://project-rof.vercel.app/api/customers/fetch-all`
    );
    setdata(res.data);
    setLoading(false)
  };*/

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
    <div className="arrowss">
      {loading ? (
        <Loding />
      ) : (
        <div
          style={{ gap: "10px" }}
          className="Tab3 p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen;
 ">
          {/* bg: #F7F3E8 */}
          <div
            style={{ gap: "20px", paddingLeft: "0px" }}
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
                {/* Direct Visitors */}
                Channel Partners
              </span>
            </h1>

            <div className="flex flex-row items-center justify-start text-center flex items-center justify-center  ml-80">
              <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full  mr-96 ">
                <input
                  className="w-[619px] h-[48px] py-2 px-12 rounded-full "
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
                  style={{ top: "0.8rem" }}
                  src={Searchsvg}
                  alt="Search"
                  className="absolute  left-4"
                />
              </div>
            </div>
          </div>
          <div className="outer-wrapper text-center flex items-center justify-center">
            <div className="table-wrapper" style={{ width: "999px" }}>
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
                          // paddingLeft: "7px",
                          //TC-181
                          width: "100px",
                          // padding: "6px, 10px, 6px, 10px",
                          height: "28px",}} 
                        //TC-186
                        className="px-[10px] py-[6px]" >
                        {/* Date */}
                        Serial No
                      </th>
                      <th
                        className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          //TC-197
                          textAlign: "center",
                          padding: "7px",
                          width: "100px", //tc-3
                          height: "28px",
                          
                        }}>
                        {/* Response Time */}
                        Channel ID
                      </th>
                      <th
                        className="border-b text-center px-[10px] py-[6px] "
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          //TC-213
                          textAlign: "center",
                       
                          width: "253px",
                          height: "28px",
                        }}>
                        {/* Meeting Duration */}
                        List of Channel Name
                      </th>
                      <th
                        className="border-b "
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          //TC-228
                          textAlign: "center",
                          width: "253px",
                          height: "28px",
                          //TC-231
                          padding:  "6px 10px 6px 10px",
                        }}>
                        {/* Customer Name */}Email
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
                          width: "109px",
                          height: "28px",
                          //TC-247
                          padding:  "6px 10px 6px 10px",
                        }}>
                        Phone No
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
                          width: "139px",
                          height: "28px",
                          //TC-263
                          padding:  "6px 10px 6px 10px",
                        }}>
                        Address
                      </th>
                   
                    </tr>
                  </thead>

                  <tbody>
                    {data
                      .filter(({ name }) =>
                        name.toLowerCase().includes(valueinput.toLowerCase())
                      )
                      .map((visitor, index) => (
                        
                        <tr
                          style={{ paddingLeft: "5px" }}
                          className="py-1 border-b text-[9px] lg:text-[14px]  "
                          key={index}>
                          {/* <td className="p-2">{index + 1}</td> */}
                          <td style={{ paddingLeft: "5px" }}>
                            {/* {DateupdatedAt(visitor.updatedAt)} */}
                            <td className="py-3  ml-6 text-center flex items-center ">
                              {index + 1}
                            </td>
                          </td>

                          <td className="py-3 border-b text-center">
                            {/* {ResponseAt(visitor.updatedAt)} */}
                            
                            <Link
                              onClick={() => navigate('/SuperAdmin/Rainbow_overseas', { state: { id: visitor._id } })}
                              style={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                fontWeight: "700",
                                lineHeight: "19.12px",
                                textAlign: "left",
                                color: "#000AFF",
                                textDecoration: "underline",
                                
                                
                              }}>
                              {visitor.channelID} 
                            </Link>
                          </td>

                        
                            <td className="py-3  text-left flex items-center justify-center">
                              <FaCircle  className="mr-2 ml-16 text-gray-500 " style={{width:"30px",height:"30px"}}/>
                              <span className="truncate flex-grow ml-2 #000000" style={{fontSize:"16px"}}>{visitor.name} </span>
                            </td>
                       
                         {/* //TC */}
                          <td className="  py-3 border-b text-center">
                            {visitor.email}
                          </td>

                          <td className=" py-3 border-b text-center  ">
                            {visitor.phone}
                          </td>

                          <td className="  py-3 border-b text-center">
                            {visitor.address}
                          </td>

                          {/* <td className="  py-3 border-b text-center">
                            {visitor.address}
                          </td> */}

                          
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p> No records founds...!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table2;
