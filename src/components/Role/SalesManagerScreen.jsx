import { Outlet } from "react-router-dom";
import SideNavM from "../SalesManager/SideNavM/SideNavM";
import TopNavM from "../SalesManager/TopNavM/TopNavM";

const SalesManagerScreen = () =>{
    return(
       
        <div className="flex flex-row bg-[#F7F3E8]" style={{position:'fixed', width:'100%'}}>
        <div className="w-auto h-screen ">
          <SideNavM />
        </div>
        <div className="w-full">
          <TopNavM />
          <Outlet />
        </div>
      </div>
        
    );
}


export default SalesManagerScreen;