import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";

const ViewMembers = () => {
  const members = [
    { id: "ROFEX0055", name: "Somesh Singh", mobile: "9984485595", email: "samyak@rofgroup.com", role: "Manager" },
    { id: "ROFEX0055", name: "Sidhvani Geeta", mobile: "9984485595", email: "sidhvani@rofgroup.com", role: "Sales Executive" },
    { id: "ROFEX0055", name: "Rajshree Pandey", mobile: "9984485595", email: "rajshree@rofgroup.com", role: "Manager" },
    { id: "ROFEX0055", name: "Sanjeev Kumar", mobile: "9984485595", email: "sanjeev@rofgroup.com", role: "Manager" },
    { id: "ROFEX0055", name: "Shrutika Sinha", mobile: "9984485595", email: "shrutika@rofgroup.com", role: "Manager" },
    { id: "ROFEX0055", name: "Raghav Jha", mobile: "9984485595", email: "raghav@rofgroup.com", role: "Sales Executive" },
    { id: "ROFEX0055", name: "Sohail Khan", mobile: "9984485595", email: "sohail@rofgroup.com", role: "Sales Executive" },
    { id: "ROFEX0055", name: "Gurmeet Singh", mobile: "9984485595", email: "gurmeet@rofgroup.com", role: "Sales Executive" },
    { id: "ROFEX0055", name: "Prasad Tiwari", mobile: "9984485595", email: "Prasad@rofgroup.com", role: "Sales Executive" },
    { id: "ROFEX0055", name: "Prasad Tiwari", mobile: "9984485595", email: "Prasad@rofgroup.com", role: "Sales Executive" },
    { id: "ROFEX0055", name: "Prasad Tiwari", mobile: "9984485595", email: "Prasad@rofgroup.com", role: "Manager" },
    { id: "ROFEX0055", name: "Prasad Tiwari", mobile: "9984485595", email: "Prasad@rofgroup.com", role: "Sales Executive" },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  const handleDelete = () => {
    // Perform delete operation here.
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setDeleteId(null);
  };





  return (
    
    <div className="p-4">
      <h1  className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
                 <Link to="/SuperAdmin">
                  <span >Home</span>
                  </Link>
                <IoIosArrowForward style={{ color: "#1C1B1F" }} />
                <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
               View Members
              </span>
              </h1>
      <div className="flex flex-row items-center justify-center text-center">
        <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
        <input
        className="w-full py-2 px-12 rounded-full"
        style={{
            border:"1px solid #3D2314",
            boxShadow:"0px 0px 4px 0px #00000040",
        }}
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
        className="add-team-button bg-[#3D2314] text-white flex  rounded-full items-center justify-center ml-10 mt-4 lg:mt-0"
        style={{
            height:"48px",
            
            width:"120px", border:"1px solid #3D2314",boxShadow:"0px 0px 4px 0px  #00000040",
        }}>
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
      </div>
      <div className="outer-wrapper text-center flex items-center justify-center mt-[20px]">
        <div className="table-wrapper" style={{width:"1013px"}}>
      <table 
      className="min-w-full bg-white"
      style={{boxShadow:"0px 0px 4px 0px  #00000040",
        borderCollapse:"collapse",
      }}>
        <thead>
          <tr className="text-[9px] lg:text-[15px] text-left bg-[#E8E8E8]">
            <th 
            style={{   fontFamily: "Manrope",
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
                Employee ID</th>
            <th  className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "188px",
                          border: "1px solid #ddd",
                        }}>Full Name</th>
            <th  className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "188px",
                          border: "1px solid #ddd",
                        }}>Mobile No</th>
            <th  className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "203px",
                          border: "1px solid #ddd",
                        }}>Email ID</th>
            <th  className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "188px",
                          border: "1px solid #ddd",
                        }}>Role</th>
            <th  className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "58px",
                          border: "1px solid #ddd",
                        }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="border-b text-[9px] lg:text-[14px]">
              <td 
               style={{
                padding: "10px",
                border: "1px solid #ddd",
                width: "188px",
                height: "54px",
              }}
              >
              <div
              cclassName="py-3 text-center flex items-center "
              style={{
                display: "flex",
                color:"#000AFF",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "700",
                textDecoration:"underline",
                fontFamily: "Manrope",
                lineHeight: "21.86px",
              }}
              >
              {member.id}
              </div>
              </td>
              <td className="py-3 border-b text-center  max-w-[120px] overflow-hidden "
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
                            }}>{member.name}</td>
              <td className="py-3 border-b text-center  max-w-[120px] overflow-hidden "
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
                            }}>{member.mobile}</td>
              <td className="py-3 border-b text-center  max-w-[203px] overflow-hidden "
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
                            }}>{member.email}</td>
              <td className="py-3 border-b text-center  max-w-[120px] overflow-hidden "
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
                            }}>{member.role}</td>
              <td className="py-3  flex gap-5 "
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",}}>
              <RiDeleteBin6Line
                                onClick={() => {
                                  setShowPopup(true);
                                  setDeleteId();
                                  setDeletePartnerId(visitor.partnerId);
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
      {showPopup && (
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
                     
                      onClick={() => handleDelete(deleteId)}

                    >
                      Delete
                    </button>
                    <button
                      className="w-[85px]  h-[33px] p-2.5 rounded-md border-black border flex items-center justify-center"
                      // onClick={() => setShowPopup(false)}
                      onClick={handleClosePopup}

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

export default ViewMembers;