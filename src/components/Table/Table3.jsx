import { useEffect, useState, useCallback } from "react";
import Searchsvg from "../../assets/material-symbols_search.svg";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";
import { PiNotePencilBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "../Home.css";

const Table3 = () => {
  const [valueinput, setvalueinput] = useState(""); // Search input
  const [data, setdata] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const location = useLocation();
  const id = location.state || 0;
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    await axios.delete(`https://prodictivity-management-tool2.vercel.app/api/record/deleteRecord/${deleteId}`);
    setShowPopup(false);
    fetchData(); 
  };

  const fetchData = async () => {
    const res = await axios.get(`https://prodictivity-management-tool2.vercel.app/api/record/getAllRecords`);
    setdata(res.data);
    setFilteredData(res.data); // Initialize filtered data
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const onSearchChange = (e) => {
    const nativeEvent = e.nativeEvent;
    const query = e.target.value;
    const isCapsLockOn = nativeEvent.getModifierState && nativeEvent.getModifierState('CapsLock');
    setvalueinput(isCapsLockOn ? query.toUpperCase() : query);
  
    handleSearch(query.toLowerCase());
  };
  

const handleSearch = useCallback(debounce((query) => {
  const filtered = data.filter((item) =>
    item.customerName.toLowerCase().startsWith(query) ||
    item.channelPartnerName.toLowerCase().startsWith(query) ||
    item.projectName.toLowerCase().startsWith(query)
  );

  setFilteredData(filtered);
}, 300), [data]);

 
  const sortedData = filteredData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <>
      {data.length === 0 ? (
        <Loding />
      ) : (
        <div className="Tab3 p-1 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen" style={{ gap: "10px" }}>
          <div className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg" style={{ gap: "20px", paddingTop: "30px" }}>
            <h1 className="font-bold flex items-center gap-1" style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}>
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <Link to="/SuperAdmin/Channel_Partners">
                <span className="font-medium" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "24px" }}>
                  Channel Partners
                </span>
              </Link>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span className="font-medium" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "24px" }}>
                Rainbow Overseas
              </span>
            </h1>
            <div className="flex flex-row items-center justify-start text-center flex items-center justify-center ml-80">
              <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full mr-96">
                <input
                  className=" w-[619px] h-[48px] py-2 px-12 rounded-full"
                  style={{ border: "1px solid #3D2314", boxShadow: "0px 0px 4px 0px #00000040" }}
                  type="text"
                  value={valueinput}
                  onChange={onSearchChange} // Handle search input
                  placeholder="Search"
                />
                <img style={{ top: "0.6rem" }} src={Searchsvg} alt="Search" className="absolute left-4" />
              </div>
            </div>
            <div className="outer-wrapper">
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full bg-white" style={{ boxShadow: "0px 0px 4px 0px #00000040" }}>
                  <thead>
                    <tr className="text-[9px] lg:text-[15px] text-left bg-[#E8E8E8]">
                      <th className="font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "left", paddingLeft: "7px", padding: "5px", width: '65px' }}>Serial No</th>
                      <th className="font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", paddingLeft: "7px", padding: "5px", width: '149px' }}>Date</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '181px' }}>Customer Name</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '145px' }}>Last 4 Digit of Mobile No</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '155px' }}>List of Channel Partners</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '109px' }}>Agent Phone No</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '93px' }}>Project</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '164px' }}>Attendant</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '42px' }}>Edit</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '102px' }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item, index) => ( // Use filtered data
                      <tr className="text-[9px] lg:text-[14px]" key={item.id}>
                        {/* <td className="py-3 ml-6 text-center flex items-center" style={{ paddingLeft: "5px", textAlign: 'center' }}>{index + 1}</td> */}
                        <td className="py-3  text-center flex items-center justify-center"  style={{  borderBottom:"1px solid #E4E7EC" }}>{index + 1}</td>
                        <td className="py-1 border-b" style={{ paddingLeft: "5px", textAlign: 'center' }}>{DateupdatedAt(item.updatedAt)}</td>
                        <td className="py-1 border-b text-center">{item.customerName}</td>
                        <td className="py-1 border-b text-center">{item.customerMobileLastFour}</td>
                        <td className="py-1 border-b text-center">{item.channelPartnerCompanyName}</td>
                        <td className="py-1 border-b text-center">8484815614</td>
                        <td className="py-1 border-b text-center">{item.projectName}</td>
                        <td className="py-1 border-b text-center">{item.attendantName}</td>
                        <td className="py-1 px-3 border-b text-center">
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link to={`/SuperAdmin/EditForm2/${item._id}`}>
                              <PiNotePencilBold style={{ cursor: "pointer", fontSize: "18px", color: "#632E04" }} />
                            </Link>
                          </div>
                        </td>
                        <td className="py-1 px-3 border-b text-center">
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <RiDeleteBin6Line onClick={() => handleDeleteClick(item._id)} style={{ cursor: "pointer", fontSize: "18px", color: "#930000" }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="Delete-popup w-[257px] h-[192px] py-[12px] px-[24px] rounded-md bg-white shadow-md z-50 flex items-center justify-center">
            <div className="text-center">
              <p className="font-manrope text-[20px] font-medium">
                Are you sure you want to delete this row?
              </p>
              <p className="font-manrope text-[12px] font-medium text-[#6A6A6A] mt-2">
                This action cannot be undone.
              </p>
              <div className="delete-cont ml-1 flex justify-center items-center w-[197px] h-[33px] gap-6 mt-4">
                <button
                  className="w-[85px] h-[33px] p-2.5 bg-[#FFD9D9] rounded-md text-[#C71212] flex items-center justify-center"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  className="w-[85px] h-[33px] p-2.5 rounded-md border border-black flex items-center justify-center"
                  onClick={() => setShowPopup(false)}
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
    </>
  );
};

export default Table3;
