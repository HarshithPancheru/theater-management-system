import "./SideBar.css";
import { icons } from "../../config/SideBarIcon";
import { NavLink } from "react-router-dom";

const Sidebar = ({ menu, onItemClick }) => {
  return (
    <>
      <div className="sidebar-container">
        {/* app name */}
        <div className="app-name-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="-2 -2 24 24"
          >
            <path
              fill="#fff"
              d="M6 15v3h8v-7H6zm-2-2v-2H2V9h2V7H2v6zm0 2H2v1a2 2 0 0 0 2 2zm14-2V7h-2v2h2v2h-2v2zm0 2h-2v3a2 2 0 0 0 2-2zm-4-8V2H6v7h8zm4-2V4a2 2 0 0 0-2-2v3zM4 5V2a2 2 0 0 0-2 2v1zm0-5h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4"
              stroke-width="0.5"
              stroke="#f3f3f3"
            />
          </svg>
          <span className="app-name">CinemaHub</span>
        </div>

        {/* menu items */}
        <nav className="menu-items">
          {menu.map((item) => (
            <NavLink
              to={item.path}
              end
              key={item.label}
              className={({ isActive }) =>
                `menu-dashboard ${isActive ? "active" : ""}`
              }
              onClick={onItemClick}
            >
              {icons[item.icon]}
              <span className="sidebar-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
