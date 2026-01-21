import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  size = "md", // sm | md | lg
}) => {
  return (
    <div
      className={`search-container search-${size} ${
        disabled ? "disabled" : ""
      }`}
    >
      {/* Search Icon */}
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

      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="search-input"
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Clear Button */}
      {value && !disabled && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
