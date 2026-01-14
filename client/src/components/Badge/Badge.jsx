import "./Badge.css";

const Badge = ({
  children,
  status = "info", // success | warning | error | info
  size = "md",     // sm | md
}) => {
  return (
    <span className={`badge badge--${status} badge--${size}`}>
      {children}
    </span>
  );
};

export default Badge;
