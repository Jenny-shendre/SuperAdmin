import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function EditForm2() {
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  console.log("location", id);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/partners/fetch/${id}`
      );
      setFormData(res.data);
      console.log("res.data", res.data);

      const res1 = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/partners/fetchByName`,
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
        `${import.meta.env.VITE_BACKEND}/api/partners/update/${id}`,
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
      <div>
        <div className="flex flex-wrap">
          <div className="ml-8 mt-8">
            <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
              <Link to="/SuperAdmin">Home</Link>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <Link
                to="/SuperAdmin/Channel_Partners"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                Channel Partners
              </Link>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <div
                            
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                 {FormData?.channelPartnerCompanyName || "Not found"}
              </div>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                Edit
              </span>
            </h1>
          </div>
        </div>

        <div className="flex pr-[50px]" style={{ justifyContent: "end" }}>
          <button
            className="flex lg:px-8 lg:py-4 bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full"
            onClick={() => toggleEditMode(FormData._id)}>
            <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
              <FaRegEdit />
            </h4>
            <p className="text-[16px]">{editMode ? "Save" : "Edit Details"}</p>
          </button>
        </div>
        <main className="flex flex-wrap gap-5 pl-[50px] " style={{height:'360px', overflowY:'scroll'}}>
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
                      className="lg:w-[160px] lg:h-[47px]  border-[2px] border-[#3D2314] rounded-lg mt-1"
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
                      value={FormData.timeResponse}
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
        </main>
      </div>
    </>
  );
}

export default EditForm2;
