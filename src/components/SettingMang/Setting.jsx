
import SettingPages from "./SettingPages";
import { IoIosArrowForward } from "react-icons/io";

const Setting = () => {
    return (
       
        <div >
            <div
          style={{ gap: "20px", paddingTop: "30px", fontFamily: 'Manrope' }}
          className="pl-[24px] overflow-x-auto flex flex-col gap-9 bg-custom-bg;
        "
        >
          <h1
            className="font-bold flex items-center gap-1 font-[Manrope]"
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
              className="font-medium font-[Manrope]"
            >
             Settings
            </span>
          </h1>
        </div>
        <div className="w-[960px] h-[819px] p-[24px] overflow-x-auto overflow-y-scroll hide-scrollbar h-screen bg-white m-[24px]"style={{borderRadius:'8px'}}>
            
           <SettingPages/>
            
            
            
             </div>
             </div>
    );
}
export default Setting;