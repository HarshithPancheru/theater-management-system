import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import "./SortDropdown.css";

const SortDropdown = ({ align = "right", options = [], onApply }) => {
  const [open, setOpen] = useState(false);
  const [sortState, setSortState] = useState({});
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleField = (key) => {
    setSortState((prev) => {
      if (prev[key]) {
        // remove field
        return {};
      }
      // add field with default asc
      return { [key]: "asc" };
    });
  };

  const toggleDirection = (key) => {
    setSortState((prev) => ({
      [key]: prev[key] === "asc" ? "desc" : "asc",
    }));
  };

  const handleReset = () => {
    setSortState({});
    setOpen(false);
    onApply(null); // tell parent → no sorting
  };

  const handleApply = () => {
    if (Object.keys(sortState).length === 0) return;
    onApply(sortState);
    setOpen(false);
  };

  return (
    <div className="sort-dropdown" ref={wrapperRef}>
      {/* Sort Button */}
      <Button size="sm" onClick={() => setOpen((p) => !p)}>
        Sort
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h4q.425 0 .713.288T9 17t-.288.713T8 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h10q.425 0 .713.288T15 12t-.288.713T14 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
          />
        </svg>
      </Button>

      {open && (
        <div className={`sort-dropdown__panel sort-dropdown__panel--${align}`}>
          <div className="sort-dropdown__header">Sort By</div>

          {options.map((opt) => {
            const active = !!sortState[opt.key];

            return (
              <div
                key={opt.key}
                className={`sort-row ${active ? "active" : ""}`}
              >
                <div
                  className="sort-label"
                  onClick={() => toggleField(opt.key)}
                >
                  <input type="checkbox" checked={active} readOnly />
                  <span>{opt.label}</span>
                </div>

                {active && (
                  <button
                    className="sort-direction"
                    onClick={() => toggleDirection(opt.key)}
                  >
                    {sortState[opt.key] === "asc" ? (
                      // ASC
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12.75 20a.75.75 0 0 1-1.5 0v-9.25H6a.75.75 0 0 1-.53-1.28l6-6a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1-.53 1.28h-5.25z"
                        />
                      </svg>
                    ) : (
                      // DESC
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12.75 4a.75.75 0 0 0-1.5 0v9.25H6a.75.75 0 0 0-.53 1.28l6 6a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0-.53-1.28h-5.25z"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            );
          })}

          <div className="sort-dropdown__actions">
            <Button size="sm" variant="danger" onClick={handleReset}>
              Reset
            </Button>
            <Button
              size="sm"
              disabled={Object.keys(sortState).length === 0}
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
