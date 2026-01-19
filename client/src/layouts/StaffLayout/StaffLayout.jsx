import "./StaffLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { staffMenu } from "../../config/SideBarMenu";
import { Outlet } from "react-router-dom";

const StaffLayout = () => {
  return (
    <div className="mainContainer">
      {/* left */}
      <div className="left">
        <Sidebar menu={staffMenu} />
      </div>

      {/* right */}
      <div className="right">
        <Header />

        {/* main content goes here */}
        <div className="content">
          {/* <Outlet /> will come here */}
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
