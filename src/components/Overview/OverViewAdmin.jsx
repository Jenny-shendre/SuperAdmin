import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import { FiEye } from "react-icons/fi";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { IoIosArrowForward } from "react-icons/io";
import onee from '../../assets/carbon_customer - Copy.svg';
import twoo from '../../assets/material-symbols_real-estate-agent-outline-sharp.svg';
import threee from '../../assets/material-symbols_lock-outline copy.png';
import fourrr from '../../assets/Profile.png';
import fivee from '../../assets/building.png';
import team from '../../assets/team.png';
import single from '../../assets/single.png';
import Notes from "../../assets/add_notes (white).png";
import filter from '../../assets/filter.png';
import '../Home.css'





import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BargraphData, dealsClosedResponse, fetchChannelVisitors, fetchDirectVisitors, fetchTotalMeetings, StaffOnline } from '../../Services/OverviewAPIs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const OverViewAdmin = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState('Daily');
  const [directVisitors, setDirectVisitors] = useState(0);
  const [channelVisitors, setChannelVisitors] = useState(0);
  const [totalMeetings, setTotalMeetings] = useState(0);
  const [dealClosed, setDealClosed] = useState(0);
  const [staffOnline, setStaffOnline] = useState(0);
  const [barData, setBarData] = useState([]);




  console.log("barData", barData);

  const opts = ['Daily', 'Weekly', 'Monthly', 'Yearly'];


  const data =
  {
    labels: ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'],


    datasets: [
      {
        label: 'selectedOpt',

        backgroundColor: function (contex) {
          const value = contex.raw;
          return value > 17 ? 'rgba(61, 35, 20, 1)' : 'rgba(240, 235, 232, 1)';

        },
        borderRadius: 5,

        data: barData,

      },

    ],

    options: {
      plugins: {
        Legend: false,
      }
    },



  };

  const options = {
    animation: {
      duration: 2000,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (opt) => {
    setSelectedOpt(opt.toLowerCase());
    setIsOpen(false);
    try {
      const directData = await fetchDirectVisitors(opt.toLowerCase());
      const channelData = await fetchChannelVisitors(opt.toLowerCase());
      const meetingsData = await fetchTotalMeetings(opt.toLowerCase());
      const dealsClosed = await dealsClosedResponse(opt.toLowerCase());
      const stafOnline = await StaffOnline(opt.toLowerCase());
      const graphData = await BargraphData(opt.toLowerCase());




      setDirectVisitors(directData.numberOfDirectVisitors || 0);
      setChannelVisitors(channelData.numberOfChannelVisitors || 0);
      setTotalMeetings(meetingsData.totalMeetings || 0);
      setDealClosed(dealsClosed.totalClientConversion || 0);
      setStaffOnline(stafOnline.totalStatus || 0);
      setBarData(graphData.data || 0);



    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleOptionClick(selectedOpt);
  }, [selectedOpt]);




  return (

    
      <div  className="min-h-screen p-6">

        <div
          style={{ paddingLeft: "0px" }}
          className="  overflow-x-auto flex flex-col gap- bg-custom-bg"
        >

          <div className="flex flex-row items-center justify-center text-center ">
            <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
              <input
                className="w-full py-2 px-12 rounded-full"
                style={{
                  border: "1px solid #3D2314",
                  boxShadow: " 0px 0px 4px 0px #00000040",
                }}
                type="text"
                value=""

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

          <div classNamename="dropdown-section relative inline-block text-left ">
            <div className="group flex justify-end mr-[25px]">


              <button onClick={toggleDropdown} className="dropdown-toggle inline-flex justify-between items-center w-[162px] h-[35px] px-4 py-2 text-sm  bg-[white] text-[black]">
                <img src={filter} width='24px' height='24px' />
                {selectedOpt || 'Daily'}

                <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              {/* <div
                className="absolute top-[260px] w-40 mt-1 origin-top-left item-center bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">Daily</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">Weekly</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">Monthly</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">Yearly</a>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {isOpen && (
          <ul className="dropdown-menu top-[240px] w-40 mt-1 origin-top-left item-center bg-white" style={{ position: 'absolute', textAlign: 'center', right: '0' }}>
            {opts.map((opt, index) => (
              <li className="py-1" key={index} onClick={() => handleOptionClick(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        )}


        <div  className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-[20px] mt-4">
          <div className="bg-white shadow rounded-lg p-6 w-[230px] h-[117px] border-2 border-[#3D2314] flex">
            <div style={{ fontFamily: 'Manrope', fontWeight: "400", fontSize: "14px", lineHeight: "19.12px", }} >Total Direct <br /> Visitors
              <img className='h-[24px] w-[24px] mt-3' src={onee} alt="" />
            </div>



            <div style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "44px" , textAlign:"center",width:"102px",height:"31px"}} className="mt-2  text-[#632E04] ">{directVisitors || 0}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 w-[230px] h-[117px] border-2 border-[#3D2314] flex">
            <div style={{ fontFamily: 'Manrope', fontWeight: "400", fontSize: "14px", lineHeight: "19.12px", }} >Total Channel <br /> Visitors

              <img className='h-[24px] w-[24px] mt-3' src={twoo} alt="" />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "44px",textAlign:"center",width:"89px",height:"31px" }} className="mt-2  text-[#632E04] ">{channelVisitors || 0}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 w-[230px] h-[117px] border-2 border-[#3D2314] flex">
            <div style={{ fontFamily: 'Manrope', fontWeight: "400", fontSize: "14px", lineHeight: "19.12px", }} >Deals <br /> Closed

              <img className='h-[24px] w-[24px] mt-3' src={threee} alt="" />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "44px",textAlign:"center",width:"82px",height:"31px" }} className="mt-2 ml-12   text-[#632E04]">{dealClosed || 0}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 w-[230px] h-[117px] border-2 border-[#3D2314] flex">
            <div style={{ fontFamily: 'Manrope', fontWeight: "400", fontSize: "14px", lineHeight: "19.12px", }} >Total Staff <br /> Online

              <img className='h-[24px] w-[24px] mt-3' src={fourrr} alt="" />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "44px",textAlign:"center",width:"112px",height:"31px" }} className="mt-2  text-[#632E04]">{staffOnline || 0}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 w-[230px] h-[117px] border-2 border-[#3D2314] flex">
            <div style={{ fontFamily: 'Manrope', fontWeight: "400", fontSize: "14px", lineHeight: "19.12px", }} >Total <br /> Meetings

              <img className='h-[24px] w-[24px] mt-3' src={fivee} alt="" />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "44px",textAlign:"center",width:"62px",height:"31px" }} className="mt-2 ml-10  text-[#632E04]">{totalMeetings || 0}</div>
          </div>
        </div>

        <div  className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6  ">

          <div className="w-[417px] h-[47px]  ">
            <div>
              <div className='bg-[#3D2314] flex w-[417px] h-[47px]' style={{ borderRadius: '8px 8px 0px 0px', display: 'flex', justifyContent: 'center' }}>
                <img src={single} style={{ gap: '4px', width: '34px', height: '34px', alignSelf: 'center', marginLeft: '5px' }} />
                <p className="  [#313131] text-[white] "
                  style={{
                    fontSize: "20px",
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    lineHeight: "27.32px",
                    alignContent: 'center'



                  }}>

                  Top Executive Perfomer</p>
              </div>

              <table className="w-[417px] h-[170px] ">
                <thead>
                  <tr className="text-center text-sm font-medium divide-x-2 divide-gray-300 "
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      height: "35px"
                    }}>
                    <th className="px-4 py-2 h-[35px] w-[40px] bg-[#F5F2F0]" >No</th>
                    <th className="px-4 py-2   bg-[#F5F2F0]" >Name</th>
                    <th className="px-4 py-2  bg-[#F5F2F0]" >Meeting Attended</th>
                    <th className="px-4 py-2   bg-[#F5F2F0]" >Conversion</th>

                  </tr>
                </thead>

                <tbody className="bg-white text-center [#2B2B2B] divide-y divide-gray-200"
                  style={{ fontSize: "16px", fontWeight: "500", fontFamily: "Manrope" }}>

                  <tr className='divide-x-2 divide-gray-200'>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Raghav</td>
                    <td className="px-4 py-2">44</td>
                    <td className="px-4 py-2">34</td>


                  </tr>

                  <tr className='divide-x-2 divide-gray-200'>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">Raghav</td>
                    <td className="px-4 py-2">40</td>
                    <td className="px-4 py-2">30</td>


                  </tr>

                  <tr className='divide-x-2 divide-gray-200'>
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">Raghav</td>
                    <td className="px-4 py-2">36</td>
                    <td className="px-4 py-2">20</td>


                  </tr>


                </tbody>
              </table>
            </div>
          </div>


          {/* 2nd table */}

          <div className="w-[417px] h-[47px]  ">
            <div >
              <div className='bg-[#3D2314] flex w-[417px] h-[47px]' style={{ borderRadius: '8px 8px 0px 0px', display: 'flex', justifyContent: 'center' }}>
                <img src={team} style={{ gap: '4px', width: '34px', height: '34px', alignSelf: 'center', marginLeft: '5px' }} />
                <p className="[#313131] text-[white] "
                  style={{
                    fontSize: "20px",
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    lineHeight: "27.32px",
                    alignContent: 'center'



                  }}>

                  Top Team Perfomance</p>
              </div>


              <table className="w-[417px] h-[170px] ">
                <thead>
                  <tr className="text-center text-sm font-medium divide-x-2 divide-gray-200"
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "16.39px",
                      height: "35px"
                    }}>
                    <th className="px-4 py-2 h-[35px] w-[40px] bg-[#F5F2F0]" >No</th>
                    <th className="px-4 py-2   bg-[#F5F2F0]" >Name</th>
                    <th className="px-4 py-2  bg-[#F5F2F0]" >Meeting Attended</th>
                    <th className="px-4 py-2   bg-[#F5F2F0]" >Conversion</th>

                  </tr>
                </thead>

                <tbody className="bg-white text-center [#2B2B2B] divide-y divide-gray-200"
                  style={{ fontSize: "16px", fontWeight: "500", fontFamily: "Manrope" }}>

                  <tr className='divide-x-2 divide-gray-200'>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Team A</td>
                    <td className="px-4 py-2">105</td>
                    <td className="px-4 py-2">34</td>


                  </tr>

                  <tr className='divide-x-2 divide-gray-200'>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">Team B</td>
                    <td className="px-4 py-2">86</td>
                    <td className="px-4 py-2">30</td>


                  </tr>

                  <tr className='divide-x-2 divide-gray-200'>
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">Team C</td>
                    <td className="px-4 py-2">75</td>
                    <td className="px-4 py-2">20</td>


                  </tr>


                </tbody>
              </table>
            </div>
          </div>
          {/* 
Notes */}


<Link to="/SuperAdmin/Note_Pages">
          <div className=" bg-white shadow-md   w-[361px] h-[620px] ">
            <div>
              <div className='w-[361px] h-[47px] flex bg-[#3D2314] justify-center' style={{ borderRadius: '8px 8px 0px 0px', }}>
                <img src={Notes} style={{ gap: '4px', width: '34px', height: '34px', alignSelf: 'center', marginLeft: '5px' }} />
                <p className=" [#313131] text-[white]  ml-[8px] "
                  style={{
                    fontSize: "20px",
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    lineHeight: "27.32px",
                    alignContent: 'center'



                  }}>

                  Notes</p>

              </div>

              <div style={{ height: '547px' }} className='NotesT'>



                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>


                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>

                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>

                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>

                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <div className='flex flex-wrap  justify-between w-[270px] mt-4  ml-[12px] '>
                    <div className='items-center justify-center' style={{ width: "36px", height: "36px", borderRadius: "50%", padding: "8px", background: "rgba(99, 46, 4, 0.5)", color: "rgba(61, 35, 20, 1)", fontSize: "14px", fontFamily: "Manrope", fontWeight: "600px" }}>SB</div>


                    <div className='flex flex-wrap '>
                      <div>       <h3 style={{ fontWeight: '500' }} className='  text-[16px] font-[Manrope] text-[#383838] text-left'> 22 June | 05:50 pm</h3>
                        <marquee style={{ fontWeight: '500', width: '192px' }} className='text-[10px] font-[Manrope] text-[black] text-left border-b'>Client expressed interest in a specific property listing (MLS# 12345).</marquee>
                      </div>

                    </div>


                  </div>

                  <div style={{ alignContent: 'center' }}>
                    <FiEye />
                  </div>
                </div>

              </div>
            </div>
          </div>
          </Link>

          {/* Graph */}

          <div className="bg-white shadow rounded-lg p-[24px]  w-[874px] h-[380px] " style={{ marginTop: '-400px' }}>
            <div style={{ marginTop: "-15px", fontfamily: 'Manrope', fontsize: '14px', fontweight: ' 600', lineheight: ' 19.12px', textalign: 'left', }}>Most Meeting Hour</div>
            <div style={{ marginTop: "-6px", borderBottom: '3px dashed #3D2314', display: 'flex', justifyContent: 'space-between' }} className="mt-2  text-[#632E04] ">
              <span style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "44px", }}>
                01-02 PM
              </span>
              <span style={{ fontSize: '18px', color: 'black' }}>
                Today
              </span>
            </div>
            <div className="  h-[275px] ">
              <Bar style={{ borderRadius: '4px' }} data={data} options={options} />
            </div>
          </div>

        </div>


      </div>
    
  );
};

export default OverViewAdmin;