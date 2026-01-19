import "./CustomerLayout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { customerMenu } from "../../config/SideBarMenu";
import { Outlet } from "react-router-dom";

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
        <div className="content">
          {/* <Outlet /> will come here */}
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
