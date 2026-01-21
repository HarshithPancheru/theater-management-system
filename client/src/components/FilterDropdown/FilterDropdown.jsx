import { useState, useRef, useEffect } from "react";
import "./FilterDropdown.css";
import Button from "../Button/Button";

const FilterDropdown = ({
  align="right",
  statusOptions = [],
  selectedStatus,
  onStatusChange,
  onApply,
  onReset,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filter-dropdown" ref={wrapperRef}>
      {/* Filter button */}

      <Button size="sm" onClick={() => setOpen((prev) => !prev)}>
        Filter
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="white"
            stroke-width="2"
            d="M18 4H6c-1.105 0-2.026.91-1.753 1.98a8.02 8.02 0 0 0 4.298 5.238c.823.394 1.455 1.168 1.455 2.08v6.084a1 1 0 0 0 1.447.894l2-1a1 1 0 0 0 .553-.894v-5.084c0-.912.632-1.686 1.454-2.08a8.02 8.02 0 0 0 4.3-5.238C20.025 4.91 19.103 4 18 4z"
          />
        </svg>
      </Button>

      {/* Dropdown panel */}
      {open && (
        <div className={`filter-dropdown__panel filter-dropdown__panel--${align}`}>
          <div className="filter-dropdown__header">Filter By</div>

          <div className="filter-dropdown__item">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="">All</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown__actions">
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setOpen(false);
                onReset()
              }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onApply();
                setOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
