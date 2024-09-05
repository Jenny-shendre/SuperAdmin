import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loading from "../Loding/Loding";
import DropIcon from "../../assets/DropIcon.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const ViewMembers = () => {
  const [data, setData] = useState([]);
  const [managerData, setManagerdata] = useState([]);

  // const [deleteData, setDeleteData] = useState(null);
  const [executiveName, setExecutiveName] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueinput, setvalueinput] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showAddTeamMemberPopup, setShowAddTeamMemberPopup] = useState(false);
  const [showAddManagerPopup, setShowAddManagerPopup] = useState(false);
  const [showAddExecutivePopup, setShowAddExecutivePopup] = useState(false); // state for executive popup
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown
  const [data2, setdata2] = useState([]);

  const teamPopupRef = useRef();
  const addTeamMemberPopupRef = useRef();
  const addManagerPopupRef = useRef();
  const addExecutivePopupRef = useRef(); //  ref for executive popup
  const dropdownRef = useRef();
  const projectDropdownRef = useRef(); // ref for project dropdown

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/ViewMembers/ViewMembers`
      );
      setData(res.data);

      const res1 = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/salesManager/fetch-all`
      );
      setManagerdata(res1.data);

      const res2 = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/projects`
      );
      setdata2(res2.data);

      setLoading(false);
    } catch (error) {
      console.log(error.massage);
      setLoading(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (teamPopupRef.current && !teamPopupRef.current.contains(event.target)) {
      setShowTeamPopup(false);
    }
    if (
      addTeamMemberPopupRef.current &&
      !addTeamMemberPopupRef.current.contains(event.target)
    ) {
      setShowAddTeamMemberPopup(false);
    }
    if (
      addManagerPopupRef.current &&
      !addManagerPopupRef.current.contains(event.target)
    ) {
      setShowAddManagerPopup(false);
    }
    if (
      addExecutivePopupRef.current &&
      !addExecutivePopupRef.current.contains(event.target)
    ) {
      setShowAddExecutivePopup(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      projectDropdownRef.current &&
      !projectDropdownRef.current.contains(event.target)
    ) {
      setIsProjectDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (
      showTeamPopup ||
      showAddTeamMemberPopup ||
      showAddManagerPopup ||
      showAddExecutivePopup ||
      isDropdownOpen ||
      isProjectDropdownOpen
    ) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [
    showTeamPopup,
    showAddTeamMemberPopup,
    showAddManagerPopup,
    showAddExecutivePopup,
    isDropdownOpen,
    isProjectDropdownOpen,
  ]);

  // Add team members popup logic

  const [teamName, setTeamName] = useState("");
  const [project, setProject] = useState("");
  const [manager, setManager] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // state for error message

  const resetTeamForm = () => {
    setTeamName("");
    setProject("");
    setManager("");
    setMembers([]);
    setNewMember("");
    setCreateStatus("");
    setErrorMessage("");
  };

  // const handleAddMember = () => {
  //   if (newMember.trim() && !members.includes(newMember.trim())) {
  //     setMembers([...members, newMember.trim()]);
  //     setNewMember("");
  //   }
  // };

  const handleAddMember = (member) => {
    if (member.trim() && !members.includes(member.trim())) {
      setMembers([...members, member.trim()]);
      setNewMember("");
      setSuggestions([]);
    }
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedSuggestion) {
      handleAddMember(selectedSuggestion);
      setSelectedSuggestion(null); // Clear the selected suggestion after adding
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleAddMember();
  //   }
  // };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value.toLowerCase();
    setNewMember(inputValue);

    if (inputValue.trim()) {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND
          }/api/attendants/fetch-all?name=${inputValue.trim()}`
        );
        // Filter suggestions based on case-insensitive comparison
        const filteredSuggestions = res.data.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(inputValue)
        );
        setSuggestions(filteredSuggestions); // Set filtered suggestions

        // setSuggestions(res.data); // Assuming res.data contains the array of suggestions
      } catch (error) {
        console.error("Error fetching executive members:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    handleAddMember(suggestion);
    setNewMember(""); // Clear the input after selection
  };

  const handleProjectChange = (projectName) => {
    setProject(projectName);
    setIsProjectDropdownOpen(false);
  };

  const handleManagerChange = (managerName) => {
    setManager(managerName);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (teamName && project && manager && members) {
      setIsCreating(true);
      setErrorMessage(""); // Clear any previous error messages

      const teamdata = {
        teamName: teamName,
        projectName: project,
        managerName: manager,
        teamMemberName: members,
      };

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/teams/save`,
          teamdata
        );
        console.log("res", res);
        setCreateStatus("Team Created Successfully ✓");
        resetTeamForm();
        console.log("Response send", teamdata);
      } catch (error) {
        console.error("Error creating team:", error);
        setCreateStatus("Error Creating Team");
      } finally {
        setIsCreating(false);
      }
    } else {
      setErrorMessage(
        "Please fill in all fields and add at least one team member."
      );
    }
  };

  //  manager popup logic

  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState(""); // state for phone number
  const [isManagerCreating, setIsManagerCreating] = useState(false);
  const [managerCreateStatus, setManagerCreateStatus] = useState("");
  const [managerErrorMessage, setManagerErrorMessage] = useState(""); // state for error message
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const resetManagerForm = () => {
    setManagerName("");
    setManagerEmail("");
    setManagerPhone("");
    setManagerCreateStatus("");
    setManagerErrorMessage("");
    setPassword("");
  };

  const validateManagerName = (name) => {
    return /^[A-Z][a-zA-Z ]*$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^\d{10,15}$/.test(phone);
  };

  const handleManagerPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 15) {
      setManagerPhone(value);
    }
  };

  const handleManagerSubmit = async () => {
    if (managerName && managerEmail && managerPhone) {
      // Check for phone number
      if (!validateManagerName(managerName)) {
        setManagerErrorMessage("The first letter of the name must be capital.");
        return;
      }
      if (!validateEmail(managerEmail)) {
        setManagerErrorMessage("Please enter a valid email address.");
        return;
      }
      if (!validatePhoneNumber(managerPhone)) {
        setManagerErrorMessage("Phone number must be exactly 10 digits.");
        return;
      }
      if (password === "") {
        setManagerErrorMessage("Please enter Password to set.");
        return;
      }
      setIsManagerCreating(true);
      setManagerErrorMessage(""); // Clear any previous error messages

      const managerData = {
        name: managerName,
        email: managerEmail,
        phone: managerPhone,
        password: password,
      };
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/salesManager/save`,
          managerData
        );
        console.log("res", res);
        setManagerCreateStatus("Manager Created Successfully ✓");
        console.log("Response send", res);

        const updatedManagers = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/salesManager/fetch-all`
        );
        setManagerdata(updatedManagers.data);

        // Fetch and update member data
        const updatedMembers = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/ViewMembers/ViewMembers`
        );
        setData(updatedMembers.data);
      } catch (error) {
        console.error("Error creating manager:", error);
        setManagerCreateStatus("Error Creating Manager");
        console.log(error);
      } finally {
        setIsManagerCreating(false);
      }
    } else {
      setManagerErrorMessage("Please fill in all fields.");
    }
  };

  //  executive popup logic

  const [executiveEmail, setExecutiveEmail] = useState("");
  const [executivePhone, setExecutivePhone] = useState(""); // state for phone number
  const [isExecutiveCreating, setIsExecutiveCreating] = useState(false);
  const [executiveCreateStatus, setExecutiveCreateStatus] = useState("");
  const [executiveErrorMessage, setExecutiveErrorMessage] = useState(""); //  state for error message
  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);


  const resetExecutiveForm = () => {
    setExecutiveName("");
    setExecutiveEmail("");
    setExecutivePhone("");
    setExecutiveCreateStatus("");
    setExecutiveErrorMessage("");
    setPassword2("");
  };

  const handleExecutivePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 15) {
      setExecutivePhone(value);
    }
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleExecutiveSubmit = async () => {
    if (executiveName && executiveEmail && executivePhone) {
      // Check for phone number
      if (!validateManagerName(executiveName)) {
        setExecutiveErrorMessage(
          "The first letter of the name must be capital."
        );
        return;
      }
      if (!validateEmail(executiveEmail)) {
        setExecutiveErrorMessage("Please enter a valid email address.");
        return;
      }
      if (!validatePhoneNumber(executivePhone)) {
        setExecutiveErrorMessage("Phone number must be exactly 10 digits.");
        return;
      }
      setIsExecutiveCreating(true);
      setExecutiveErrorMessage(""); // Clear any previous error messages

      const executiveData = {
        name: executiveName,
        email: executiveEmail,
        phone: executivePhone,
        password: password2,
      };

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/attendants/save`,
          executiveData
        );
        console.log("res", res);
        setExecutiveCreateStatus("Executive Created Successfully ✓");
        console.log("Response send", res);

        // Fetch and update member data
        const updatedMembers = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/ViewMembers/ViewMembers`
        );
        setData(updatedMembers.data);
      } catch (error) {
        console.error("Error creating executive:", error);
        setExecutiveCreateStatus("Error Creating Executive");
      } finally {
        setIsExecutiveCreating(false);
      }
    } else {
      setExecutiveErrorMessage("Please fill in all fields.");
    }
  };

  //vb
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text || "";
  };

  const handleDelete = async (deleteId) => {
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND
        }/api/ViewMembers/ViewMembersDelete/${deleteId}`
      );
      // setDeleteData(res.data);
      console.log("Delete response", res);
      setData((prevData) =>
        prevData.filter((member) => member._id !== deleteId)
      );
      setShowPopup(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("data", data);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4">

          <h1
            className="font-bold flex items-center gap-1"
            style={{
              fontFamily: "Poppins",
              fontSize: "24px",
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
                fontSize: "24px",
              }}
              className="font-medium">
              View Members
            </span>
          </h1>
          <div className="flex flex-row items-center justify-center text-center">
            <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
              <input
                className="w-full py-2 px-12 rounded-full"
                style={{
                  border: "1px solid #3D2314",
                  boxShadow: "0px 0px 4px 0px #00000040",
                }}
                value={valueinput}
                onChange={(e) => setvalueinput(e.target.value)}
                type="text"
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
              className="add-team-button bg-[#3D2314] text-white flex  rounded-full items-center justify-center ml-10 mt-4 lg:mt-0"
              style={{
                height: "48px",

                width: "120px",
                border: "1px solid #3D2314",
                boxShadow: "0px 0px 4px 0px  #00000040",
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor">
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
                  className="ml-[620px] mt-[220px] team-creation-popup w-[125px] h-[147px] rounded-[4px] bg-white absolute z-50 flex flex-col justify-between">
                  <button
                    className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                    onClick={() => {
                      setShowTeamPopup(false);
                      setShowAddTeamMemberPopup(true);
                      resetTeamForm();
                    }}>
                    Add Team
                  </button>
                  <button
                    className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                    onClick={() => {
                      setShowTeamPopup(false);
                      setShowAddManagerPopup(true);
                      resetManagerForm();
                    }}>
                    Add Manager
                  </button>
                  <button
                    className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                    onClick={() => {
                      setShowTeamPopup(false);
                      setShowAddExecutivePopup(true);
                      resetExecutiveForm();
                    }}>
                    Add Executive
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="outer-wrapper text-center flex items-center justify-center mt-[20px]">
            <div className="table-wrapper" style={{ width: "900px" }}>
              <table
                className="min-w-full bg-white"
                style={{
                  boxShadow: "0px 0px 4px 0px  #00000040",
                  borderCollapse: "collapse",
                }}>
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
                        width: "188px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        justifyContent: "center",
                      }}>
                      Employee ID
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
                        width: "188px",
                        border: "1px solid #ddd",
                      }}>
                      Full Name
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
                        width: "188px",
                        border: "1px solid #ddd",
                      }}>
                      Mobile No
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
                        width: "203px",
                        border: "1px solid #ddd",
                      }}>
                      Email ID
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
                        width: "188px",
                        border: "1px solid #ddd",
                      }}>
                      Role
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
                        width: "58px",
                        border: "1px solid #ddd",
                      }}>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(
                      ({ employeeId, name, phone, email, role }) =>
                        name
                          ?.toLowerCase()
                          .includes(valueinput.toLowerCase()) ||
                        employeeId
                          ?.toLowerCase()
                          .includes(valueinput.toLowerCase()) ||
                        phone
                          ?.toLowerCase()
                          .includes(valueinput.toLowerCase()) ||
                        email
                          ?.toLowerCase()
                          .includes(valueinput.toLowerCase()) ||
                        role?.toLowerCase().includes(valueinput.toLowerCase())
                    )
                    .map((member, index) => (
                      <tr
                        key={index}
                        className="border-b text-[9px] lg:text-[14px]">
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                            width: "188px",
                            height: "54px",
                          }}>
                          <div
                            cclassName="py-3 text-center flex items-center "
                            style={{
                              display: "flex",
                              color: "#000AFF",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "16px",
                              fontWeight: "700",
                              textDecoration: "underline",
                              fontFamily: "Manrope",
                              lineHeight: "21.86px",
                            }}>
                            {member &&
                            member.employeeId &&
                            member.employeeId.length > 0
                              ? member.employeeId
                              : "not found"}
                          </div>
                        </td>
                        <td
                          className="py-3 border-b text-center  max-w-[120px] overflow-hidden "
                          style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "188px",
                            height: "54px",
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Manrope",
                            lineHeight: "21.86px",
                          }}>
                          {member && member.name && member.name.length > 0
                            ? member.name
                            : "not found"}
                        </td>
                        <td
                          className="py-3 border-b text-center  max-w-[120px] overflow-hidden "
                          style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "188px",
                            height: "54px",
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Manrope",
                            lineHeight: "21.86px",
                          }}>
                          {member && member.phone && member.phone.length > 0
                            ? member.phone
                            : "not found"}
                        </td>
                        <td
                          className="py-3 border-b text-center  max-w-[203px] overflow-hidden "
                          style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "203px",
                            height: "54px",
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Manrope",
                            lineHeight: "21.86px",
                          }}>
                          {member && member.email && member.email.length > 0
                            ? member.email
                            : "not found"}
                        </td>
                        <td
                          className="py-3 border-b text-center  max-w-[120px] overflow-hidden "
                          style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "188px",
                            height: "54px",
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Manrope",
                            lineHeight: "21.86px",
                          }}>
                          {member && member.role && member.role.length > 0
                            ? member.role
                            : "not found"}
                        </td>
                        <td
                          className="py-3  flex gap-5 "
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}>
                          <RiDeleteBin6Line
                            onClick={() => {
                              setShowPopup(true);
                              setDeleteId(member._id);
                              // setDeletePartnerId(visitor.partnerId);
                            }}
                            style={{
                              width: "18px",
                              height: "19px",
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
            </div>
          </div>

          {showPopup && deleteId !== null && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="Delete-popup w-[257px] h-[192px]  py-[12px] px-[24px] rounded-md bg-white shadow-md z-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-manrope text-[20px] font-medium">
                    Are you sure you want to delete this row?
                  </p>
                  <p className="font-manrope text-[12px] font-medium text-[#6A6A6A] mt-2">
                    This action cannot be undone.
                  </p>
                  <div className="delete-cont flex justify-center items-center w-[197px] ml-1 h-[33px] gap-6 mt-4">
                    <button
                      className="w-[85px]  h-[33px] p-2.5 bg-[#FFD9D9] rounded-md text-[#C71212] flex items-center justify-center"
                      onClick={() => handleDelete(deleteId)}>
                      Delete
                    </button>
                    <button
                      className="w-[85px]  h-[33px] p-2.5 rounded-md border-black border flex items-center justify-center"
                      // onClick={() => setShowPopup(false)}
                      onClick={handleClosePopup}>
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
          {/* Add team member screen */}
          {showAddTeamMemberPopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addTeamMemberPopupRef}
                className="fixed inset-0 flex items-center justify-center z-50">
                <div className="add-team-members w-[488px] h-auto p-[24px] rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddTeamMemberPopup(false)}>
                    X
                  </button>
                  <div style={{ width: "440px", height: "319px" }}>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-[440px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4"
                      placeholder="Team Name"
                    />
                    <div
                      className="relative w-[440px] h-12 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 block shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                      onClick={() =>
                        setIsProjectDropdownOpen(!isProjectDropdownOpen)
                      }
                      ref={projectDropdownRef}>
                      <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                        {project || "Assign Project"}
                        <img
                          className="ml-2 h-2 w-3 "
                          src={DropIcon}
                          alt="Dropdown Icon"
                        />
                      </div>
                      {isProjectDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
                          {data2.map((projects) => (
                            <div
                              key={projects.name}
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleProjectChange(projects.name)
                              }>
                              {projects.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div
                      className="relative w-[440px] h-12 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 block shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                        {manager || "Assign Manager"}
                        <img
                          className="ml-2 h-2 w-3 "
                          src={DropIcon}
                          alt="Dropdown Icon"
                        />
                      </div>
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
                          {managerData.map((sales) => (
                            <div
                              key={sales.name}
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() => handleManagerChange(sales.name)}>
                              {sales.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="add-members w-[440px] h-[127px] px-[24px] py-[12px] rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 overflow-y-auto">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {members.map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-300">
                            <button
                              onClick={() => handleRemoveMember(member)}
                              className="text-black text-[22px]">
                              &times;
                            </button>
                            <span className="ml-2 ">{member}</span>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={newMember}
                        // onChange={(e) => setNewMember(e.target.value)}
                        // onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="add-member"
                        placeholder="Add Team Member"
                      />
                      {suggestions.length > 0 && (
                        <div className="suggestions">
                          {suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="suggestion-item"
                              onClick={() =>
                                handleSuggestionClick(suggestion.name)
                              }>
                              {suggestion.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <br />
                  <button
                    onClick={handleSubmit}
                    className="w-[192px] h-[44px] p-[10px] bg-[#3D2314] rounded-md text-center font-manrope  text-white"
                    style={{
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "19.2px",
                    }}
                    disabled={isCreating}>
                    {createStatus || "Create Team"}
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Add manager screen */}
          {showAddManagerPopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addManagerPopupRef}
                className="fixed inset-0 flex items-center justify-center z-50">
                <div className="add-manager w-[488px] h-auto p-[24px] rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddManagerPopup(false)}>
                    X
                  </button>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Sales Manager Name"
                    />
                    {!validateManagerName(managerName) &&
                      managerName.length > 0 && (
                        <p className="text-red-500 text-left text-xs">
                          The first letter of the name must be capital.
                        </p>
                      )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="email"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      className="w-full h-full p-4  rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Email ID"
                    />
                    <img
                      src={EmailIcon}
                      alt="Email"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />

                    {!validateEmail(managerEmail) &&
                      managerEmail.length > 0 && (
                        <p className="text-red-500 text-left text-xs">
                          Please enter a valid email address.
                        </p>
                      )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={managerPhone}
                      onChange={handleManagerPhoneChange}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Phone No"
                      maxLength={15} // Ensures no more than 10 characters
                    />
                    <img
                      src={PhoneIcon}
                      alt="Phone"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                    {!validatePhoneNumber(managerPhone) &&
                      managerPhone.length > 0 && (
                        <p className="text-red-500 text-left text-xs">
                          {/* Phone number must be exactly 10 digits. */}
                        </p>
                      )}
                  </div>

                  <div className="relative w-[440px] h-12 mb-4 flex rounded-md border border-gray-300">
                    <input
                      className="w-full h-full p-4  font-manrope text-lg font-normal"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <button onClick={handleTogglePassword} className="pr-4">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <button
                    onClick={handleManagerSubmit}
                    className="w-fit create-manager-btn h-[44px] p-[10px] bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                    disabled={isManagerCreating}>
                    {managerCreateStatus || "Add"}
                  </button>
                  {managerErrorMessage && (
                    <p className="text-red-500 mt-2">{managerErrorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Add executive screen */}
          {showAddExecutivePopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addExecutivePopupRef}
                className="fixed inset-0 flex items-center justify-center z-50">
                <div className="add-executive w-[488px] h-auto p-[24px] rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddExecutivePopup(false)}>
                    X
                  </button>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={executiveName}
                      onChange={(e) => setExecutiveName(e.target.value)}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Name"
                    />
                    {!validateManagerName(executiveName) &&
                      executiveName.length > 0 && (
                        <p className="text-red-500 text-left text-xs">
                          The first letter of the name must be capital.
                        </p>
                      )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="email"
                      value={executiveEmail}
                      onChange={(e) => setExecutiveEmail(e.target.value)}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Executive Email ID"
                    />
                    <img
                      src={EmailIcon}
                      alt="Email"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />

                    {!validateEmail(executiveEmail) &&
                      executiveEmail.length > 0 && (
                        <p className="text-red-500 text-left text-xs">
                          Please enter a valid email address.
                        </p>
                      )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={executivePhone}
                      onChange={handleExecutivePhoneChange}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Phone No"
                      maxLength={15} // Ensures no more than 10 characters
                    />
                    <img
                      src={PhoneIcon}
                      alt="Phone"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                    {!validatePhoneNumber(executivePhone) &&
                      executivePhone.length > 0 && (
                        <p className="text-red-500 text-left text-xs">
                          {/* Phone number must be exactly 10 digits. */}
                        </p>
                      )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4 flex rounded-md border border-gray-300">
                    <input
                      className="w-full h-full p-4  font-manrope text-lg font-normal"
                      type={showPassword2 ? "text" : "password"}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <button onClick={handleTogglePassword2} className="pr-4">
                      {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  
                  <button
                    onClick={handleExecutiveSubmit}
                    className="w-fit create-executive-btn h-12 py-3 px-6 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                    disabled={isExecutiveCreating}>
                    {executiveCreateStatus || "Add"}
                  </button>
                  {executiveErrorMessage && (
                    <p className="text-red-500 mt-2">{executiveErrorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ViewMembers;
