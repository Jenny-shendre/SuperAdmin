import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "tailwindcss/tailwind.css";
import { FiEye } from "react-icons/fi";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { IoIosArrowForward } from "react-icons/io";
import onee from "../../assets/carbon_customer - Copy.svg";
import twoo from "../../assets/material-symbols_real-estate-agent-outline-sharp.svg";
import threee from "../../assets/material-symbols_lock-outline copy.png";
import fourrr from "../../assets/Profile.png";
import fivee from "../../assets/building.png";
import team from "../../assets/team.png";
import single from "../../assets/single.png";
import Notes from "../../assets/add_notes (white).png";
import filter from "../../assets/filter.png";
import "../Home.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

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
  const [selectedOpt, setSelectedOpt] = useState("Daily");
  const [directVisitors, setDirectVisitors] = useState(0);
  const [channelVisitors, setChannelVisitors] = useState(0);
  const [totalMeetings, setTotalMeetings] = useState(0);
  const [dealClosed, setDealClosed] = useState(0);
  const [staffOnline, setStaffOnline] = useState(0);
  const [barData, setBarData] = useState([]);
  const [executiveData, setExecutiveData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [notesData, setNotesData] = useState([]);

  const fetchDirectVisitors = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/direct-visitors`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChannelVisitors = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/channel-visitors`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const dealsClosedResponse = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/total-DealsClosed`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalMeetings = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/total-meetings`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const StaffOnline = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/total-status`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const BargraphData = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/Bar`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const TopExecutivePerformer = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/Top_Executive`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const TopTeamPerformer = async (interval) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/TOP3Team`,
        {
          params: { interval },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const opts = ["Daily", "Weekly", "Monthly", "Yearly"];

  const data = {
    labels: [
      "08-09",
      "09-10",
      "10-11",
      "11-12",
      "12-01",
      "01-02",
      "02-03",
      "03-04",
      "04-05",
      "05-06",
    ],
    datasets: [
      {
        label: selectedOpt,
        backgroundColor: function (context) {
          const value = context.raw;
          return value > 17 ? "rgba(61, 35, 20, 1)" : "rgba(240, 235, 232, 1)";
        },
        borderRadius: 5,
        data: barData,
      },
    ],
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
    responsive: true,
    maintainAspectRatio: false,
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (opt) => {
    setSelectedOpt(opt);
    setIsOpen(false);
    try {
      const [
        directData,
        channelData,
        meetingsData,
        dealsClosed,
        stafOnline,
        graphData,
        topExecutive,
        topTeam,
      ] = await Promise.all([
        fetchDirectVisitors(opt.toLowerCase()),
        fetchChannelVisitors(opt.toLowerCase()),
        fetchTotalMeetings(opt.toLowerCase()),
        dealsClosedResponse(opt.toLowerCase()),
        StaffOnline(opt.toLowerCase()),
        BargraphData(opt.toLowerCase()),
        TopExecutivePerformer(opt.toLowerCase()),
        TopTeamPerformer(opt.toLowerCase()),
      ]);

      setDirectVisitors(directData?.numberOfDirectVisitors || 0);
      setChannelVisitors(channelData.numberOfChannelVisitors || 0);
      setTotalMeetings(meetingsData.totalMeetings || 0);
      setDealClosed(dealsClosed.totalClientConversion || 0);
      setStaffOnline(stafOnline.totalStatus || 0);
      setBarData(graphData.data || []);
      setExecutiveData(topExecutive || []);
      setTeamData(topTeam || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleOptionClick(selectedOpt);
  }, [selectedOpt]);

  const getNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/overview/Note`
      );
      setNotesData(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const DateupdatedAt = (dateUpdatedAt) => {
    return format(new Date(dateUpdatedAt), "dd MMM | hh:mm a");
  };

  return (
    <div className="p-4 md:p-6 overview h-full ">
      <div className="flex flex-col gap-4 bg-custom-bg">
        <div className="flex justify-end mr-4 md:mr-[25px]">
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-between items-center w-[140px] md:w-[162px] h-[35px] px-4 py-2 text-sm bg-white text-black border rounded-md">
              <img src={filter} width="24" height="24" alt="Filter" />
              {selectedOpt || "Daily"}
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <ul className="absolute right-0 mt-2 w-[140px] md:w-[162px] bg-white border rounded-md shadow-lg z-10">
                {opts.map((opt, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick(opt)}>
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="w-[95%] flex flex-wrap items-start justify-start gap-5 mt-5 mx-auto">
        {[
          { title: "Total Direct Visitors", value: directVisitors, icon: onee },
          {
            title: "Total Channel Visitors",
            value: channelVisitors,
            icon: twoo,
          },
          { title: "Deals Closed", value: dealClosed, icon: threee },
          { title: "Total Staff Online", value: staffOnline, icon: fourrr },
          { title: "Total Meetings", value: totalMeetings, icon: fivee },
        ].map((stat, index) => (
          <div
            key={index}
            className="min-w-[23%] bg-white shadow rounded-lg p-4 border-2 border-[#3D2314] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="text-sm font-normal">{stat.title}</div>
              <img className="h-6 w-6" src={stat.icon} alt="" />
            </div>
            <div className="text-3xl md:text-4xl font-medium text-[#632E04] mt-2">
              {stat.value || 0}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-start justify-around ">
        {/* Top Executive Performer Table */}
        <div className="w-[45%] my-10">
          <div className="bg-[#3D2314] flex items-center justify-center p-2 rounded-t-lg">
            <img src={single} className="w-8 h-8 mr-2" alt="Top Executive" />
            <p className="text-white text-lg font-normal">
              Top Executive Performer
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-center text-sm font-medium bg-[#F5F2F0]">
                  <th className="px-2 py-2">No</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Meeting Attended</th>
                  <th className="px-2 py-2">Conversion</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center divide-y divide-gray-200">
                {executiveData.map((visitor, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="px-2 py-2 text-xs">{index + 1}</td>
                    <td className="px-2 py-2 text-xs">{visitor.name}</td>
                    <td className="px-2 py-2 text-xs">
                      {visitor.totalMeetings}
                    </td>
                    <td className="px-2 py-2 text-xs">
                      {visitor.clientConversion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Team Performance Table */}
        <div className="w-[45%] my-10">
          <div className="bg-[#3D2314] flex items-center justify-center p-2 rounded-t-lg">
            <img src={team} className="w-8 h-8 mr-2" alt="Top Team" />
            <p className="text-white text-lg font-normal">
              Top Team Performance
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-center text-sm font-medium bg-[#F5F2F0]">
                  <th className="px-2 py-2">No</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Meeting Attended</th>
                  <th className="px-2 py-2">Conversion</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center divide-y divide-gray-200">
                {teamData.map((visitor, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="px-2 py-2 text-xs">{index + 1}</td>
                    <td className="px-2 py-2 text-xs">{visitor.teamName}</td>
                    <td className="px-2 py-2 text-xs">{visitor.clientCount}</td>
                    <td className="px-2 py-2 text-xs">
                      {visitor.conversionCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes Section */}
{/* 
        <div className="w-[95%] my-10 hide-scrollbar">
          <div className="bg-white shadow-md h-[620px]">
            <div className="bg-[#3D2314] flex items-center justify-center p-2 rounded-t-lg">
              <img src={Notes} className="w-8 h-8 mr-2" alt="Notes" />
              <p className="text-white text-lg font-normal">Notes</p>
            </div>
            <div style={{ height: "547px" }} className="overflow-y-auto">
              {notesData.map((note, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[rgba(99,46,4,0.5)] text-[#3D2314] flex items-center justify-center text-sm font-semibold mr-4">
                      SB
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#383838]">
                        {DateupdatedAt(note.date)}
                      </h3>
                      <p className="text-xs text-black truncate w-48">
                        {note.note}
                      </p>
                    </div>
                  </div>
                  <FiEye className="text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Graph Section */}
        <div className="col-span-full xl:col-span-3 mt-6 xl:mt-0 w-[95%] mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Most Meeting Hour</h2>
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed border-[#3D2314]">
              <span className="text-3xl md:text-4xl font-medium text-[#632E04]">
                01-02 PM
              </span>
              <span className="text-sm text-gray-600">Today</span>
            </div>
            <div className="h-[360px] ">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewAdmin;
