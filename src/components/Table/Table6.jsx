import React from 'react';
import { IoIosArrowForward } from "react-icons/io";


const Table6 = () => {
  const teamMembers = [
    { id: 'ROFEX0055', name: 'Samyak', email: 'samyak@rofgroup.com', client: 'Raj Kawani', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Sidhvani', email: 'sidhvani@rofgroup.com', client: 'Ramesh Kulkarni', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Rajshree', email: 'rajshree@rofgroup.com', client: 'Soundarya Mukhi', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Sanjeev', email: 'sanjeev@rofgroup.com', client: 'Rasik Pandey', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Shrutika', email: 'shrutika@rofgroup.com', client: 'Mohammad Sharukh', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Raghav', email: 'raghav@rofgroup.com', client: 'Suraj Tiwari', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Sohail', email: 'Sohail@rofgroup.com', client: 'Riyaana Dey', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Gurmeet', email: 'Gurmeet@rofgroup.com', client: 'Guremeet', project: 'ROF Aalayas' },
    { id: 'ROFEX0055', name: 'Prasad', email: 'Prasad@rofgroup.com', client: 'Prasad Fadnavis', project: 'ROF Aalayas' },
  ];

  return (
    <div className="container mx-auto p-4 w-[927px] h-[591px] ">

<div style={{position:'relative', right:'380px'}}>
      <div className="flex items-center [#000000] "   
       style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
        <span >Home</span>
        <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                
                Team A
              </span>
      </div>
      
      </div>
     
      
      <div style={{display:'flex', flexWrap:'wrap'}}>
      <input style={{position:'relative', top:'50px',right:'150px'}}
                  type="text"
                  placeholder="Search"
                  className=" w-[619px] h-[48px] pl-10 pr-4 py-2 rounded-full border border-[#3D2314] focus:outline-none focus:ring-2 focus:ring-brown-500 h-[48px] "
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
        </div>
        <div className="">
          <button  style={{position:'relative', right:'50px', bottom:'4px'}}
          className="bg-[#3D2314] text-white px-4 py-2  rounded-full mt-[5px] ml-[550px] w-[191px] h-[48px] ">
            Add Executive
          </button>
          <button style={{position:'relative', left:'20px',bottom:'38px'}} 
          
          className=" border-2 border-[#3D2314] px-4 py-2 rounded-full mt-[-60px] ml-[700px]  w-[208px] h-[48px]">
            Assign Manager
          </button>
        </div>
        
      
      <div className=" ">
        <div className='bg-[#D7D7D7] '>
        <h2 className="text-xl font-semibold mb-2 text-center">Team A</h2>
        <p className="text-sm mb-4 text-center [#313131]"
        style={{fontSize:"16px",
            fontFamily:"Manrope",
            fontWeight:"700",
            lineHeight:"21.86px",

        }}>
            Somesh Chaturvedi (Team Lead)</p>
       
        <table className="w-full ">
          <thead>
            <tr className="text-center text-sm font-medium [#000000] bg-[#E8E8E8] w-[188px] h-[28px]"
            style={{
                fontFamily: "Manrope",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight:"16.39px",
                }}>
              <th className="py-2 ">Employee ID</th>
              <th className="py-2">Sales Executive</th>
              <th className="py-2">Sales Executive Email ID</th>
              <th className="py-2">Client Name</th>
              <th className="py-2">Project Name</th>
            </tr>
          </thead>
          
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} className="border-t border-gray-200 text-center [#000000] w-[188px] h-[54px] p-10 bg-white"
              style={{
                fontFamily: "Manrope",
                fontSize:"16px",
                fontWeight: "500",
                lineHeight: "21.86px",
              }} >

                <a href="" className='text-[#000AFF] text-center'
                style={{textDecoration:"Underline",
                }}>
                 <td className="py-2 text-center">{member.id}</td>
                 </a>
                <td className="py-2 ">{member.name}</td>
                <td className="py-2 ">{member.email}</td>
                <td className="py-2 ">{member.client}</td>
                <td className="py-2 ">{member.project}</td>
              </tr>
              
            ))}
          </tbody>
        </table>
        </div> 
      </div>
    </div>
  );
};

export default Table6;