import React, { useState, useRef } from 'react';
import { ChevronRight, Bold, Italic, AlignJustify, List, Paperclip, Smile } from 'lucide-react';
import { IoIosArrowForward } from "react-icons/io";

const emojis = ["😀", "😂", "😊", "😍", "🤔", "👍", "👎", "❤", "🎉", "🔥"];

const overviewID = () => {
  const [note, setNote] = useState('');
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
      const newNote = note ? note + '\n• ' : '• ';
      setNote(newNote);
      setTimeout(() => textareaRef.current.focus(), 0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isBullet) {
      e.preventDefault();
      setNote(note + '\n• ');
    }
  };

  const handleFileUpload = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  const addEmoji = (emoji) => {
    setNote(note + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-[507px] h-[87px] border border-gray-300 rounded-lg p-4 flex flex-col justify-between relative">
       <div style={{marginTop:"-8px"}} className="flex space-x-2">
          <button onClick={handleBold} className={`${isBold ? 'text-blue-500' : 'text-[#565558]'}`}>
            <Bold size={15} />
          </button>
          <button onClick={handleItalic} className={`${isItalic ? 'text-blue-500' : 'text-[#565558]'}`}>
            <Italic size={15} />
          </button>
          <AlignJustify size={15} className="text-gray-400" />
          <button onClick={handleBullet} className={`${isBullet ? 'text-blue-500' : 'text-[#565558]'}`}>
            <List size={15} />
          </button>
        </div>
      <div className="flex items-center mb-2">
        
        <div>
        <textarea
        style={{fontFamily:"Manrope",fontSize:"14px",fontWeight:"400"}}
          ref={textareaRef}
          placeholder="Add Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`mt-2  w-full bg-transparent outline-none text-[] placeholder-gray-400 resize-none ${
            isBold ? 'font-bold' : ''
          } ${isItalic ? 'italic' : ''}`}
          rows={3}
        />
</div>
<div className=' mb-8'>
<button className="bg-gray-200 ml-[360px] rounded-full p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

</div>

      </div>
      <div style={{marginTop:"-42px"}} className="flex justify-between items-center">
        
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
            {mojis.map((emoji, index) => (
              <button key={index} onClick={() => addEmoji(emoji)} className="text-2xl">
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ClientOverview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-4 flex items-center text-sm text-gray-600">
      <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}>
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium">
                Overview
              </span>
            </h1>


      </div>
      
      <div className="flex space-x-4">
        {/* FIRST CONTAINER */}
        <div
              className="lg:w-[689px] lg:h-[630px] bg-[#FFFFFF] p-[24px] rounded-2xl mb-6 lg:mb-0 lg:mr-4"
              style={{
                borderRadius: "24px",
                boxShadow: "0px 0px 6.7px 0px #632E04",
              }}>
              <h2
                className="text-[20px] text-center font-[Manrope] mb-4"
                style={{ fontWeight: "700" }}>
                Client Details
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
                          placeholder="Anand Jaiswal"
                          required
                          name="name"
                          
                        
                        />
                      </div>
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
                          className="lg:w-[193px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                          style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                          placeholder="ROF Aalayas"
                          name="projectName"
                         
                        />
                      </div>
                    </div>
                   
                  </div>

                  <div className="mt-1">
                    <div className="flex flex-wrap gap-[40px]">
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
                          placeholder="ROF001"
                          required
                          name="customerId"
                          
                        />
                      </div>
                      <div className="">
                      <label
                        htmlFor="email"
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Email ID
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="lg:w-[380px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        placeholder="Anandjaiswal@gmail.com"
                        required
                        name="email"
                        
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
                         placeholder="26/07/2024"
                        name="createdAt"
                       
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#000000] text-[16px] font-[Manrope]"
                        style={{ fontWeight: "500", fontFamily:'Manrope' }}>
                        Meeting Status
                      </label>
                      <input
                        type="text"
                        className="lg:w-[149px] lg:h-[47px] p-2 border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{textAlign:'center' ,fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        placeholder='Completed'
                        name="responseTime"
                      
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
                        placeholder='59 Minutes'
                        name="timeDuration"
                        
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
                        className="lg:w-[647px] lg:h-[173px] border-[2px] border-[#3D2314] rounded-lg mt-1"
                        style={{fontFamily:'Manrope' , fontWeight:'600', fontSize:'20px', lineHeight:'27.32px',padding:'10px 18px 10px 18px' }}
                        >
                        
                      </textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        
        {/* SECOND CONTAINER */}
        <div className="w-[555px] lg:h-[529px] bg-[#FFFFFF] p-[24px] rounded-2xl" style={{
          borderRadius: "24px",
          boxShadow: "0px 0px 6.7px 0px #632E04",
        }}>
          <h2 style={{fontFamily:"Manrope" , fontSize:"20px" , fontWeight:"700"}} className="mb-4 text-center">Notes Activity Log</h2>
          <div className="space-y-4">
            <div className="bg-[#E9E9E9] p-3 rounded w-[507px] h-[113px]">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-[20px] h-[20px] bg-gray-500 rounded-full"></div>
                <span style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"500"}} >Sales Executive</span>
              </div>
              <ul style={{marginTop:"-4px"}} className="list-disc pl-5 text-sm ">
                <li style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"600",lineHeight:"16.39px" }}>Discussed potential scenario of the places and modifications.</li>
                <li style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"600",lineHeight:"16.39px"}}>Client expressed interest in a Hybrid program of the terrace effectiveness.</li>
                <li style={{fontFamily:"Manrope" , fontSize:"12px" , fontWeight:"600",lineHeight:"16.39px"}}>Next steps: Schedule a follow-up meeting to discuss pricing and contract terms.</li>
              </ul>
              <div style={{fontFamily:"Manrope" , fontSize:"8px" , fontWeight:"600"}} className=" text-right mt-2 text-[#4A4A4A]">24/07/2024, 05:00 PM</div>
            </div>
            <div className="bg-[#E9E9E9] w-[507px] h-[97px] p-3 rounded">
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
            </div>

          </div>
          <div className="mt-4 ">
            <NoteInput  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default overviewID;