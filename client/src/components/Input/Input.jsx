import "./Input.css";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
}) => {
  return (
    <div className="input-wrapper">
      {/* Label */}
      {label && <label className="input-label">{label}</label>}

      {/* Input */}
      <input
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Error message */}
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;
