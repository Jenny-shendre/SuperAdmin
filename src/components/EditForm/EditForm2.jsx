import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

function EditForm2() {
  return (
    <>
      <div>
        <div className="flex flex-wrap ">
          <div className="ml-8 mt-8">
            <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              {/* <Link to="/Direct_Visitors"> */}
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Channel Partners
              </span>
              {/* </Link> */}
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Rainbow Overseas
              </span>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Edit
              </span>
            </h1>
          </div>
          <div className="lg:ml-[1000px] mt-9">
            <button className="flex lg:px-8 lg:py-4 editbutton bg-[#3D2314] lg:relative lg:top-0 text-white rounded-full">
              <h4 className="w-[17px] h-[17px] lg:mt-1 lg:relative lg:right-2 gap-2">
                <FaRegEdit />
              </h4>
              <p className="text-[16px]">Edit Details</p>
            </button>
          </div>
        </div>
        <main className="flex flex-wrap gap-5 lg:ml-8 lg:mt-10 ">
          <div
            className="lg:w-[695px] lg:h-[792px] bg-[#FFFFFF] p-[24px] rounded-2xl shadow-lg shadow-[#632E04] mb-6 lg:mb-0 lg:mr-4"
            style={{ borderRadius: "24px" }}
          >
            <h2
              className="text-[20px] text-center font-[Manrope] mb-4"
              style={{ fontWeight: "700" }}
            >
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
                        style={{ fontWeight: "500" }}
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="lg:w-[393px] lg:h-[47px] p-1 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Anand Jaiswal"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Last 4 Digit
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="1 4 6 5"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                      />
                    </div>
                  </div>
                  <div className="lg:mt-1">
                    <label
                      htmlFor=" Channel Name"
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                    >
                      Channel Name
                    </label>
                    <input
                      type="text"
                      id=" Channel Name"
                      className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      placeholder="Rainbow Overseas Pvt Ltd"
                      required
                    />
                  </div>
                </div>

                <div className="mt-1">
                  <div className="flex flex-wrap gap-[40px]">
                    <div>
                      <label
                        htmlFor="  Channel Partner Name"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Channel Partner Name
                      </label>
                      <input
                        type="text"
                        id="  Channel Partner Name"
                        className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="Sameer Chowdhary"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Channel Partner ID"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                      >
                        Channel Partner ID
                      </label>
                      <input
                        readOnly
                        type="text"
                        id="Channel Partner ID"
                        className="lg:w-[214px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        placeholder="CHROF0001"
                        required
                      />
                    </div>
                  </div>

                  <div className="lg:mt-1">
                    <label
                      htmlFor="Project "
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Project
                    </label>
                    <input
                      type="text"
                      id="Project "
                      className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      placeholder="Project A"
                      required
                    />
                  </div>

                  <div className="lg:mt-1">
                    <label
                      htmlFor="attendant"
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Attendant
                    </label>
                    <input
                      type="text"
                      id="attendant"
                      className="lg:w-[393px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                      placeholder="Samyak Gandhi"
                      required
                    />
                  </div>
                </div>

                <div className="lg:flex lg:flex-wrap gap-[24px] lg:mt-1">
                  <div>
                    <label
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Response Time
                    </label>
                    <input
                      type="time"
                      className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Meeting Duration
                    </label>
                    <input
                      type="time"
                      className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                    />
                  </div>
                </div>

                <div className="textarear-comp">
                  <div className="mt-1">
                    <label
                      className="block text-[#000000] text-[16px] font-[Manrope]"
                      style={{ fontWeight: "500" }}
                    >
                      Executive Notes
                    </label>
                    <textarea className="lg:w-[641px] lg:h-[173px] border-[2px] border-[#3D2314] rounded-lg mt-1"></textarea>
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
