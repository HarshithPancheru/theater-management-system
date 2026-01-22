import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "./AuthGuard";
import RoleGuard from "./RoleGuard";

// Super admin
import SuperAdminLayout from "../layouts/SuperAdminLayout/SuperAdminLayout";
import SuperAdminTheaterList from "../pages/super-admin/TheaterList";
import SuperAdminScreenList from "../pages/super-admin/ScreenList";
import SuperAdminMovieList from "../pages/super-admin/MovieList";
import SuperAdminUsersList from "../pages/super-admin/UsersList";
import SuperAdminStaffList from "../pages/super-admin/StaffList";
import SuperAdminBookingList from "../pages/super-admin/BookingList";
import SuperAdminShowsList from "../pages/super-admin/Shows";

// Theater Manager
import TheaterManagerLayout from "../layouts/TheaterManagerLayout/TheaterManagerLayout";
import TheaterManagerScreenList from "../pages/theater-manager/ScreenList";
import TheaterManagerMovieList from "../pages/theater-manager/MovieList";
import TheaterManagerShowList from "../pages/theater-manager/ShowList";
import TheaterManagerBookingList from "../pages/theater-manager/BookingList";

// Staff
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
import StaffShowsList from "../pages/staff/Shows";
import StaffBookingList from "../pages/staff/BookingList";

// Customer
import CustomerLayout from "../layouts/CustomerLayout/CustomerLayout";
import CustomerMovieList from "../pages/customer/MovieList";
import MyBookings from "../pages/customer/MyBookings";
import BookingDetails from "../pages/customer/BookingDetails";
import Profile from "../pages/customer/Profile";

// Common
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";
import Notification from "../pages/common/Notification";
import ForgotPassword from "../pages/common/ForgotPassword";
import ResetPassword from "../pages/common/ResetPassword";
import Unauthorized from "../pages/common/Unauthorized";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<AuthGuard />}>

          {/* SUPER ADMIN */}
          <Route element={<RoleGuard allowedRoles={["SUPER_ADMIN"]} />}>
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<Navigate to="theaters" replace />} />
              <Route path="theaters" element={<SuperAdminTheaterList />} />
              <Route path="screens" element={<SuperAdminScreenList />} />
              <Route path="movies" element={<SuperAdminMovieList />} />
              <Route path="shows" element={<SuperAdminShowsList />} />
              <Route path="bookings" element={<SuperAdminBookingList />} />
              <Route path="users" element={<SuperAdminUsersList />} />
              <Route path="staff" element={<SuperAdminStaffList />} />
              <Route path="notifications" element={<Notification />} />
            </Route>
          </Route>

          {/* THEATER MANAGER */}
          <Route element={<RoleGuard allowedRoles={["THEATER_MANAGER"]} />}>
            <Route path="/theater-manager" element={<TheaterManagerLayout />}>
              <Route index element={<Navigate to="screens" replace />} />
              <Route path="screens" element={<TheaterManagerScreenList />} />
              <Route path="movies" element={<TheaterManagerMovieList />} />
              <Route path="shows" element={<TheaterManagerShowList />} />
              <Route path="bookings" element={<TheaterManagerBookingList />} />
              <Route path="notifications" element={<Notification />} />
            </Route>
          </Route>

          {/* STAFF */}
          <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<Navigate to="shows" replace />} />
              <Route path="shows" element={<StaffShowsList />} />
              <Route path="bookings" element={<StaffBookingList />} />
              <Route path="notifications" element={<Notification />} />
            </Route>
          </Route>

          {/* CUSTOMER */}
          <Route element={<RoleGuard allowedRoles={["USER"]} />}>
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<Navigate to="movies" replace />} />
              <Route path="movies" element={<CustomerMovieList />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="my-bookings/:bookingId" element={<BookingDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notification />} />
            </Route>
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
