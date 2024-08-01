import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { format } from "date-fns";
import "../Home.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loding from "../Loding/Loding";
const FormEdit = () => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    customerId: "",
    attendantName: "",
    projectName: "",
    createdAt: "",
    responseTime: "",
    timeDuration: "",
    createdAt: "",
  });
  const toggleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://project-rof.vercel.app/api/customers/fetch/${id}`
      );
      setFormData(res.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  //  ! time
  const DateupdatedAt = (DateupdatedAt) => {
    if (!DateupdatedAt) return "Invalid Date";
    try {
      const formattedDate = format(new Date(DateupdatedAt), "dd MMM yyyy");
      return formattedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  const ResponseAt = (DateupdatedAt) => {
    if (!DateupdatedAt) return "Invalid Date";
    try {
      const formattedDate = format(new Date(DateupdatedAt), "hh:mm a");
      return formattedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handler to update the state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleEditMode = async (id) => {
    setEditMode(!editMode);

    try {
      const res = await axios.put(
        `https://project-rof.vercel.app/api/customers/update/${id}`,
        {
          ...FormData,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loding />
      ) : (
        <div key={FormData.mobile}>
          <div className="flex flex-wrap ">
            <div className="ml-8 mt-8">
              <h1
                className="font-bold flex items-center gap-1"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  fontWeight: "500",
                }}>
                Home
                <IoIosArrowForward style={{ color: "#1C1B1F" }} />
                <Link to="/SuperAdmin/Direct_Visitors">
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "24px",
                    }}
                    className="font-medium">
                 Direct Visitors
                  </span>
                </Link>
                <IoIosArrowForward style={{ color: "#1C1B1F" }} />
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "24px",
                  }}
                  className="font-medium">
                  Customer ID
                </span>
              </h1>
            </div>
            <div className="lg:ml-[710px] mt-5">
              <button
                key={FormData._id}
                className="flex lg:px-8 lg:py-4 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full"
                onClick={() => toggleEditMode(FormData._id)}>
                <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                  <FaRegEdit />
                </h4>
                <p className="text-[16px]">
                  {editMode ? "Save" : "Edit Details"}
                </p>
              </button>
            </div>
          </div>
          <main className="flex flex-wrap gap-5 lg:ml-8 lg:mt-10">
            <div
              className="lg:w-[695px] lg:h-[683px] bg-[#FFFFFF] p-[24px] rounded-2xl mb-6 lg:mb-0 lg:mr-4"
              style={{
                borderRadius: "24px",
                boxShadow: "0px 0px 6.7px 0px #632E04",
              }}>
              <h2
                className="text-[20px] text-center font-[Manrope] mb-4"
                style={{ fontWeight: "700" }}>
                Customer Details
              </h2>
              <form>
                <div className="form-compont">
                  <div>
                    <div className="flex flex-wrap gap-[40px]">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                          Customer Name
                        </label>
                        <input
                        
                          type="text"
                          id="first_name"
                          className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                          placeholder="John Doe"
                          required
                          name="name"
                          readOnly={!editMode}
                          value={FormData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                            
                          Mobile No
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                          placeholder="9425846894"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          required
                          name="mobile"
                          value={FormData.mobile}
                          onChange={handleChange}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="lg:mt-1">
                      <label
                        htmlFor="email"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Email ID
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        placeholder="johndoe@gmail.com"
                        required
                        name="email"
                        value={FormData.email}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                  </div>

                  <div className="mt-1">
                    <div className="flex flex-wrap gap-[40px]">
                      <div>
                        <label
                          htmlFor="Project A"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                          Project
                        </label>
                        <input
                          type="text"
                          id="Project A"
                          className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                          placeholder="Project A"
                          name="projectName"
                          value={FormData.projectName}
                          onChange={handleChange}
                          readOnly={true}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Customer ID"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                          Customer ID
                        </label>
                        <input
                          type="text"
                          id="Customer ID"
                          className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                          placeholder="ROF0001"
                          required
                          name="customerId"
                          value={FormData.customerId}
                          onChange={handleChange}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="lg:mt-1">
                      <label
                        htmlFor="attendant"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Attendant
                      </label>
                      <input
                        type="text"
                        id="attendant"
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        placeholder="Samyak Gandhi"
                        required
                        name="attendantName"
                        value={FormData.attendantName}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="lg:flex lg:flex-wrap gap-[24px] lg:mt-1">
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Date
                      </label>
                      <input
                        type="text"
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{textAlign:'center' ,fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        name="createdAt"
                        value={DateupdatedAt(FormData.createdAt)}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Response Time
                      </label>
                      <input
                        type="text"
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{textAlign:'center' ,fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        name="responseTime"
                        value={ResponseAt(FormData.createdAt)}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Meeting Duration
                      </label>
                      <input
                        type="text"
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{textAlign:'center',fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        name="timeDuration"
                        value={FormData.timeDuration}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="textarear-comp">
                    <div className="mt-1">
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Executive Notes
                      </label 
    >
                      <textarea
                        className="lg:w-[647px] lg:h-[100px] border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        readOnly={!editMode}>
                        {FormData.notes}
                      </textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div
              style={{
                boxShadow: " 0px 0px 6.7px 0px #632E04",
              }}
              className="lg:w-[555px] lg:h-[683px] bg-[#FFFFFF] p-[8px] rounded-2xl">
              <div className="mt-4">
                <h2
                  className="text-center mb-4 text-[#000000] text-[20px] font-[Manrope]"
                  style={{ fontWeight: "700" }}>
                  Customer Activity Log
                </h2>
              </div>
              <div className="w-full overflow-x-auto">
                <div className="w-full h-[87%] overflow-y-auto">
                  <table className="w-full text-leftm">
                    <thead className="">
                      <tr className="text-[#FFFFFF]">
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Serial No
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Date
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Timing
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Project
                        </th>
                        <th className="border-b p-2 bg-[#3D2314]" style={{ fontSize: "14px", fontWeight: "400" }}>
                          Attendant
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b p-2 text-[#000000] text-[16px] font-[Manrope]" style={{ fontWeight: "500" }}>
                      {FormData && FormData.log && FormData.log.length > 0
                        ? FormData.log.map((item, index) => (
                          <tr key={item.id}>
                            <td className="border-b p-2">{index + 1}</td>
                            <td className="border-b p-2">{DateupdatedAt(item.createdAt)}</td>
                            <td className="border-b p-2">{ResponseAt(item.createdAt)}</td>
                            <td className="border-b p-2">{item.projectName}</td>
                            <td className="border-b p-2">{item.attendantName}</td>
                          </tr>
                        ))
                        : "No Data Found..."}
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default FormEdit;
