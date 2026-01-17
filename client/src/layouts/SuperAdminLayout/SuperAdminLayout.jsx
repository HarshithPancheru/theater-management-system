import React from "react";
import "./SuperAdminLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { superAdminMenu } from "../../config/SideBarMenu";

const SuperAdminLayout = () => {
  return (
    <div className="mainContainer">
      {/* left */}
      <div className="left">
        <Sidebar menu={superAdminMenu} />
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

export default SuperAdminLayout;
