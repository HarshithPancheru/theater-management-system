import "./Loader.css";

const Loader = ({ size = "md" }) => {
  return <span className={`loader loader--${size}`} />;
};

export default Loader;
