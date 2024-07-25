import React from 'react';
 import one from "../../assets/one.png"
import { IoIosArrowForward } from 'react-icons/io';
import { BiCommentError } from "react-icons/bi";
import Searchsvg from "../../assets/material-symbols_search.svg";

const Table7 = () => {
  const serviceLogData = [
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Resolved', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Resolved', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Resolved', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Pending', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Pending', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Pending', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Disputed', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Plumbing', servicePersonNo: '9849414642', status: 'Disputed', feedback: '★', comments: 'Satisfied' },
  ];

  return (
    <div className="bg-[#F7F3E8] p-4 ">
      <div className="flex items-center [#000000]"
      style={{
          fontFamily:"Poppins",
          fontSize:"24px",
          fontWeight: "500",
      }}>
        <span>Home</span>
        
        <IoIosArrowForward style={{color: "#1C1B1F"}}/>
        <span 
        style={{
            fontFamily:"Poppins",
          fontSize:"24px",
          fontWeight: "400", 
        }}
         className="font-semibold">Projects</span>
      </div>
      
      <div className="flex justify-between  mb-4 ml-[370px]">
        <div className="relative w-2/3">
          
         <input
                  className="w-[619px] h-[48px] py-2 px-12 rounded-full  "
                  style={{
                    border: "1px solid #3D2314",
                    boxShadow: " 0px 0px 4px 0px #00000040",
                  }}
                  type="text"
                  // value={valueinput}
                  // onChange={(e) => setvalueinput(e.target.value)}
                  placeholder="Search"
                />
                <img
                  style={{ top: "0.6rem" }}
                  src={Searchsvg}
                  alt="Search"
                  className="absolute left-4"
                />
        
        </div>
        <button className="bg-[#3D2314] text-white px-4 py-2 rounded-3xl mr-[450px] w-[220px]">+ Add new Project</button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden w-[1130px] h-[290px] ml-[220px] ">
        <div className="flex">
          <img src={one} alt="ROF Aalayas" className="w-1/3 object-cover h-[290px] w-[445px] " />
          <div className="p-4 ">
            <h2  
            style={{
                fontFamily:"Manrope",
                fontWeight: "700",
                fontSize:'24px',
                textAlign:'center',
                marginBottom:'15px'
            }}

            >ROF Aalayas</h2>
            <p style={{fontFamily:'Manrope', fontSize:'16px', fontWeight:'500', textAlign:'center'}}
          >
              ROF AALAYAS, strategically located on a 75-meter road close to Dwarka Expressway, 
              ensures superior connectivity to Schools, Shopping Malls, Entertainment Zones, and 
              Hotels in Gurgaon and Delhi NCR, besides being near the international Airport.
            </p > <br />
            <p style={{fontFamily:'Manrope', fontSize:'16px', fontWeight:'500', textAlign:'center'}}>
              ROF AALAYAS, a residential Affordable Housing Project, offers 1 and 2 BHK 
              Apartments, promising a contemporary Indian lifestyle. You are bound to feel a 
              mesmerizing sense of pleasure with all the desired modern facilities and a peaceful 
              atmosphere amidst the vast stretch of green area opposite AALAYAS.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mb-4 mt-4 ml-[730px]">
        <button className="bg-[#3D2314] text-white px-4 py-2 rounded-l-3xl">Service Log</button>
        <button className="bg-white text-brown-700 px-4 py-2 rounded-r-3xl border border-brown-700">Cheque log</button>
      </div>

      {/* <div className="overflow-x-auto"> */}
        <table className="w-[1061px] h-[363px]  ml-[280px] bg-white border border-gray-300">
          <thead>
            <tr className=" text-center bg-[#3D2314] text-white w-[153] h-[27] "
            style={{
                  fontFamily: "Manrope",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "19.12px",
            }}>
              <th className="p-2 bg-[#3D2314] ">Date</th>
              <th className="p-2 bg-[#3D2314]">Customer Name</th>
              <th className="p-2 bg-[#3D2314]">Customer Mobile No</th>
              <th className="p-2 bg-[#3D2314]">Service Type</th>
              <th className="p-2 bg-[#3D2314]">Service Person</th>
              <th className="p-2 bg-[#3D2314]">Service Person No</th>
              <th className="p-2 bg-[#3D2314]">Status</th>
              <th className="p-2 bg-[#3D2314]">Feedback & Comments</th>
            </tr>
          </thead>
          <tbody className="bg-white text-center"
          style={{
               fontFamily: "Manrope",
               fontSize: "16px",
               fontWeight: "500",
               lineHeight: "21.86px",
               border: "#A8A8A8 1px",
          }}>
            {serviceLogData.map((log, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-50' : ''}>
                <td className="p-2 border-b">{log.date}</td>
                <td className="p-2 border-b">{log.name}</td>
                <td className="p-2 border-b">{log.mobile}</td>
                <td className="p-2 border-b">{log.serviceType}</td>
                <td className="p-2 border-b">{log.servicePerson}</td>
                <td className="p-2 border-b">{log.servicePersonNo}</td>
                <td className={`p-2 text-center leading-5 font-semibold border-b 
                 ${
                  log.status === 'Resolved' ? 'text-green-600' :
                  log.status === 'Pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{log.status}
                </td>
                <div className='flex flex-wrap justify-center border-b mt-1'>
                <td className="p-2 border-b">
                  5 <span className="text-yellow-500 items-center ">{log.feedback} </span>  {log.comments} 
                </td>
                <div className='mt-3'>
                <BiCommentError />
                </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    // </div>
  );
};

export default Table7;