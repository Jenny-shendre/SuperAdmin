import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import {MdGroupAdd} from "react-icons/md";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { TbReload } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import '../Home.css';


const BtnTab = ({doneTab, setDoneTab}) =>(
  <div className="flex mb-4 justify-end mt-5" style={{alignSelf:'self-end'}}>
  {['Done'].map((tab) => (
    <button
      key={tab}
      style={{fontFamily:'Manrope', padding:'10px 10px', width:'121px'}}
      className={` w-fit assign-manager-btn mt-3 h-12 py-3 px-6 bg-[grey] rounded-md  font-manrope text-lg font-medium text-white ${doneTab === tab ? 'bg-[grey] text-[#3D2314]' : 'bg-[#3D2314] text-white'} ${setDoneTab === tab ?  'bg-[#3D2314] text-white' : 'bg-[grey] text-[#3D2314]'}`}
      onClick={() => setDoneTab(tab) }>
      {tab}
    </button>
  ))}
  </div>
);

const Table6 = () => {

  const [doneTab, setDoneTab] = useState('Done');
  const [showAddExecutivePopup2, setShowAddExecutivePopup2] = useState(false);
  const [showAssignManagerPopup2, setShowAssignManagerPopup2] = useState(false);
  const [teamData, setTeamData] = useState([]);


  const location = useLocation();
  const pathname = location.pathname;
  const teamName = decodeURIComponent(pathname.substring(pathname.lastIndexOf("/") + 1));


  // console.log("teamName", teamName);

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
    const res = await axios.post("https://project-rof.vercel.app/api/teams/teamfliter", { teamName });
    setTeamData(res.data);
   } catch (error) {
    console.log(error);
   }
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("teamData", teamData);
   
  const arrayClientName = (ClientName) => {
    const uniqueClientNames = [
      ...new Set(ClientName.map((item) => item.ClientName)),
    ];
    const lastIndex = uniqueClientNames.length - 1;
    let clientnamelast = uniqueClientNames[lastIndex];
    return ClientName.length == 0 ? "Not Assign" : clientnamelast;
  };

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

  // const [executiveName2, setExecutiveName2] = useState('');
  // const [executiveEmail2, setExecutiveEmail2] = useState('');
  // const [executivePhone2, setExecutivePhone2] = useState('');
  // const [isExecutiveCreating2, setIsExecutiveCreating2] = useState(false);
  // const [executiveCreateStatus2, setExecutiveCreateStatus2] = useState('');
  // const [executiveErrorMessage2, setExecutiveErrorMessage2] = useState('');

  // const validateName = (name) => {
  //   return /^[A-Z][a-zA-Z]*$/.test(name);
  // };

  // const validateEmail = (email) => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  // const validatePhoneNumber = (phone) => {
  //   return /^\d{10}$/.test(phone);
  // };

  // const handlePhoneChange = (e, setPhone) => {
  //   const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  //   if (value.length <= 10) {
  //     setPhone(value);
  //   }
  // };

  // const handleAddExecutiveSubmit2 = async () => {
  //   if (executiveName2 && executiveEmail2 && executivePhone2) {
  //     if (!validateName(executiveName2)) {
  //       setExecutiveErrorMessage2('The first letter of the name must be capital.');
  //       return;
  //     }
  //     if (!validateEmail(executiveEmail2)) {
  //       setExecutiveErrorMessage2('Please enter a valid email address.');
  //       return;
  //     }
  //     if (!validatePhoneNumber(executivePhone2)) {
  //       setExecutiveErrorMessage2('Phone number must be exactly 10 digits.');
  //       return;
  //     }
  //     setIsExecutiveCreating2(true);
  //     setExecutiveErrorMessage2('');

  //     const executiveData1 = {
  //       name: executiveName2,
  //       emailID: executiveEmail2,
  //       phone: executivePhone2
  //     }

  //     try {
  //       // API call here
  //       const res = await axios.post("https://project-rof.vercel.app/api/attendants/save", executiveData1)
  //       console.log("res", res);
  //       setExecutiveCreateStatus2('Executive Created Successfully ✓');
  //       console.log("Response send", res);
  //     } catch (error) {
  //       console.error('Error creating executive:', error);
  //       setExecutiveCreateStatus2('Error Creating Executive');
  //       console.log(error);
  //     } finally {
  //       setIsExecutiveCreating2(false);
  //     }
  //   } else {
  //     setExecutiveErrorMessage2('Please fill in all fields.');
  //   }
  // };

  // const [managerName2, setManagerName2] = useState('');
  // const [managerEmail2, setManagerEmail2] = useState('');
  // const [managerPhone2, setManagerPhone2] = useState('');
  const [isManagerCreating2, setIsManagerCreating2] = useState(false);
  const [managerCreateStatus2, setManagerCreateStatus2] = useState('');
  const [managerErrorMessage2, setManagerErrorMessage2] = useState('');

  const handleAssignManagerSubmit2 = async () => {
    if (managerName2 && managerEmail2 && managerPhone2) {
      if (!validateName(managerName2)) {
        setManagerErrorMessage2('The first letter of the name must be capital.');
        return;
      }
      if (!validateEmail(managerEmail2)) {
        setManagerErrorMessage2('Please enter a valid email address.');
        return;
      }
      if (!validatePhoneNumber(managerPhone2)) {
        setManagerErrorMessage2('Phone number must be exactly 10 digits.');
        return;
      }
      setIsManagerCreating2(true);
      setManagerErrorMessage2('');

      const managerData1 = {
        name: managerName2,
        email: managerEmail2,
        phone: managerPhone2
      }

      try {
        // API call here
        const res = await axios.post("https://project-rof.vercel.app/api/salesManager/save", managerData1)
        console.log("res", res);
        setManagerCreateStatus2('Manager Created Successfully ✓');
        console.log("Response send", res);
      } catch (error) {
        console.error('Error creating manager:', error);
        setManagerCreateStatus2('Error Creating Manager');
        console.log(error);
      } finally {
        setIsManagerCreating2(false);
      }
    } else {
      setManagerErrorMessage2('Please fill in all fields.');
    }
  };

  return (
    <div className=" p-4 ">
      <div style={{marginLeft:'10px', display:'flex'}}>
        <div className="flex items-center [#000000] "
          style={{
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
          }}>
          <span >Home</span>
          <IoIosArrowForward style={{ color: "#1C1B1F" }} />
          <Link to="/SuperAdmin/Team">
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "24px",
            }}
            className="font-medium">
            {teamData.teamName}
          </span>
          </Link>
        </div>
      </div>

      <div style={{display: 'flex',gap:'24px', justifyContent:'center'}}>
        <div style={{ display: 'flex'}}>

       
        <input style={{ }}
          type="text"
          placeholder="Search"
          className=" w-[619px] h-[48px] pl-16 pr-4 py-2 rounded-full border border-[#3D2314] focus:outline-none focus:ring-2 focus:ring-brown-500 h-[48px] "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute top-[117px] left-[424px]"
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
      <div style={{ display: 'flex', gap:'24px'}}>
        <div>
        <button
          className="bg-[#3D2314] text-white px-4 py-2  rounded-full   w-[191px] h-[48px] flex item-center align-center justify-center gap-4"
          onClick={() => setShowAddExecutivePopup2(true)}
        >
        
        <MdAdd className='self-center text-[24px]'/>

         <span className='mt-[3px]'> Add Executive</span> 
        </button>
        </div>

        <div >
        <button
          className="border-2 border-[#3D2314] px-4 py-2 rounded-full w-[208px] h-[48px] flex item-center align-center justify-center gap-4"
          onClick={() => setShowAssignManagerPopup2(true)}
        ><TbReload className='color-[#3D2314] self-center text-[24px]' />
           Assign Manager
        </button>
        </div>
      
        </div>
      </div>
<br />
<div style={{textAlign:'-webkit-center'}}>
<div className="w-[927px] h-[591px] ">
        <div className='bg-[#D7D7D7] '>
          <h2 className="text-xl font-semibold mb-2 text-center">{teamData.teamName}</h2>
          <p className="text-sm mb-4 text-center [#313131]"
            style={{
              fontSize: "16px",
              fontFamily: "Manrope",
              fontWeight: "700",
              lineHeight: "21.86px",
            }}>
            {teamData.managerName} (Team Lead)
          </p>

          <table className="w-full ">
            <thead>
              <tr className="text-center text-sm font-medium [#000000] bg-[#E8E8E8] w-[188px] h-[28px]"
                style={{
                  fontFamily: "Manrope",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "16.39px",
                }}>
                <th className="py-2 ">Employee ID</th>
                <th className="py-2">Sales Executive</th>
                <th className="py-2">Sales Executive Email ID</th>
                <th className="py-2">Client Name</th>
                <th className="py-2">Project Name</th>
              </tr>
            </thead>

            <tbody>
              {teamData?.teamMemberNames?.length > 0 ? (
                teamData.teamMemberNames.map((member, index) => (

                  <tr key={index} className="border-t border-gray-200 text-center [#000000] w-[188px] h-[54px] p-10 bg-white"
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "21.86px",
                    }}>
                    <a href="" className='text-[#000AFF] text-center'
                      style={{
                        textDecoration: "Underline",
                      }}>
                      <td className="py-2 text-center">
                        <Link to="/SuperAdmin/TeamB">
                        {member.employeeId?.length > 0 ? member?.employeeId : "Not found"}

                        </Link>
                        </td>
                    </a>
                    <td className="py-2 ">{member.name?.length > 0 ? member?.name : "Not found"}</td>
                    <td className="py-2 ">{member.emailID?.length > 0 ? member?.emailID : "Not found"}</td>
                    <td className="py-2 ">{arrayClientName(member.ClientName)}</td>
                    <td className="py-2 ">{member.projectName?.length > 0 ? member?.projectName : "Not Assign"}</td>
                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-2">
                    No team members found
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
</div>
    

      {/* Add Executive Popup */}
      {showAddExecutivePopup2 && (
        <>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        <div
          ref={addExecutivePopupRef2}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="assign-manager w-[471px] h-[303px]  p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
            <button
              className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
              onClick={() => setShowAddExecutivePopup2(false)}
            >
              X
            </button>
           
           
            <div className="relative text-center">
              
            <div className=' flex flex-wrap ml-6   gap-5'>
           <div>
           <MdGroupAdd  className='h-[27px] w-[27px] text-[#3D2314]  '/>
           </div>
           <div className=''>
           <h2 className="text-xl font-semibold mb-4 w-[195px] h-[27px]">Add Sales Executive</h2>
           </div>
           </div>
              
              <textarea
                
                
                
                className="w-[423px] h-[127px] rounded-md border p-4 border-gray-300 font-manrope text-lg font-normal"
                placeholder="Add reserve sales executive"
                 
              />
            
            </div>
{/*             
            <button

            style={{alignSelf:'self-end'}}
              onClick={handleAssignManagerSubmit2}
              className="btnClass w-fit assign-manager-btn mt-3 h-12 py-3 px-6 bg-[grey] rounded-md text-end font-manrope text-lg font-medium text-white"
              disabled={isManagerCreating2}
            >
              {managerCreateStatus2 || 'Done'}
            </button> */}

            <BtnTab doneTab={doneTab} setDoneTab={setDoneTab}/>
            
            {managerErrorMessage2 && (
              <p className="text-red-500 mt-2">{managerErrorMessage2}</p>
            )}
          </div>
        </div>
      </>
      )}

      {/* Assign Manager Popup */}
      {showAssignManagerPopup2 && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            ref={assignManagerPopupRef2}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="assign-manager w-[471px] h-[303px]  p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => setShowAssignManagerPopup2(false)}
              >
                X
              </button>
             
             
              <div className="relative text-center">
                
              <div className=' flex flex-wrap ml-6   gap-5'>
             <div>
             <MdGroupAdd  className='h-[27px] w-[27px] text-[#3D2314]  '/>
             </div>
             <div className=''>
             <h2 className="text-xl font-semibold mb-4 w-[153px] h-[27px]">Assign Manager</h2>
             </div>
             </div>
                
                <textarea
                  
                  
                  
                  className="w-[423px] h-[127px] rounded-md border p-4 border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Add name of Manager"
                   // Ensures no more than 10 characters
                />
              
              </div>
              
              {/* <button

              style={{alignSelf:'self-end'}}
                onClick={handleAssignManagerSubmit2}
                className="w-fit assign-manager-btn mt-3 h-12 py-3 px-6 bg-[grey] rounded-md text-end font-manrope text-lg font-medium text-white"
                disabled={isManagerCreating2}
              >
                {managerCreateStatus2 || 'Done'}
              </button> */}

<BtnTab doneTab={doneTab} setDoneTab={setDoneTab}/>

              
              {managerErrorMessage2 && (
                <p className="text-red-500 mt-2">{managerErrorMessage2}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table6;
