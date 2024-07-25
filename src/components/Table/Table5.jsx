import { useEffect, useState, useRef } from "react";
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
import DropIcon from "../../assets/DropIcon.png";

const Table5 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [viewedItems, setViewedItems] = useState([]);
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showAddTeamMemberPopup, setShowAddTeamMemberPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const teamPopupRef = useRef();
  const addTeamMemberPopupRef = useRef();
  const dropdownRef = useRef();

  const handleView = (id) => {
    if (viewedItems.includes(id)) {
      setViewedItems((prevViewedItems) =>
        prevViewedItems.filter((item) => item !== id)
      );
    } else {
      setViewedItems((prevViewedItems) => [...prevViewedItems, id]);
    }
  };

  // const deletedAt = async (id, customerId) => {
  //   const confirmDelete = window.confirm(
  //     ` Do you really want to delete the record with ID ${customerId}?`
  //   );

  //   if (confirmDelete) {
  //     await axios.delete(
  //       `https://project-rof.vercel.app/api/customers/delete/${id}`
  //     );
  //     fetchData();
  //   }
  // };

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

  const handleOutsideClick = (event) => {
    if (
      teamPopupRef.current &&
      !teamPopupRef.current.contains(event.target)
    ) {
      setShowTeamPopup(false);
    }
    if (
      addTeamMemberPopupRef.current &&
      !addTeamMemberPopupRef.current.contains(event.target)
    ) {
      setShowAddTeamMemberPopup(false);
    }
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (showTeamPopup || showAddTeamMemberPopup || isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showTeamPopup, showAddTeamMemberPopup, isDropdownOpen]);

  // add team members popup logic

  const [teamName, setTeamName] = useState('');
  const [project, setProject] = useState('');
  const [manager, setManager] = useState('');
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const handleAddMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddMember();
    }
  };

  const handleProjectChange = (projectName) => {
    setManager(projectName);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (teamName && project && manager && members.length > 0) {
      setIsCreating(true);
      setErrorMessage(''); // Clear any previous error messages

      try {
        await axios.post('https://project-rof.vercel.app/api/teams/create', {
          teamName,
          project,
          manager,
          members
        });

        setCreateStatus('Team Created Successfully ✓');
      } catch (error) {
        console.error('Error creating team:', error);
        setCreateStatus('Error Creating Team');
      } finally {
        setIsCreating(false);
      }
    } else {
      setErrorMessage('Please fill in all fields and add at least one team member.');
    }

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
                onClick={() => setShowTeamPopup(!showTeamPopup)}
                className="add-team-button bg-[#3D2314] text-white px-4 py-2 rounded-full flex items-center justify-center h-[48px] ml-4 mt-4 lg:mt-0"
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
              {/* Add teams buttons */}
              {showTeamPopup && (
                <>
                  <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                  <div
                    ref={teamPopupRef}
                    className="ml-[594px] mt-[190px] team-creation-popup w-[125px] h-[117px] rounded-[4px] bg-white absolute z-50 flex flex-col justify-between"
                  >
                    <button
                      className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                      onClick={() => {
                        setShowTeamPopup(false);
                        setShowAddTeamMemberPopup(true);
                      }}
                    >
                      Add Team
                    </button>
                    <button className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]">
                      Add Manager
                    </button>
                    <button className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]">
                      Add Executive
                    </button>
                  </div>
                </>
              )}
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
                              <Link to='/TeamA'>
                              <IoOpenOutline
                                onClick={() => deletedAt(visitor._id, visitor.customerId)}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  color: "#632E04",
                                }}
                              />
                              </Link>
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

          {/* Add team member screen */}
          {showAddTeamMemberPopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addTeamMemberPopupRef}
                className="fixed inset-0 flex items-center justify-center z-50"
              >
                <div className="add-team-members w-[488px] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddTeamMemberPopup(false)}
                  >
                    X
                  </button>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-[440px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4"
                    placeholder="Team Name"
                  />
                  <input
                    type="text"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-[440px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4"
                    placeholder="Assign Project"
                  />

                  <div
                    className="relative w-[440px] h-12 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 block shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                      {manager || "Assign Manager"}
                      <img className="ml-2 h-2 w-3 " src={DropIcon} alt="Dropdown Icon" />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProjectChange("Manager 1")}
                        >
                          Manager 1
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProjectChange("Manager 2")}
                        >
                          Manager 2
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProjectChange("Manager 3")}
                        >
                          Manager 3
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProjectChange("Manager 4")}
                        >
                          Manager 4
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProjectChange("Manager 5")}
                        >
                          Manager 5
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-[440px] h-[127px] p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 overflow-y-auto">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {members.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-300"
                        >
                          <button
                            onClick={() => handleRemoveMember(member)}
                            className="text-black text-[22px]"
                          >
                            &times;
                          </button>
                          <span className="ml-2 ">{member}</span>

                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="add-member"
                      placeholder="Add Team Member"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-fit create-team-btn h-12 p-3 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                    disabled={isCreating}
                  >
                    {createStatus || 'Create Team'}
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  )}

                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Table5;
