import React, { useState, useEffect, useRef } from "react";
import one from "../../assets/one.png";
import { IoIosArrowForward } from "react-icons/io";
import projectUploadIcon from "../../assets/project-upload.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loding/Loding";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";

// const projects = [
//   { name: "ROF Aalayas", image: one },
//   { name: "ROF Amaltaas", image: two },
//   { name: "ROF Insignia", image: three },
//   { name: "ROF Aalayas 2", image: four },
//   { name: "ROF Icity", image: five },
//   { name: "ROF Atulyas", image: six },
//   { name: "ROF Insignia Souk", image: seven },
//   { name: "ROF Portico", image: eight },
//   { name: "ROF Normanton Park", image: nine },
//   { name: "ROF Ambliss", image: ten },
//   { name: "ROF Aalayas 2", image: eleven },
//   { name: "ROF Portico", image: twelve },
// ];

const Table4 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [validationError, setValidationError] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [valueinput, setvalueinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    location: "",
    description: "",
    projectImage: "",
  });

  //b
  const [deleteId, setDeleteId] = useState(null);

  const popupRef = useRef();
  const fileInputRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setUploadedImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target.result;

        // Update both states
        setUploadedImage(imageBase64); // If needed elsewhere in your app
        setProjectDetails((prevState) => ({
          ...prevState,
          projectImage: imageBase64, // Save the image as a base64 string in projectDetails
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async () => {
    if (!projectName) {
      setValidationError("Peoject name  are required.");
      return;
    }

    if (!projectLocation) {
      setValidationError("Peoject location  are required.");
      return;
    }

    const newProject = {
      name: projectName,
      location: projectLocation,
      projectImage: uploadedImage,
      description: projectDescription,
    };

    try {
      const sendData = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/projects`,
        newProject
      );
      console.log("Project added successfully", sendData);
      setProjectData((prevData) => [...prevData, sendData.data]);

      // Reset form and close popup
      setUploadedImage(null);
      setProjectName("");
      setProjectLocation("");
      setProjectDescription("");
      setShowPopup(false);
      setValidationError("");
    } catch (error) {
      console.log("Error adding project:", error);
    }

    // console.log("Project added:", newProject);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/projects`
      );
      console.log("res", res.data);
      setProjectData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("projectData", projectData);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // //b
  // Delete and Edit logic
  const handleDelete = async (deleteId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/projects/delete/${deleteId}`
      );
      console.log("Project deleted", res);

      setProjectData((prevData) =>
        prevData.filter((project) => project._id !== deleteId)
      );

      setShowPopup(false); // Close the popup after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  // const handleEdit = (projectId) => {
  //   // Logic to edit the project
  //   console.log("Project edited with ID:", projectId);
  // };
  const handleEdit = (projectId) => {
    // Logic to edit the project
    // console.log("Project edited with ID:", projectId);
  };

  // const deletedAt = () => {
  //   if (deleteId) {
  //     // Remove the project from the projectData state
  //     setProjectData((prevData) => prevData.filter(project => project.id !== deleteId));
  //     // Reset deleteId and close popup
  //     setDeleteId(null);
  //     setShowPopup(false);
  //   }
  // };
  const handleClosePopup = () => {
    setShowPopup(false);
    setDeleteId(null); // Clear the deleteId when the popup is closed
  };

  const handleChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    if (editId) {
      try {
        const resposne = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/projects/project/${editId}`
        );
        setProjectDetails(resposne.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [editId]);

  const handleUpdateProject = async () => {
    setValidationError("");

    try {
      const updateProject = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/projects/update/${editId}`,
        projectDetails,
        {
          headers: {
            "Content-Type": "application/json", // Assuming your backend expects JSON
          },
        }
      );

      console.log("Updated successfully", updateProject);

      setProjectData((prevData) =>
        prevData.map((project) =>
          project._id === editId ? updateProject.data : project
        )
      );

      setShowPopup2(false);
    } catch (error) {
      console.error("Error updating project details:", error);
      setValidationError("Failed to update project. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen bg-[#F7F3E8]">
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="ml-0">
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
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "24px",
                    }}
                    className="font-medium">
                    Projects
                  </span>
                </h1>
              </div>

              <div className="flex flex-col md:flex-row mb-6 items-center justify-center gap-[24px]">
                <div className="relative mb-4 md:mb-0 md:w-[619px] h-[48px] mt-4 ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-full h-[48px]"
                    style={{
                      padding: "12px 24px 12px 60px",
                      border: "1px solid #3D2314",
                    }}
                    value={valueinput}
                    onChange={(e) => setvalueinput(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-6 top-3.5 text-[#3D2314]"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-[#3D2314] text-white  rounded-full flex items-center justify-center h-[48px] w-[206px] mt-[11px]"
                    style={{ padding: "12px 24px 12px 24px", gap: "10px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add new Project
                  </button>
                </div>
              </div>

              <div className="cardT  pr-[12px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projectData
                  .filter(({ name }) =>
                    name.toLowerCase().includes(valueinput.toLowerCase())
                  )
                  .map((project, index) => (
                    <div
                      key={index}
                      className="bg-white pb-[12px] rounded-lg overflow-hidden shadow w-[297px]">
                      <Link to={`/SuperAdmin/project/${project.name}`}>
                        <img
                          src={project?.projectImage ?? one}
                          alt={project.name}
                          className="w-[408px] h-[178px] object-cover"
                        />
                      </Link>

                      <div className=" w-[288px] h-[24px] flex justify-between items-center">
                        <h3
                          className="font-[16px]"
                          style={{
                            fontWeight: 500,
                            fontFamily: "Manrope",
                            paddingLeft: "12px",
                            paddingTop: "12px",
                            gap: "16px",
                          }}>
                          {project.name}
                        </h3>
                        <button className="text-gray-500 flex gap-3 mt-3">
                          <BiSolidEditAlt
                            // onClick={() => setShowPopup2(true)}
                            onClick={() => {
                              setShowPopup2(true);
                              setEditId(project._id);
                            }}
                            style={{
                              cursor: "pointer",
                              color: "#000000",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <RiDeleteBin6Line
                            //  onClick={() => handleDelete(project.id)}
                            onClick={() => {
                              setShowPopup(true);
                              setDeleteId(project._id);
                            }}
                            style={{
                              cursor: "pointer",
                              color: "#930000",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </main>
          {/* //b */}
          {showPopup && deleteId !== null && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="Delete-popup w-[257px] h-[192px] py-[12px] px-[24px] rounded-md bg-white shadow-md z-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-manrope text-[20px] font-medium">
                    Are you sure you want to delete this Project?
                  </p>
                  <p className="font-manrope text-[12px] font-medium text-[#6A6A6A] mt-2">
                    This action cannot be undone.
                  </p>
                  <div className="delete-cont ml-1 flex justify-center items-center w-[197px] h-[33px] gap-6 mt-4">
                    <button
                      className="w-[85px] h-[33px] p-2.5 bg-[#FFD9D9] rounded-md text-[#C71212] flex items-center justify-center"
                      // onClick={deletedAt}
                      onClick={() => handleDelete(deleteId)} // Delete the project
                    >
                      Delete
                    </button>
                    <button
                      className="w-[85px] h-[33px] p-2.5 rounded-md border border-black flex items-center justify-center"
                      // onClick={() => setShowPopup(false)}
                      onClick={handleClosePopup} // Close the popup
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
          {/* //b */}

          {showPopup && deleteId === null && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div
                ref={popupRef}
                className="popup-container w-[581px] h-fit p-6 gap-6 rounded-lg bg-white flex flex-col items-center z-50">
                <div
                  className="upload-box description w-[323px] h-[189px] border-dotted border-[5px] flex flex-col items-center justify-center gap-3 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}>
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
                      <p
                        style={{
                          fontWeight: "400",
                          fontFamily: "Manrope",
                          fontSize: "16px",
                        }}>
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
                  className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <input
                  type="text"
                  className="project-name-input w-[533px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg"
                  placeholder="Location"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                />
                <textarea
                  className="project-address-input w-[533px] min-h-[134px] p-4 rounded-md border border-gray-300"
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#000000",
                  }}
                  placeholder="Project Description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
                <button
                  className="add-project-button w-[170px] h-12 p-2 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                  onClick={handleAddProject}>
                  Add new Project
                </button>
                {validationError && (
                  <p className="text-red-500 mt-2">{validationError}</p>
                )}
              </div>
            </div>
          )}

          {showPopup2 && deleteId === null && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div
                ref={popupRef}
                className="popup-container w-[581px] h-fit p-6 gap-6 rounded-lg bg-white flex flex-col items-center z-50">
                <button
                  className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[572px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                  onClick={() => setShowPopup2(false)}>
                  X
                </button>
                <div
                  className="upload-box description flex w-[323px] h-[189px] border-dotted border-[5px] flex flex-col items-center justify-end gap-3 pb-2 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}>
                  {projectDetails.projectImage ? (
                    <img
                      name="projectImage"
                      src={projectDetails.projectImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      {/* <img
                        src={projectUploadIcon}
                        alt="Upload"
                        className="w-12 h-12"
                      /> */}
                      <p
                        style={{
                          fontWeight: "400",
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          background: "#3D2314",
                          color: "white",
                          padding: "10px",
                          borderRadius: "7px",
                        }}>
                        Change Image
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

                <div className="flex rounded-md border border-gray-300 text-center p-2 w-[533px] h-12 justify-between">
                  <input
                    type="text"
                    className="project-name-input w-full  font-manrope text-lg "
                    placeholder="Project Name"
                    name="name"
                    value={projectDetails.name}
                    onChange={handleChange}
                  />
                  <div style={{ alignContent: "center" }}>
                    <BiSolidEditAlt
                      onClick={() => setShowPopup2(true)}
                      style={{
                        cursor: "pointer",
                        color: "#000000",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </div>
                </div>

                <div className="flex rounded-md border border-gray-300 text-center p-2 w-[533px] h-12 justify-between">
                  <input
                    type="text"
                    className="project-name-input w-full  font-manrope text-lg "
                    name="location"
                    placeholder="Location"
                    value={projectDetails.location}
                    onChange={handleChange}
                  />
                  <div style={{ alignContent: "center" }}>
                    <BiSolidEditAlt
                      onClick={() => setShowPopup2(true)}
                      style={{
                        cursor: "pointer",
                        color: "#000000",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex rounded-md border border-gray-300 text-center p-4 w-[533px]  min-h-[134px] justify-between">
                  <textarea
                    className="project-address-input w-full"
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: "400",
                      fontSize: "16px",
                      color: "#000000",
                    }}
                    placeholder="Project Description"
                    name="description"
                    value={projectDetails.description}
                    onChange={handleChange}
                  />
                  <div>
                    <BiSolidEditAlt
                      onClick={() => setShowPopup2(true)}
                      style={{
                        cursor: "pointer",
                        color: "#000000",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </div>
                </div>
                <button
                  className="add-project-button w-[170px] h-12 p-2 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                  onClick={handleUpdateProject}>
                  Submit
                </button>
                {validationError && (
                  <p className="text-red-500 mt-2">{validationError}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Table4;
