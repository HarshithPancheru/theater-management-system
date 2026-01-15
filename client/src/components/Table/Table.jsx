import "./Table.css";
import EmptyState from "../EmptyState/EmptyState";

const Table = ({ columns = [], data = [] }) => {
  // If no data, show empty state
  if (!data.length) {
    return (
      <EmptyState
        title="No Data Found"
        description="There is no data to display."
      />
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key] ?? "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
