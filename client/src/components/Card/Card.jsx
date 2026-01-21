import "./Card.css";

const Card = ({
  children,
  size = "md",
  clickable = false,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`card card--${size} ${
        clickable ? "card--clickable" : "card--static"
      } ${className}`}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
