import React, { useState, useRef, useEffect } from 'react';
import one from "../../assets/one.png";
import projectUploadIcon from "../../assets/project-upload.png";
import { IoIosArrowForward } from 'react-icons/io';
import { BiCommentError } from "react-icons/bi";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { MdOutlineImage } from "react-icons/md";
import { Link } from 'react-router-dom';

const Table7 = () => {
  const [action, setAction] = useState('service');
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [validationError, setValidationError] = useState("");
  const popupRef = useRef();
  const fileInputRef = useRef();

  const serviceLog = () => {
    setAction('service');
  };

  const chequeLog = () => {
    setAction('cheque');
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (!projectName || !projectAddress || !uploadedImage) {
      setValidationError("All fields are required.");
      return;
    }

    const newProject = {
      name: projectName,
      address: projectAddress,
      image: uploadedImage,
    };

    // Reset form and close popup
    setUploadedImage(null);
    setProjectName("");
    setProjectAddress("");
    setShowPopup(false);
    setValidationError("");
    console.log("Project added:", newProject);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const serviceLogData = [
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Resolved', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Pending', feedback: '★', comments: 'Satisfied' },
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', mobile: '8444954154', serviceType: 'Plumbing', servicePerson: 'Shankar S', servicePersonNo: '9849414642', status: 'Disputed', feedback: '★', comments: 'Satisfied' },
    // ... other data entries
  ];

  const chequedata = [
    { date: '26 June | 12:50 PM', name: 'Anand Jaiswal', id: 'ROF001', mobile: '8444954154' },
    // ... other data entries
  ];

  return (
    <div className="wrapper" style={{ overflow: 'hidden' }}>
      <div className="bg-[#F7F3E8] p-4">
        <div className="flex items-center text-black" style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}>
          <span>Home</span>
          <IoIosArrowForward style={{ color: "#1C1B1F" }} />
          <Link to='/Project'>
            <span className="font-semibold" style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "400" }}>Projects</span>
          </Link>
        </div>

        <div className="flex justify-between mb-4 ml-[370px]">
          <div className="relative w-2/3">
            <input
              className="w-[619px] h-[48px] py-2 px-12 rounded-full"
              style={{ border: "1px solid #3D2314", boxShadow: "0px 0px 4px 0px #00000040" }}
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
            className="bg-[#3D2314] text-white px-4 py-2 rounded-3xl mr-[450px] w-[220px]"
            onClick={() => setShowPopup(true)}
          >+ Add new Project</button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden w-[1130px] h-[290px] ml-[220px]">
          <div className="flex">
            <img src={one} alt="ROF Aalayas" className="w-1/3 object-cover h-[290px] w-[445px]" />
            <div className="p-4">
              <h2 style={{ fontFamily: "Manrope", fontWeight: "700", fontSize: '24px', textAlign: 'center', marginBottom: '15px' }}>ROF Aalayas</h2>
              <p style={{ fontFamily: 'Manrope', fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                ROF AALAYAS, strategically located on a 75-meter road close to Dwarka Expressway, ensures superior connectivity to Schools, Shopping Malls, Entertainment Zones, and Hotels in Gurgaon and Delhi NCR, besides being near the international Airport.
              </p>
              <br />
              <p style={{ fontFamily: 'Manrope', fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                ROF AALAYAS, a residential Affordable Housing Project, offers 1 and 2 BHK Apartments, promising a contemporary Indian lifestyle. You are bound to feel a mesmerizing sense of pleasure with all the desired modern facilities and a peaceful atmosphere amidst the vast stretch of green area opposite AALAYAS.
              </p>
            </div>
          </div>
        </div>

        <div className="flex mb-4 mt-4 ml-[730px]">
          <button
            className={`px-4 py-2 rounded-l-3xl ${action === 'service' ? 'bg-[#3D2314] text-white' : 'bg-white text-brown-700 border border-brown-700'}`}
            onClick={serviceLog}
          >Service Log</button>
          <button
            className={`px-4 py-2 rounded-r-3xl ${action === 'cheque' ? 'bg-[#3D2314] text-white' : 'bg-white text-brown-700 border border-brown-700'}`}
            onClick={chequeLog}
          >Cheque Log</button>
        </div>

        <div className="flex items-center justify-center w-full h-full">
          {action === 'service' && (
            <div className="overflow-x-auto" style={{ maxHeight: '363px' }}>
              <table className="bg-white border border-gray-300" style={{ width: 'fit-content' }}>
                <thead>
                  <tr className="text-center" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Date</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Customer Name</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Customer Mobile No</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Service Type</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Service Person</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Service Person No</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Status</th>
                    <th className="p-2 bg-[#3D2314] text-[#F7F3E8]">Feedback & Comments</th>
                  </tr>
                </thead>
                <tbody className="text-center" style={{ fontFamily: "Manrope", fontSize: "16px", fontWeight: "500", maxHeight: '363px', overflowY: 'auto' }}>
                  {serviceLogData.map((log, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-50' : ''}>
                      <td className="p-2 border-b">{log.date}</td>
                      <td className="p-2 border-b">{log.name}</td>
                      <td className="p-2 border-b">{log.mobile}</td>
                      <td className="p-2 border-b">{log.serviceType}</td>
                      <td className="p-2 border-b">{log.servicePerson}</td>
                      <td className="p-2 border-b">{log.servicePersonNo}</td>
                      <td className={`p-2 text-center leading-5 font-semibold border-b ${log.status === 'Resolved' ? 'text-[#3D943B]' :
                        log.status === 'Pending' ? 'text-[#E3CF16]' :
                          log.status === 'Disputed' ? 'text-[#EC2323]' : ''
                        }`}>{log.status}</td>
                      <td className="p-2 border-b">
                        5 <span className="text-yellow-500 items-center ">{log.feedback}</span>  {log.comments}
                        <BiCommentError className='inline ml-1' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {action === 'cheque' && (
            <div className="overflow-x-auto" style={{ maxHeight: '363px' }}>
              <table className="bg-white border border-gray-300" style={{ width: 'fit-content' }}>
                <thead>
                  <tr className="text-center" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
                    <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Date</th>
                    <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Customer Name</th>
                    <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Customer ID</th>
                    <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Customer Mobile No</th>
                    <th className="py-2 px-4 bg-[#3D2314] text-[#F7F3E8]">Cheque Photo</th>
                  </tr>
                </thead>
                <tbody className="text-center" style={{ fontFamily: "Manrope", fontSize: "16px", fontWeight: "500", maxHeight: '363px', overflowY: 'auto' }}>
                  {chequedata.map((row, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{row.date}</td>
                      <td className="py-2 px-4 border-b">{row.name}</td>
                      <td className="py-2 px-4 border-b">{row.id}</td>
                      <td className="py-2 px-4 border-b">{row.mobile}</td>
                      <td className="py-2 px-4 border-b"><MdOutlineImage className="mx-auto" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            ref={popupRef}
            className="popup-container w-[581px] h-fit p-6 gap-6 rounded-lg bg-white flex flex-col items-center z-50"
          >
            <div
              className="upload-box w-[323px] h-[189px] border-dotted border flex flex-col items-center justify-center gap-3 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={projectUploadIcon}
                    alt="Upload"
                    className="w-12 h-12"
                  />
                  <p className="font-manrope text-lg font-normal">
                    Upload Image
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <input
              type="text"
              className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mt-6"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
              className="project-address-input w-[533px] min-h-[134px] p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mt-6"
              placeholder="Project Description"
              value={projectAddress}
              onChange={(e) => setProjectAddress(e.target.value)}
            />
            <button
              className="add-project-button w-[170px] h-12 p-3 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white mt-6"
              onClick={handleAddProject}
            >
              Add new Project
            </button>
            {validationError && (
              <p className="text-red-500 mt-2">{validationError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table7;
