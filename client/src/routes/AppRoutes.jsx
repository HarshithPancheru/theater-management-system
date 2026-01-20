import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Super Admin */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<Navigate to="theaters" replace />} />
          <Route path="theaters" element={<SuperAdminTheaterList />} />
          <Route path="screens" element={<SuperAdminScreenList />} />
          <Route path="movies" element={<SuperAdminMovieList />} />
          <Route path="shows" element={<SuperAdminShowsList />} />
          <Route path="bookings" element={<SuperAdminBookingList />} />
          <Route path="users" element={<SuperAdminUsersList />} />
          <Route path="staff" element={<SuperAdminStaffList />} />
        </Route>

        {/* Theater Manager */}
        <Route path="/theater-manager" element={<TheaterManagerLayout />}>
          <Route index element={<Navigate to="screens" replace />} />
          <Route path="screens" element={<TheaterManagerScreenList />} />
          <Route path="movies" element={<TheaterManagerMovieList />} />
          <Route path="shows" element={<TheaterManagerShowList />} />
          <Route path="bookings" element={<TheaterManagerBookingList />} />
        </Route>

        {/* Staff */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<Navigate to="shows" replace />} />
          <Route path="shows" element={<StaffShowsList />} />
          <Route path="bookings" element={<StaffBookingList />} />
        </Route>

        {/* Customer */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="movies" replace />} />
          <Route path="movies" element={<CustomerMovieList />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-bookings/:bookingId" element={<BookingDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
