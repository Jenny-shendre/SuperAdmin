import React, { useEffect, useState } from "react";
import '../Home.css';
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { CgNotes } from "react-icons/cg";
import { IoCheckmarkOutline } from "react-icons/io5";
import close from '../../assets/close.png';
import axios from "axios";
import { format, isValid } from "date-fns";
import Loading from "../Loding/Loding";
function ClientDetailsMang() {
  const [data, setData] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const [loading, setLoading] = useState(false);



  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://project-rof.vercel.app/api/attendants/fetch-all`);
      const resData = res.data;
      // console.log("API Response Data:", responseData);
      setData(resData);
      console.log(resData[0].ClientName);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);

    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);

  // const DateupdatedAt = (DateupdatedAt) => {
  //   const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
  //   return formattedDate;
  // };

  const DateupdatedAt = (date) => {
    const parsedDate = new Date(date);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd MMM | hh:mm a");
    } else {
      return "Invalid Date";
    }
  };
  

  return (
    <> {loading ? (
      <Loading />
    ) : (
      <div>
        <div
          style={{ gap: "20px", paddingTop: "30px", fontFamily: 'Manrope' }}
          className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg;
        "
        >
          <h1
            className="font-bold flex items-center gap-1 font-[Manrope]"
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
                fontWeight: "500",
                fontSize: "24px",
              }}
              className="font-medium font-[Manrope]"
            >
              Clients
            </span>
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center font-[Manrope]">
          <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
            <input
              className="w-full py-2 px-12 rounded-full "
              style={{

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


        <main className=" overflow-x-hidden overflow-y-auto p-6 font-[Manrope]">

          <div style={{ textAlign: '-webkit-center' }} >
            <div className="wrapperF">
              <table className="w-[956px] h-[477px] bg-white shadow-md  overflow-hidden font-[Manrope]">

                <thead className="bg-[#D7D7D7] font-[Manrope]">
                  <tr className="text-center text-[#4B4B4B] w-[171px]  h-[36px] font-[Manrope]">
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2 ">Date</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Project Name</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Client Name</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Duration</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Notes</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2">Executive</th>
                    <th style={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      color: "#4B4B4B",
                    }} className="px-4 py-2 ">Actions</th>
                  </tr>
                </thead>

                <tbody className="font-[Manrope]">
                  {data.flatMap((visitor, index) =>
                    visitor.ClientName.filter(({ ClientName }) =>
                      ClientName.toLowerCase().includes(valueinput.toLowerCase())
                    ).map((client, clientIndex) => (
                      <tr className="text-[#5C5C5C] text-center" key={`${index}-${clientIndex}`}>
                        <td className="px-4 py-2 ">{client.createdAt ? DateupdatedAt(client.createdAt) : "Invalide date"}</td>
                        <td className="px-4 py-2 ">{client.ClientProject?.length > 0 ? client?.ClientProject : "Not Assign"}</td>
                        <td className="px-4 py-2 ">{client.ClientName?.length > 0 ? client?.ClientName : "Not found"}</td>
                        <td className="px-4 py-2 text-[#000000] " style={{ fontWeight: '800' }}>{client.timeDuration?.length > 0 ? client?.timeDuration : "Not Assign"}</td>
                        <td className="px-4 py-2 r">
                          <div style={{ textAlign: '-webkit-center' }}>
                            <CgNotes className="w-[20px] h-[22px] text-black " />
                            {client.notes}
                          </div>
                        </td>
                        <td className="px-4 py-2">{visitor.name?.length > 0 ? visitor?.name : "Not found"}</td>
                        {/* <td className="px-4 py-2 text-center" style={{ textAlign: '-webkit-center' }}>
                          <IoCheckmarkOutline className="w-[24px] h-[24px] text-[#49DA31]" />
                        </td> */}
                        {client.completed === 'completed' ? (
                            <IoCheckmarkOutline className="w-[24px] h-[24px] text-[#49DA31]" />
                          ) : (
                            <img src={close} alt="Progress" className="w-[24px] h-[24px]" />
                          )}
                      </tr>
                    )))}
                </tbody>
              </table>

            </div>
          </div>
        </main>








      </div>
     )}
    </>
  );
}

export default ClientDetailsMang;