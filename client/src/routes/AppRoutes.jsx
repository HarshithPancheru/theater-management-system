import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminLayout from "../layouts/SuperAdminLayout/SuperAdminLayout";
import TheaterManagerLayout from "../layouts/TheaterManagerLayout/TheaterManagerLayout";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
import CustomerLayout from "../layouts/CustomerLayout/CustomerLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/super-admin" element={<SuperAdminLayout />} />
        <Route path="/theater-manager" element={<TheaterManagerLayout />} />
        <Route path="/staff" element={<StaffLayout />} />
        <Route path="/customer" element={<CustomerLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
