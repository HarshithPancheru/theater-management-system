import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <>
      <div className="search-container">
        <svg
          className="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L16.65 16.65M11 18C14.866 18 18 14.866 18 11C18 7.134 14.866 4 11 4C7.134 4 4 7.134 4 11C4 14.866 7.134 18 11 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </>
  );
};

export default SearchBar;
