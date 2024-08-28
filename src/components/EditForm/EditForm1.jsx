import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Loding/Loding";
import axios from "axios";
import { format } from "date-fns";
import {
  ChevronRight,
  Bold,
  Italic,
  AlignJustify,
  List,
  Paperclip,
  Smile,
} from "lucide-react";

function EditForm1() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [FormData, setFormData] = useState({
    customerName: "",
    channelPartnerCompanyName: "",
    channelPartnerName: "",
    customerMobileLastFour: "",
    partnerId: "",
    projectName: "",
    createdAt: "",
    responseTime: "",
    timeDuration: "",
    createdAt: "",
    updatedAt: "",
  });
  const [data, setData] = useState({});

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://project-rof.vercel.app/api/partners/fetch/${id}`
      );
      setFormData(res.data);

      const res1 = await axios.post(
        `https://project-rof.vercel.app/api/partners/fetchByName`,
        { channelPartnerName: res.data.channelPartnerName }
      );

      setData(res1.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log("FormData", FormData);
  console.log("Data", data);

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

  const ResponseAtData = (DateupdatedAt) => {
    if (!DateupdatedAt) return "Invalid Date";
    try {
      // Convert the ISO string to a Date object
      const date = new Date(DateupdatedAt);

      // Format the date into the desired format
      const formattedDate = format(date, "dd MMM yyyy hh:mm a");

      return formattedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handler to update the state
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input field is 'customerMobileLastFour', restrict to 4 digits
    if (name === "customerMobileLastFour") {
      // Only allow digits and restrict length to 4
      const newValue = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const toggleEditMode = async (id) => {
    setEditMode(!editMode);

    try {
      const res = await axios.put(
        `https://project-rof.vercel.app/api/partners/update/${id}`,
        {
          ...FormData,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const emojis = ["😀", "😂", "😊", "😍", "🤔", "👍", "👎", "❤️", "🎉", "🔥"];

  const NoteInput = () => {
    const [note, setNote] = useState("");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isBullet, setIsBullet] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    const handleBold = () => setIsBold(!isBold);
    const handleItalic = () => setIsItalic(!isItalic);

    const handleBullet = () => {
      setIsBullet(!isBullet);
      if (!isBullet) {
        const newNote = note ? note + "\n• " : "• ";
        setNote(newNote);
        setTimeout(() => textareaRef.current.focus(), 0);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && isBullet) {
        e.preventDefault();
        setNote(note + "\n• ");
      }
    };

    const handleFileUpload = () => fileInputRef.current.click();

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("File selected:", file.name);
      }
    };

    const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

    const addEmoji = (emoji) => {
      setNote(note + emoji);
      setShowEmojiPicker(false);
    };
    console.log("datatime", FormData.updatedAt);
    return (
      <div className="w-[507px] h-[87px] border border-gray-300 rounded-lg p-4 flex flex-col justify-between relative">
        <div style={{ marginTop: "-8px" }} className="flex space-x-2">
          <button
            onClick={handleBold}
            className={`${isBold ? "text-blue-500" : "text-[#565558]"}`}>
            <Bold size={15} />
          </button>
          <button
            onClick={handleItalic}
            className={`${isItalic ? "text-blue-500" : "text-[#565558]"}`}>
            <Italic size={15} />
          </button>
          <AlignJustify size={15} className="text-gray-400" />
          <button
            onClick={handleBullet}
            className={`${isBullet ? "text-blue-500" : "text-[#565558]"}`}>
            <List size={15} />
          </button>
        </div>
        <div className="">
          <div className="flex justify-between">
            <textarea
              style={{
                padding: "4px",
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: "400",
                height: "30px",
              }}
              ref={textareaRef}
              cols="70"
              placeholder="Add Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={handleKeyDown}
              className={` bg-transparent outline-none text-[] placeholder-gray-400  resize-none${
                isBold ? "font-extrabold" : ""
              } ${isItalic ? "italic" : ""}`}
            />
            <button className="bg-gray-200  rounded-full p-1 flex">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button onClick={handleFileUpload} className="text-[#565558]">
              <Paperclip size={15} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button onClick={toggleEmojiPicker} className="text-[#565558]">
              <Smile size={15} />
            </button>
          </div>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-14 right-0 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl">
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-wrap ">
            <div className="ml-8 mt-8">
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
                <Link to="/SuperAdmin/Channel_Visitors">
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "24px",
                    }}
                    className="font-medium">
                    Channel Visitors
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
                  Channel ID
                </span>
              </h1>
            </div>
          </div>
          <div className="flex pr-[50px]" style={{ justifyContent: "end" }}>
            <button
              className="flex lg:px-8 lg:py-4 editbutton bg-[#3D2314] text-white rounded-full"
              key={FormData._id}
              onClick={() => toggleEditMode(FormData._id)}>
              <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                <FaRegEdit />
              </h4>
              <p className="text-[16px]">
                {editMode ? "Save" : "Edit Details"}
              </p>
            </button>
          </div>
          <main className="flex flex-wrap gap-5 lg:ml-8 mt-6 ">
            <div
              className="lg:w-[695px] lg:h-[792px] bg-[#FFFFFF] p-[24px] rounded-2xl shadow-lg shadow-[#632E04] mb-6 lg:mb-0 lg:mr-4"
              style={{ borderRadius: "24px" }}>
              <h2
                className="text-[20px] text-center font-[Manrope] mb-4"
                style={{ fontWeight: "700" }}>
                Customer and Channel Partner Detail
              </h2>
              <form>
                <div>
                  <div>
                    <div className="flex flex-wrap gap-[40px]">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Customer Name
                        </label>
                        <input
                          type="text"
                          pattern="[a-zA-Z]+"
                          class="form-control"
                          id="first_name"
                          name="customerName"
                          value={FormData.customerName}
                          className="lg:w-[393px] lg:h-[47px] border-[2px] border-[#3D2314] rounded-lg mt-1 text-[Manrope] p-2"
                          placeholder="Anand Jaiswal"
                          required
                          readOnly={!editMode}
                          onChange={handleChange}
                          style={{
                            fontFamily: "Manrope",
                            padding: "10px 18px",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Last 4 Digit
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="customerMobileLastFour"
                          value={FormData.customerMobileLastFour}
                          className="lg:w-[214px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                          maxLength="4"
                          placeholder="1 4 6 5"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          required
                          readOnly={!editMode}
                          onChange={handleChange}
                          style={{
                            textAlign: "center",
                            padding: "10px 18px",
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="lg:mt-1">
                      <label
                        htmlFor=" Channel Name"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Channel Name
                      </label>
                      <input
                        type="text"
                        id=" Channel Name"
                        name="channelPartnerCompanyName"
                        value={FormData.channelPartnerCompanyName}
                        className="lg:w-[393px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          fontFamily: "Manrope",
                          padding: "10px 18px",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        placeholder="Rainbow Overseas Pvt Ltd"
                        required
                        readOnly={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mt-1">
                    <div className="flex flex-wrap gap-[40px]">
                      <div>
                        <label
                          htmlFor="  Channel Partner Name"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Channel Partner Name
                        </label>
                        <input
                          type="text"
                          id="  Channel Partner Name"
                          name="channelPartnerName"
                          value={FormData.channelPartnerName}
                          className="lg:w-[393px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{
                            fontFamily: "Manrope",
                            padding: "10px 18px",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
                          placeholder="Sameer Chowdhary"
                          required
                          readOnly={true}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Channel Partner ID"
                          className="block text-[#000000] text-[16px] font-[Manrope]"
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Channel Partner ID
                        </label>
                        <input
                          readOnly={true}
                          type="text"
                          name="partnerId"
                          id="Channel Partner ID"
                          value={FormData.partnerId}
                          onChange={handleChange}
                          className="lg:w-[214px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{
                            fontFamily: "Manrope",
                            padding: "10px 18px",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
                          placeholder="CHROF0001"
                          required
                        />
                      </div>
                    </div>

                    <div className="lg:mt-1">
                      <label
                        htmlFor="Project "
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Project
                      </label>
                      <input
                        type="text"
                        id="Project"
                        name="projectName"
                        value={FormData.projectName}
                        onChange={handleChange}
                        className="lg:w-[393px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          fontFamily: "Manrope",
                          padding: "10px 18px",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        placeholder="Project A"
                        required
                        readOnly={true}
                      />
                    </div>

                    <div className="lg:mt-1">
                      <label
                        htmlFor="attendant"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Attendant
                      </label>
                      <input
                        type="text"
                        id="attendant"
                        name="attendantName"
                        value={FormData.attendantName}
                        onChange={handleChange}
                        className="lg:w-[393px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          fontFamily: "Manrope",
                          padding: "10px 18px",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        placeholder="Samyak Gandhi"
                        required
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="lg:flex lg:flex-wrap gap-[24px] lg:mt-1">
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Date
                      </label>
                      <input
                        type="text"
                        name="createdAt"
                        readOnly={true}
                        value={DateupdatedAt(FormData.createdAt)}
                        onChange={handleChange}
                        className="lg:w-[149px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          textAlign: "center",
                          padding: "10px 18px",
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Response Time
                      </label>
                      <input
                        type="text"
                        readOnly={true}
                        value={ResponseAt(FormData.createdAt)}
                        onChange={handleChange}
                        name="responseTime"
                        className="lg:w-[149px] lg:h-[47px] border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          textAlign: "center",
                          padding: "10px 18px",
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Meeting Duration
                      </label>
                      <input
                        type="text"
                        readOnly={true}
                        name="timeDuration"
                        value={FormData.timeDuration}
                        onChange={handleChange}
                        className="lg:w-[149px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          textAlign: "center",
                          padding: "10px 18px",
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="textarear-comp">
                    <div className="mt-1">
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Important Remarks
                      </label>
                      <textarea
                        className="lg:w-[641px] lg:h-[153px] border-[2px] border-[#3D2314] rounded-lg mt-1 "
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        name="notes"
                        onChange={handleChange}
                        readOnly={!editMode}>
                        {FormData.notes}
                      </textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:w-[555px] lg:h-[233px] bg-[#FFFFFF] p-[8px] rounded-2xl shadow-lg shadow-[#632E04]">
              <div className="mt-4">
                <h2
                  className="text-center mb-4 text-[#000000] text-[20px] font-[Manrope]"
                  style={{ fontWeight: "700" }}>
                  Channel Partner Activity Log
                </h2>
              </div>
              <div className="w-full h-[123px] overflow-x-auto">
                <div className="w-full h-[123px] overflow-y-auto">
                  <table className="w-full text-leftm">
                    <thead className="">
                      <tr className="text-[#FFFFFF]">
                        <th
                          className="border-b p-2 bg-[#3D2314]"
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            width: "75px",
                          }}>
                          Serial No
                        </th>
                        <th
                          className="border-b p-2 bg-[#3D2314]"
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            width: "109px",
                          }}>
                          Date
                        </th>
                        <th
                          className="border-b p-2 bg-[#3D2314]"
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            width: "96px",
                          }}>
                          Timing
                        </th>
                        <th
                          className="border-b p-2 bg-[#3D2314]"
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            width: "92px",
                          }}>
                          Project
                        </th>
                        <th
                          className="border-b p-2 bg-[#3D2314]"
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            width: "135px",
                          }}>
                          Channel Partner
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="border-b p-2 text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}>
                      {data.length > 0
                        ? data.map((item, index) => (
                            <tr key={item.id}>
                              <td className="border-b p-2">{index + 1}</td>
                              <td className="border-b p-2">
                                {DateupdatedAt(item.createdAt)}
                              </td>
                              <td className="border-b p-2">
                                {ResponseAt(item.createdAt)}
                              </td>
                              <td className="border-b p-2">
                                {item.projectName}
                              </td>
                              <td className="border-b p-2">
                                {item.customerName}
                              </td>
                            </tr>
                          ))
                        : "No Data Found..."}
                    </tbody>
                  </table>
                </div>
              </div>
              <br /> <br />
              <div
                className="mt-4 w-[555px] lg:h-[529px] bg-[#FFFFFF] p-[24px] rounded-2xl"
                style={{
                  borderRadius: "24px",
                  boxShadow: "0px 0px 6.7px 0px #632E04",
                }}>
                <h2
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "20px",
                    fontWeight: "700",
                    borderBottom: "1px solid black",
                  }}
                  className="mb-4 text-center">
                  Notes Activity Log
                </h2>
                <div className="space-y-4">
                  {FormData.notes && FormData.notes.length > 0 ? (
                    <div className="bg-[#E9E9E9] p-3 rounded w-[507px] h-[113px]">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-[20px] h-[20px] bg-gray-500 rounded-full"></div>
                        <span
                          style={{
                            fontFamily: "Manrope",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}>
                          Sales Executive
                        </span>
                      </div>
                      {FormData.notes}

                      <div
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "8px",
                          fontWeight: "600",
                        }}
                        className=" text-right mt-2 text-[#4A4A4A]">
                        {ResponseAtData(FormData.updatedAt)}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <div className="bg-[#E9E9E9] w-[507px] h-[97px] p-3 rounded">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-[20px] h-[20px] bg-gray-500 rounded-full"></div>
                <span style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"500"}}>Manager</span>
              </div>
              <ul style={{marginTop:"-4px"}} className="list-disc pl-5 text-sm ">
                <li style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"600",lineHeight:"16.39px" }}>Great notes! I'd like to follow up with Clients [Contact Name] to discuss the Pricing program in more detail. Can you schedule a meeting with them?</li>
               
                
              </ul>
              <div style={{fontFamily:"Manrope" , fontSize:"8px" , fontWeight:"600"}} className=" text-right mt-2 text-[#4A4A4A]">25/07/2024, 02:00 PM</div>
            </div>
            
            <div className="bg-[#E9E9E9] w-[507px] h-[97px] p-3 rounded">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-[20px] h-[20px] bg-gray-500 rounded-full"></div>
                <span style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"500"}}>Super Admin</span>
              </div>
              <ul style={{marginTop:"-4px"}} className="list-disc pl-5 text-sm ">
                <li style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"600",lineHeight:"16.39px" }}>Great notes! I'd like to follow up with Clients [Contact Name] to discuss the Pricing program in more detail. Can you schedule a meeting with them?</li>
               
                
              </ul>
              <div style={{fontFamily:"Manrope" , fontSize:"8px" , fontWeight:"600"}} className=" text-right mt-2 text-[#4A4A4A]">25/07/2024, 02:00 PM</div>
            </div> */}
                </div>
                <div className="mt-4 ">
                  <NoteInput />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default EditForm1;
