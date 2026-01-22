import { Navigate, Outlet } from "react-router-dom";
import { getRole } from "../utils/auth";

const RoleGuard = ({ allowedRoles = [] }) => {
  const role = getRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
