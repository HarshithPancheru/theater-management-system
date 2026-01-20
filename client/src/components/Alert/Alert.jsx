export default function Alert({ type = "info", message, children }) {
  const bg = type === "info" ? "bg-blue-100" : "bg-red-100";
  const text = type === "info" ? "text-blue-800" : "text-red-800";

  return (
    <div className={`p-3 rounded ${bg} ${text} mt-2`}>
      <strong>{message}</strong>
      {children}
    </div>
  );
}
