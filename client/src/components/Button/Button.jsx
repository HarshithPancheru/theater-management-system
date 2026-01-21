import "./Button.css";
import Loader from "../Loader/Loader";

const Button = ({
  children,
  variant = "primary", // primary | secondary | danger
  size = "md", // sm | md | lg
  disabled = false,
  loading = false,
  onClick,
  type = "button",
}) => {
  // If loading → button should behave like disabled
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${
        isDisabled ? "btn--disabled" : ""
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {/* Button text */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap:"2px"
        }}
        className={`btn__text ${loading ? "btn__text--hidden" : ""}`}
      >
        {children}
      </span>

      {/* Loader shown only when loading */}
      {loading && (
        <span className="btn__loader">
          <Loader size="md" />
        </span>
      )}
    </button>
  );
};

export default Button;
