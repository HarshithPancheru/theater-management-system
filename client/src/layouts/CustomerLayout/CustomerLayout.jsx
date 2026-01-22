import "./CustomerLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { customerMenu } from "../../config/SideBarMenu";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="mainContainer">
      {/* Mobile only */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* left */}
      <div className={`left ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar menu={customerMenu} onItemClick={()=> setIsSidebarOpen(false)} />
      </div>

      {/* right */}
      <div className="right">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* main content goes here */}
        <div className="content">
          {/* <Outlet /> will come here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
