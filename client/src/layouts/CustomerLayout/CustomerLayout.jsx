import React from "react";
import "./CustomerLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { customerMenu } from "../../config/SideBarMenu";

const CustomerLayout = () => {
  return (
    <div className="mainContainer">
      {/* left */}
      <div className="left">
        <Sidebar menu={customerMenu} />
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

export default CustomerLayout;
