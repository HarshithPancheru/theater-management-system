import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

import React from "react";

const Header = () => {
  return (
    <header className="app-header">
      {/* title */}
      <div className="title">
        <span className="header-title">Theater Management</span>
      </div>
      {/* search bar + profile icon */}
      <div className="search-bar-plus-icon">
        <SearchBar />
        {/* Profile */}
        <div className="profile-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
