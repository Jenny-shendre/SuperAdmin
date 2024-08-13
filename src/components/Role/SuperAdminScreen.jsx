import { Outlet } from "react-router-dom"
import Navber from "../Navber/Navber"
import TopNavber from "../TopNavber/TopNavber"
import OverViewAdmin from "../Overview/OverViewAdmin";

const SuperAdminScreen = () =>{
    return(
       
              <div className="flex flex-row bg-[#F7F3E8]" style={{ position: 'fixed', width: '100%' }}>
      <div className="w-auto h-screen ">
        <Navber />
      </div>
      <div className="w-full">
        <TopNavber />
        <Outlet />
       
      </div>
    </div> 
        
    );
}


export default SuperAdminScreen;