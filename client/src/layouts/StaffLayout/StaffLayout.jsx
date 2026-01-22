import "./StaffLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { staffMenu } from "../../config/SideBarMenu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const StaffLayout = () => {
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
        <Sidebar menu={staffMenu} onItemClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* right */}
      <div className="right">
        <Header onMenuClick={() => {
          setIsSidebarOpen(true)
          toast.dismiss()
        }} />

        {/* main content goes here */}
        <div className="content">
          {/* <Outlet /> will come here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
