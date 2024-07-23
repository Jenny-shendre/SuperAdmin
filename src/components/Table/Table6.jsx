import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";

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

  const [showAddExecutivePopup2, setShowAddExecutivePopup2] = useState(false);
  const [showAssignManagerPopup2, setShowAssignManagerPopup2] = useState(false);

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

  const [executiveName2, setExecutiveName2] = useState('');
  const [executiveEmail2, setExecutiveEmail2] = useState('');
  const [executivePhone2, setExecutivePhone2] = useState('');
  const [isExecutiveCreating2, setIsExecutiveCreating2] = useState(false);
  const [executiveCreateStatus2, setExecutiveCreateStatus2] = useState('');
  const [executiveErrorMessage2, setExecutiveErrorMessage2] = useState('');

  const handleAddExecutiveSubmit2 = async () => {
    if (executiveName2 && executiveEmail2 && executivePhone2) {
      setIsExecutiveCreating2(true);
      setExecutiveErrorMessage2('');

      try {
        // API call here
        setExecutiveCreateStatus2('Executive Created Successfully ✓');
      } catch (error) {
        console.error('Error creating executive:', error);
        setExecutiveCreateStatus2('Error Creating Executive');
      } finally {
        setIsExecutiveCreating2(false);
      }
    } else {
      setExecutiveErrorMessage2('Please fill in all fields.');
    }
  };

  const [managerName2, setManagerName2] = useState('');
  const [managerEmail2, setManagerEmail2] = useState('');
  const [managerPhone2, setManagerPhone2] = useState('');
  const [isManagerCreating2, setIsManagerCreating2] = useState(false);
  const [managerCreateStatus2, setManagerCreateStatus2] = useState('');
  const [managerErrorMessage2, setManagerErrorMessage2] = useState('');

  const handleAssignManagerSubmit2 = async () => {
    if (managerName2 && managerEmail2 && managerPhone2) {
      setIsManagerCreating2(true);
      setManagerErrorMessage2('');

      try {
        // API call here
        setManagerCreateStatus2('Manager Created Successfully ✓');
      } catch (error) {
        console.error('Error creating manager:', error);
        setManagerCreateStatus2('Error Creating Manager');
      } finally {
        setIsManagerCreating2(false);
      }
    } else {
      setManagerErrorMessage2('Please fill in all fields.');
    }
  };

  return (
    <div className="container mx-auto p-4 w-[927px] h-[591px] ">
      <div style={{ position: 'relative', right: '380px' }}>
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

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <input style={{ position: 'relative', top: '50px', right: '150px' }}
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
        <button style={{ position: 'relative', right: '50px', bottom: '4px' }}
          className="bg-[#3D2314] text-white px-4 py-2  rounded-full mt-[5px] ml-[550px] w-[191px] h-[48px] "
          onClick={() => setShowAddExecutivePopup2(true)}
        >
          Add Executive
        </button>
        <button style={{ position: 'relative', left: '20px', bottom: '38px' }}
          className="border-2 border-[#3D2314] px-4 py-2 rounded-full mt-[-60px] ml-[700px] w-[208px] h-[48px]"
          onClick={() => setShowAssignManagerPopup2(true)}
        >
          Assign Manager
        </button>
      </div>

      <div className=" ">
        <div className='bg-[#D7D7D7] '>
          <h2 className="text-xl font-semibold mb-2 text-center">Team A</h2>
          <p className="text-sm mb-4 text-center [#313131]"
            style={{
              fontSize: "16px",
              fontFamily: "Manrope",
              fontWeight: "700",
              lineHeight: "21.86px",
            }}>
            Somesh Chaturvedi (Team Lead)
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
              {teamMembers.map((member, index) => (
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

      {/* Add Executive Popup */}
      {showAddExecutivePopup2 && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            ref={addExecutivePopupRef2}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="add-executive w-[488px] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => setShowAddExecutivePopup2(false)}
              >
                X
              </button>
              <div className="relative w-[440px] h-12 mb-4">
                <input
                  type="text"
                  value={executiveName2}
                  onChange={(e) => setExecutiveName2(e.target.value)}
                  className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Name"
                />
              </div>
              <div className="relative w-[440px] h-12 mb-4">
                <input
                  type="email"
                  value={executiveEmail2}
                  onChange={(e) => setExecutiveEmail2(e.target.value)}
                  className="w-full h-full p-4  rounded-md border border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Executive Email ID"
                />
                <img src={EmailIcon} alt="Email" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative w-[440px] h-12 mb-4">
                <input
                  type="text"
                  value={executivePhone2}
                  onChange={(e) => setExecutivePhone2(e.target.value)}
                  className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Phone No"
                />
                <img src={PhoneIcon} alt="Phone" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button
                onClick={handleAddExecutiveSubmit2}
                className="w-fit create-executive-btn h-12 py-3 px-6 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                disabled={isExecutiveCreating2}
              >
                {executiveCreateStatus2 || 'Add'}
              </button>
              {executiveErrorMessage2 && (
                <p className="text-red-500 mt-2">{executiveErrorMessage2}</p>
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
            <div className="assign-manager w-[488px] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
              <button
                className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                onClick={() => setShowAssignManagerPopup2(false)}
              >
                X
              </button>
              <div className="relative w-[440px] h-12 mb-4">
                <input
                  type="text"
                  value={managerName2}
                  onChange={(e) => setManagerName2(e.target.value)}
                  className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Sales Manager Name"
                />
              </div>
              <div className="relative w-[440px] h-12 mb-4">
                <input
                  type="email"
                  value={managerEmail2}
                  onChange={(e) => setManagerEmail2(e.target.value)}
                  className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Email ID"
                />
                <img src={EmailIcon} alt="Email" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative w-[440px] h-12 mb-4">
                <input
                  type="text"
                  value={managerPhone2}
                  onChange={(e) => setManagerPhone2(e.target.value)}
                  className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                  placeholder="Phone No"
                />
                <img src={PhoneIcon} alt="Phone" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button
                onClick={handleAssignManagerSubmit2}
                className="w-fit assign-manager-btn h-12 py-3 px-6 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                disabled={isManagerCreating2}
              >
                {managerCreateStatus2 || 'Add'}
              </button>
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