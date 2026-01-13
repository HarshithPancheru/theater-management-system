import React from "react";
import "./StaffLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/SideBar";
import { staffMenu } from "../../config/SideBarIcon";

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
        <div className="content">{/* later <Outlet /> will come here */}</div>
      </div>
    </div>
  );
};

export default StaffLayout;
