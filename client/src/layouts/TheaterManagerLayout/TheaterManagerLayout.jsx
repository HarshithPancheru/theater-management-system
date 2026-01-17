import React from "react";
import "./TheaterManagerLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { theaterManagerMenu } from "../../config/SideBarIcon";

const TheaterManagerLayout = () => {
  return (
    <div className="mainContainer">
      {/* left */}
      <div className="left">
        <Sidebar menu={theaterManagerMenu} />
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

export default TheaterManagerLayout;
