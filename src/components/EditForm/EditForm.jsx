import React, { useEffect, useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { format } from "date-fns";
import "../Home.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loding from "../Loding/Loding";
import {
  ChevronRight,
  Bold,
  Italic,
  AlignJustify,
  List,
  Paperclip,
  Smile,
} from "lucide-react";

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
    updatedAt: "",
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
        `${import.meta.env.VITE_BACKEND}/api/customers/fetch/${id}`
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
  const ResponseAt2 = (DateupdatedAt) => {
    if (!DateupdatedAt) return "Invalid Date";
    try {
      const formattedDate = format(
        new Date(DateupdatedAt),
        "dd MMM yyyy hh:mm a"
      );
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
        `${import.meta.env.VITE_BACKEND}/api/customers/update/${id}`,
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

    return (
      <div
        className="w-[507px] h-[87px] border border-gray-300 rounded-lg p-4 flex flex-col relative"
        style={{ alignSelf: "self-end" }}>
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
                <Link to="/SuperAdmin">
                  <span>Home</span>
                </Link>
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
                {FormData?.customerId || "Not Found"}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex mr-[50px]" style={{ justifyContent: "end" }}>
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
          <main
            className="flex flex-wrap gap-5 lg:ml-8"
            style={{
              height: "360px",
              overflowY: "scroll",
              padding: "10px 10px 10px 10px",
            }}>
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
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Customer Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
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
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Mobile No
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
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
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Email ID
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
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
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Project
                        </label>
                        <input
                          type="text"
                          id="Project A"
                          className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
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
                          style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                          Customer ID
                        </label>
                        <input
                          type="text"
                          id="Customer ID"
                          className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            fontSize: "20px",
                            lineHeight: "27.32px",
                            padding: "10px 18px 10px 18px",
                          }}
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
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Attendant
                      </label>
                      <input
                        type="text"
                        id="attendant"
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        placeholder="Samyak Gandhi"
                        required
                        name="attendantName"
                        value={FormData.attendantName}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="lg:flex lg:flex-wrap items-center justify-center gap-[24px] lg:mt-1">
                    <div className="flex-1">
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Date
                      </label>
                      <input
                        type="text"
                        className="lg:w-full lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          textAlign: "center",
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        name="createdAt"
                        value={DateupdatedAt(FormData.createdAt)}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Response Time
                      </label>
                      <input
                        type="text"
                        className="lg:w-full lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          textAlign: "center",
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        name="responseTime"
                        value={FormData.timeResponse}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Meeting Duration
                      </label>
                      <input
                        type="text"
                        className="lg:w-full lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          textAlign: "center",
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
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
                        style={{ fontWeight: "500", fontFamily: "Manrope" }}>
                        Important Remarks
                      </label>
                      <textarea
                        className="lg:w-full lg:h-[153px] border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "27.32px",
                          padding: "10px 18px 10px 18px",
                        }}
                        readOnly={!editMode}>
                        {/* {FormData.notes} */}
                      </textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="">
              <div
                style={{
                  boxShadow: " 0px 0px 6.7px 0px #632E04",
                }}
                className="lg:w-[555px] lg:h-[233px] bg-[#FFFFFF] p-[8px] rounded-2xl ">
                <div className="mt-4">
                  <h2
                    className="text-center mb-4 text-[#000000] text-[20px] font-[Manrope]"
                    style={{ fontWeight: "700" }}>
                    Customer Activity Log
                  </h2>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="w-full h-[123px] overflow-y-auto">
                    <table className="w-full h-[123px] text-leftm">
                      <thead className="">
                        <tr className="text-[#FFFFFF]">
                          <th
                            className="border-b p-2 bg-[#3D2314] "
                            style={{ fontSize: "14px", fontWeight: "400" }}>
                            Serial No
                          </th>
                          <th
                            className="border-b p-2 bg-[#3D2314]"
                            style={{ fontSize: "14px", fontWeight: "400" }}>
                            Date
                          </th>
                          <th
                            className="border-b p-2 bg-[#3D2314]"
                            style={{ fontSize: "14px", fontWeight: "400" }}>
                            Timing
                          </th>
                          <th
                            className="border-b p-2 bg-[#3D2314]"
                            style={{ fontSize: "14px", fontWeight: "400" }}>
                            Project
                          </th>
                          <th
                            className="border-b p-2 bg-[#3D2314]"
                            style={{ fontSize: "14px", fontWeight: "400" }}>
                            Attendant
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className="border-b p-2 text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500" }}>
                        {FormData && FormData.log && FormData.log.length > 0
                          ? FormData.log.map((item, index) => (
                              <tr key={item.id}>
                                <td className="border-b p-2 justify-center item-center">
                                  {index + 1}
                                </td>
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
                                  {item.attendantName}
                                </td>
                              </tr>
                            ))
                          : "No Data Found..."}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <br />
              <br />
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
                <div style={{ height: "300px", overflowY: "auto" }}>
                  <div className="space-y-4">
                    {FormData.notes && FormData.notes.length > 0 ? (
                      <div className="bg-[#E9E9E9] p-3 rounded w-[100%] mx-auto h-[113px]">
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
                          {ResponseAt2(FormData.updatedAt)}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <NoteInput />
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
