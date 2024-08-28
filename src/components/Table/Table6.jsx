import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { TbReload } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Home.css";

const BtnTab = ({ doneTab, setDoneTab, isDisabled, handleSubmit }) => (
  <div className="flex mb-4 justify-end mt-5" style={{ alignSelf: "self-end" }}>
    {["Done"].map((tab) => (
      <button
        key={tab}
        style={{ fontFamily: "Manrope", padding: "10px 20px", width: "89px", height: '47px' }}
        className={`w-fit assign-manager-btn mt-3 h-12 py-3 px-6 rounded-md font-manrope text-lg font-medium ${isDisabled ? "bg-[grey] text-[#F4EAEA]" : "bg-[#3D2314] text-white"
          }`}
        onClick={() => !isDisabled && handleSubmit()}
        disabled={isDisabled}

      >
        {tab}


      </button>


    ))

    }
  </div>
);

const Table6 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [doneTab, setDoneTab] = useState("Done");
  const [showAddExecutivePopup2, setShowAddExecutivePopup2] = useState(false);
  const [showAssignManagerPopup2, setShowAssignManagerPopup2] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [executiveInput, setExecutiveInput] = useState("");
  const [executives, setExecutives] = useState([]);
  const [managerInput, setManagerInput] = useState("");
  const [managers, setManagers] = useState([]);
  const [objectId, setObjectId] = useState("");
  const location = useLocation();
  const id = location.state || 0;
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  //vb
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text || '';
  };

  const handleDeleteClick = async (id) => {

    setDeleteId(id);
    setShowPopup(true);


  };

  const [inputChar3, setInputChar3] = useState('');

  const executiveHandle = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z ]*$/;
    if (regex.test(value)) {
      setExecutiveInput(value);
    }
  }

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        let teamId = objectId; // Replace with your actual teamId logic
        let memberId = deleteId;

        const res = await axios.delete(`https://project-rof.vercel.app/api/teams/deleteTeamsMembers/${teamId}/${memberId}`);
        console.log("Member deleted", res);
        fetchData(); // Refresh data after deletion
      } catch (error) {
        console.log(error);
      } finally {
        setShowPopup(false); // Close the popup
        setDeleteId(null); // Reset deleteId
      }
    }

  };

  const cancelDelete = () => {
    setShowPopup(false); // Close the popup
    setDeleteId(null); // Reset deleteId
  };



  const managerHandle = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z ]*$/;
    if (regex.test(value)) {
      setManagerInput(value);
    }
  }



  const pathname = location.pathname;
  const teamName = decodeURIComponent(
    pathname.substring(pathname.lastIndexOf("/") + 1)
  );

  const addExecutivePopupRef2 = useRef();
  const assignManagerPopupRef2 = useRef();



  const handleOutsideClick2 = (event) => {
    if (
      addExecutivePopupRef2.current &&
      !addExecutivePopupRef2.current.contains(event.target)
    ) {
      setShowAddExecutivePopup2(false);
    }
    if (
      assignManagerPopupRef2.current &&
      !assignManagerPopupRef2.current.contains(event.target)
    ) {
      setShowAssignManagerPopup2(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.post(
        "https://project-rof.vercel.app/api/teams/teamfliter",
        { teamName }
      );
      setTeamData(res.data);
      setObjectId(res.data._id);
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    fetchData();
  }, []);

  //  console.log("teamData",teamData);
  //  console.log("teamData with member name",teamData.teamMemberNames)

  useEffect(() => {
    if (showAddExecutivePopup2 || showAssignManagerPopup2) {
      document.addEventListener("mousedown", handleOutsideClick2);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick2);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick2);
    };
  }, [showAddExecutivePopup2, showAssignManagerPopup2]);

  const handleKeyDown = (e, input, setInput, setList) => {
    if (e.key === "Enter" && input.trim()) {
      setList((prevList) => [...prevList, input.trim()]);
      setInput("");
    }
  };






  const handleRemoveItem = (item, setList) => {
    setList((prevList) => prevList.filter((i) => i !== item));
  };

  const arrayClientName = (ClientName) => {
    const uniqueClientNames = [
      ...new Set(ClientName.map((item) => item.ClientName)),
    ];
    const lastIndex = uniqueClientNames.length - 1;
    let clientnamelast = uniqueClientNames[lastIndex];
    return ClientName.length == 0 ? "Not Assign" : clientnamelast;
  };

  const sendExecutiveData = {
    teamId: objectId,
    teamMemberName: executives
  }

  console.log("object", sendExecutiveData);
  // console.log("objectId", objectId);


  const handleSubmitExecutives = async () => {
    console.log("Executives Array: ", executives);

    try {
      const res = await axios.post("https://project-rof.vercel.app/api/teams/addOne", sendExecutiveData);
      console.log("res send", res);
      setShowAddExecutivePopup2(false);
      fetchData(); // Refresh data after adding executive
    } catch (error) {
      console.log(error);
    }
  };

  const sendManagersData = {
    managerName: managers
  }

  const handleSubmitManagers = async () => {
    console.log("Managers Array: ", managers);
    try {
      const res = await axios.put(`https://project-rof.vercel.app/api/teams/updateSalesManagerTeam/${objectId}`, sendManagersData);
      console.log("res send", res);
      setShowAssignManagerPopup2(false);
      fetchData(); // Refresh data after adding executive
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <div
          className="flex items-center [#000000]"
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          <Link to="/SuperAdmin">
            <span >Home</span>
          </Link>
          <IoIosArrowForward style={{ color: "#1C1B1F" }} />
          <Link to="/SuperAdmin/Team">
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "24px",
              }}
              className="font-medium"
            >
              {teamData.teamName}
            </span>
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
        <div style={{ display: "flex" }} className="div3">
          <input
            style={{ fontFamily: 'Manrope', lineHeight: '21.86px', fontWeight: '500' }}
            type="text"
            value={valueinput}
            onChange={(e) => setvalueinput(e.target.value)}
            placeholder="Search"
            className="w-[619px] h-[48px] pl-16 pr-4 py-2 rounded-full border border-[#3D2314] focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 relative  left-[-590px] top-[14px]"
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
        <div style={{ display: "flex", gap: "24px" }}>
          <div>
            <button style={{ fontFamily: 'Manrope', fontWeight: '500', lineHeight: '21.86px', fontSize: '16px' }}
              className="bg-[#3D2314] text-white px-[24px] py-[12px] rounded-full w-[191px] h-[48px] flex justify-between "
              onClick={() => setShowAddExecutivePopup2(true)}
            >
              <MdAdd className=" text-[24px]" />
              Add Executive
            </button>
          </div>

          <div>
            <button style={{ fontFamily: 'Manrope', fontWeight: '500', lineHeight: '21.86px', fontSize: '16px' }}
              className="border-2 border-[#3D2314] px-[24px] py-[12px] rounded-full w-[208px] h-[48px] flex justify-between"
              onClick={() => setShowAssignManagerPopup2(true)}
            >
              <TbReload className="color-[#3D2314]  text-[24px]" />

              Assign Manager


            </button>
          </div>
        </div>
      </div>
      <br />


      <div style={{ textAlign: "-webkit-center" }}>
        <div className="w-[927px] h-[591px]">
          <div className="bg-[#D7D7D7]">
            <div style={{ width: '927px', height: '77px', padding: '8px 0px', background: '#D7D7D7' }}>


              <h2 className="text-xl mb-2 text-center teamName" style={{ fontWeight: '600', fontSize: '24px', lineHeight: '32.78px', color: '#323232' }}>
                {teamData.teamName}
              </h2>
              <p
                className="text-sm text-center [#313131] teamName"
                style={{
                  fontSize: "16px",
                  fontFamily: "Manrope",
                  fontWeight: "700",
                  lineHeight: "21.86px",
                }}
              >
                {teamData.managerName} (Team Lead)
              </p>
            </div>
            <div className="outer-wrapperT text-center flex items-center justify-center">
              <div className="table-wrapperT" style={{ width: "999px" }}>

                <table className="w-full wrapperT">
                  <thead className="team1">
                    <tr
                      className="text-center text-sm font-medium [#000000] bg-[#E8E8E8] w-[188px] h-[28px]"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "12px",
                        fontWeight: "500",
                        lineHeight: "16.39px",
                      }}
                    >
                      <th className="px[10px] py-[6px] w-[188px] h-[28px]" style={{ fontWeight: '500', borderRight: '1px solid #E4E7EC' }} >Employee ID</th>
                      <th className="px[10px] py-[6px] w-[188px] h-[28px]" style={{ fontWeight: '500', borderRight: '1px solid #E4E7EC' }}>Sales Executive</th>
                      <th className="px[10px] py-[6px] w-[203px] h-[28px]" style={{ fontWeight: '500', borderRight: '1px solid #E4E7EC' }}>Sales Executive Email ID</th>
                      <th className="px[10px] py-[6px] w-[174px] h-[28px]" style={{ fontWeight: '500', borderRight: '1px solid #E4E7EC' }}>Client Name</th>
                      <th className="px[10px] py-[6px] w-[174px] h-[28px]" style={{ fontWeight: '500', borderRight: '1px solid #E4E7EC' }}>Project Name</th>
                      <th className="px[10px] py-[6px] w-[58px] h-[28px]" style={{ fontWeight: '500', borderRight: '1px solid #E4E7EC' }}>Delete</th>

                    </tr>
                  </thead>

                  <tbody>
                    {teamData?.teamMemberNames?.length > 0 ? (
                      teamData.teamMemberNames.filter(
                        ({
                          name,
                          email,
                          projectName,
                          employeeId,
                          ClientName,
                        }) =>
                          name
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          projectName
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          employeeId
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          arrayClientName(ClientName)
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase()) ||
                          email
                            ?.toLowerCase()
                            .includes(valueinput.toLowerCase())
                      ).map((member, index) => (
                        <tr
                          key={index}
                          className="border-t border-gray-200 text-center [#000000] w-[188px] h-[54px] p-10 bg-white"
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "21.86px",
                          }}
                        >
                          <td className="px-[10px] py-[6px] text-center  ">
                            <a
                              href=""
                              className="text-[#000AFF] text-center"
                              style={{
                                textDecoration: "Underline",
                              }}
                            >


                              <td className="px[10px] py-[6px] text-center "
                                //id center
                                style={{ fontWeight: '700' }}>
                                <Link  to={`/SuperAdmin/teamName/${teamData?.teamName}/${member?.employeeId}`}>
                                  {member.employeeId?.length > 0
                                    ? member?.employeeId
                                    : "Not found"}
                                </Link>
                              </td>
                            </a>
                          </td>

                          <td className="px[10px] py-[6px]  max-w-[150px] overflow-hidden"
                            style={{ fontFamily: 'Manrope', borderRight: '1px solid #E4E7EC', borderLeft: '1px solid #E4E7EC' }}
                            title={member.name?.length > 0 ? member?.name : "Not found"}>
                            {truncateText(member.name?.length > 0 ? member?.name : "Not found", 12)}
                          </td>

                          <td className="py-2 max-w-[150px] overflow-hidden"
                            style={{ borderRight: '1px solid #E4E7EC' }}
                            title={member.email?.length > 0
                              ? member?.email
                              : "Not found"}>
                            {truncateText(member.email?.length > 0
                              ? member?.email
                              : "Not found", 18)}
                          </td>

                          <td className="py-2 max-w-[150px] overflow-hidden"
                            style={{ borderRight: '1px solid #E4E7EC' }}
                            title={arrayClientName(member.ClientName)}>
                            {truncateText(arrayClientName(member.ClientName, 13))}
                          </td>

                          <td className="py-2 max-w-[150px] overflow-hidden"
                            style={{ borderRight: '1px solid #E4E7EC' }}
                            title={member.projectName?.length > 0
                              ? member?.projectName
                              : "Not Assign"}>
                            {truncateText(member.projectName?.length > 0
                              ? member?.projectName
                              : "Not Assign", 13)}
                          </td>

                          <td className="py-2" style={{ textAlign: '-webkit-center' }}>
                            <RiDeleteBin6Line style={{ color: 'rgba(147, 0, 0, 1)', cursor: 'pointer' }} onClick={() => handleDeleteClick(member._id)} />

                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-2">
                          No team members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Executive Popup */}
      {showAddExecutivePopup2 && (
        <>
          <div className="add-executive fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            ref={addExecutivePopupRef2}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="assign-manager w-[471px] h-[303px] p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => setShowAddExecutivePopup2(false)}
              >
                X
              </button>

              <div className="relative text-center">
                <div className="flex flex-wrap ml-6 gap-5">
                  <div>
                    <MdGroupAdd className="h-[27px] w-[27px] text-[#3D2314]" />
                  </div>
                  <div className="">
                    <h2 className="text-xl font-semibold mb-4 w-[195px] h-[27px]">
                      Add Sales Executive
                    </h2>
                  </div>
                </div>

                <div className="w-[423px] h-[127px] rounded-md border p-4 border-gray-300 font-manrope text-lg font-normal overflow-y-auto">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {executives.map((executive, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-300"
                      >
                        <button
                          onClick={() =>
                            handleRemoveItem(executive, setExecutives)
                          }
                          className="text-black text-[22px]"
                        >
                          &times;
                        </button>
                        <span className="ml-2">{executive}</span>
                      </div>
                    ))}
                  </div>
                  <textarea
                    className="add-executive1 w-full h-full p-2 border-none focus:outline-none"
                    placeholder="Add reserve sales executive"
                    value={executiveInput}
                    onChange={executiveHandle}
                    // onChange={(e) => setExecutiveInput(e.target.value)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, executiveInput, setExecutiveInput, setExecutives)
                    }

                  />
                </div>
              </div>
              <BtnTab

                doneTab={doneTab}
                setDoneTab={setDoneTab}
                isDisabled={executives.length === 0}
                handleSubmit={handleSubmitExecutives}
              />
            </div>
          </div>
        </>
      )}

      {/* Assign Manager Popup */}
      {showAssignManagerPopup2 && (
        <>
          <div className="add-manager fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            ref={assignManagerPopupRef2}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="assign-manager w-[471px] h-[303px] p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => setShowAssignManagerPopup2(false)}
              >
                X
              </button>

              <div className="relative text-center">
                <div className="flex flex-wrap ml-6 gap-5">
                  <div>
                    <MdGroupAdd className="h-[27px] w-[27px] text-[#3D2314]" />
                  </div>
                  <div className="">
                    <h2 className="text-xl font-semibold mb-4 w-[153px] h-[27px]">
                      Assign Manager
                    </h2>
                  </div>
                </div>

                <div className="w-[423px] h-[127px] rounded-md border p-4 border-gray-300 font-manrope text-lg font-normal overflow-y-auto">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {managers.map((manager, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-300"
                      >
                        <button
                          onClick={() =>
                            handleRemoveItem(manager, setManagers)
                          }
                          className="text-black text-[22px]"
                        >
                          &times;
                        </button>
                        <span className="ml-2">{manager}</span>
                      </div>
                    ))}
                  </div>
                  <textarea
                    className="add-manager1 w-full h-full p-2 border-none focus:outline-none"
                    placeholder="Add name of Manager"
                    value={managerInput}
                    // onChange={(e) => setManagerInput(e.target.value)}
                    onChange={managerHandle}
                    onKeyDown={(e) =>
                      handleKeyDown(e, managerInput, setManagerInput, setManagers)
                    }
                  />
                </div>
              </div>
              <BtnTab
                doneTab={doneTab}
                setDoneTab={setDoneTab}
                isDisabled={managers.length === 0}
                handleSubmit={handleSubmitManagers}
              />
            </div>
          </div>
        </>


      )}

      {/* Delete Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="Delete-popup w-[257px] h-[192px] py-[12px] px-[24px] rounded-md bg-white shadow-md z-50 flex items-center justify-center">
            <div className="text-center">
              <p className="font-manrope text-[20px] font-medium">
                Are you sure you want to delete this Member?
              </p>
              <p className="font-manrope text-[12px] font-medium text-[#6A6A6A] mt-2">
                This action cannot be undone.
              </p>
              <div className="delete-cont ml-1 flex justify-center items-center w-[197px] h-[33px] gap-6 mt-4">
                <button
                  className="w-[85px] h-[33px] p-2.5 bg-[#FFD9D9] rounded-md text-[#C71212] flex items-center justify-center"
                  onClick={confirmDelete} //Confirm delete action
                  style={{ fontWeight: '600', fontSize: '18px' }}
                >
                  Delete
                </button>
                <button
                  className="w-[85px] h-[33px] p-2.5 rounded-md border border-black flex items-center justify-center"
                  onClick={cancelDelete} // Cancel delete action
                  style={{ fontWeight: '600', fontSize: '18px' }}
                >
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


  );
};

export default Table6;
