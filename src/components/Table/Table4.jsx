import React from "react";
import one from "../../assets/one.png";
import two from "../../assets/two.png";
import three from "../../assets/three.png";
import four from "../../assets/four.png";
import five from "../../assets/five.png";
import six from "../../assets/six.png";
import seven from "../../assets/seven.png";
import eight from "../../assets/eight.png";
import nine from "../../assets/nine.png";
import ten from "../../assets/ten.png";
import eleven from "../../assets/eleven.png";
import twelve from "../../assets/twelve.png";
import { IoIosArrowForward } from "react-icons/io";

const projects = [
  { name: "ROF Aalayas", image: one },
  { name: "ROF Amaltaas", image: two },
  { name: "ROF Insignia", image: three },
  { name: "ROF Aalayas 2", image: four },
  { name: "ROF Icity", image: five },
  { name: "ROF Atulyas", image: six },
  { name: "ROF Insignia Souk", image: seven },
  { name: "ROF Portico", image: eight },
  { name: "ROF Normanton Park", image: nine },
  { name: "ROF Ambliss", image: ten },
  { name: "ROF Aalayas 2", image: eleven },
  { name: "ROF Portico", image: twelve },
];

const Table4 = () => {
  return (
    <>
      <div className="flex h-screen  bg-[#F7F3E8]  ">
        <main className="flex-1 overflow-y-auto ">
          {/* Project content */}
          <div className="p-6">
            <div className="ml-0 ">
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
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "24px",
                  }}
                  className="font-medium"
                >
                  Projects
                </span>
              </h1>
            </div>

            <div
              className="flex flex-col md:flex-row  mb-6 flex items-center justify-center ml-80"
            >
              <div className="relative mb-4 md:mb-0 md:w-[619px] h-[48px] mt-4 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-[#3D2314] focus:outline-none focus:ring-2 focus:ring-brown-500 h-[48px] "
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
              <button className="bg-[#3D2314] text-white px-4 py-2 rounded-full flex items-center justify-center h-[48px] w-[206px] mr-[450px] ml-10 mt-4">
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
                Add new Project
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-[408px] h-[178px] object-cover"
                  />
                  <div className="p-4 flex justify-between items-center">
                    <h3
                      className="font-[16px]"
                      style={{ fontWeight: 500, fontFamily: "Manrope" }}
                    >
                      {project.name}
                    </h3>
                    <button className="text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Table4;
