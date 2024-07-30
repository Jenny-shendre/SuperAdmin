import { Outlet } from "react-router-dom";
import SideNav from "../SalesExecutive/SideNav/SideNav";
import TopNav from "../SalesExecutive/TopNav/TopNav";

const SalesExecutiveScreen = () =>{
    return(
       
        <div className="flex flex-row bg-[#F7F3E8]" style={{position:'fixed', width:'100%'}}>
      <div className="w-auto h-screen ">
        <SideNav />
      </div>
      <div className="w-full">
        <TopNav />
        <Outlet />
      </div>
    </div> 
        
    );
}


export default SalesExecutiveScreen;