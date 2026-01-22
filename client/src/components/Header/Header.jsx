import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  // Used to navigate and find location
  const location = useLocation();
  const navigate = useNavigate();

  // Data fetched from backend
  const userName = "Melwin";
  const userInitial = userName.charAt(0).toUpperCase();

  const notifications = [
    { id: 1, text: "New booking received sjnsjns  snkns sikns isnkn " },
    { id: 2, text: "Theater approved successfully" },
    { id: 1, text: "New booking received sjnsjns  snkns sikns isnkn " },
    { id: 2, text: "Theater approved successfully" },
    { id: 1, text: "New booking received sjnsjns  snkns sikns isnkn " },
  ];

  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setOpenNotif(false);
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // route to navigation
  const handleViewAll = () => {
    const basePath = location.pathname.split("/")[1];
    setOpenNotif(false);
    setOpenProfile(false);
    navigate(`/${basePath}/notifications`);
  };

  return (
    <header className="app-header">
      {/* Title */}
      <div className="title">
        <span className="header-title">Hello {userName},</span>
      </div>

      {/* Right side */}
      <div className="search-bar-plus-icon">
        {/* Notifications */}
        <div className="notification-wrapper" ref={notifRef}>
          <div
            className="notification-icon"
            onClick={() => {
              setOpenNotif((p) => !p);
              setOpenProfile(false);
            }}
          >
            <Icon icon="mdi:bell-outline" width="27" />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>

          {openNotif && (
            <div className="notification-dropdown">
              <div className="dropdown-header">Notifications</div>

              {notifications.map((n) => (
                <div key={n.id} className="notification-item">
                  {n.text}
                </div>
              ))}

              <div onClick={handleViewAll} className="dropdown-footer">
                View all
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile-icon"
            onClick={() => {
              setOpenProfile((p) => !p);
              setOpenNotif(false);
            }}
          >
            {userInitial}
          </div>

          {openProfile && (
            <div className="profile-dropdown">
              <div className="profile-item logout">Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
