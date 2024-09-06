import SettingPages from "./SettingPages";
import { IoIosArrowForward } from "react-icons/io";

const Setting = () => {
  return (
    <div className="lg:flex lg:flex-col lg:gap-9">
      {/* Header Section */}
      <div
        className="pl-6 lg:pl-12 pt-6 lg:pt-10 flex items-center gap-1 bg-custom-bg font-[Manrope]"
      >
        <h1
          className="flex items-center gap-2 font-bold text-lg lg:text-2xl"
        >
          Home
          <IoIosArrowForward className="text-[#1C1B1F]" />
          <span className="font-medium text-lg lg:text-2xl">Settings</span>
        </h1>
      </div>

      {/* Main Content Section */}
      <div
        className="w-[90%]  p-6 lg:p-8 bg-white m-6 lg:m-8 overflow-x-auto overflow-y-auto hide-scrollbar h-auto"
        style={{ borderRadius: "8px" }}
      >
        <SettingPages />
      </div>
    </div>
  );
};

export default Setting;
