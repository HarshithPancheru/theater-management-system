import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminLayout from "../layouts/SuperAdminLayout/SuperAdminLayout";
import TheaterManagerLayout from "../layouts/TheaterManagerLayout/TheaterManagerLayout";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
import CustomerLayout from "../layouts/CustomerLayout/CustomerLayout";
import Dashboard from "../features/user/Dashboard";
import MovieList from "../features/movie/MovieList";
import TheaterList from "../features/theater/TheaterList";
import MyBookings from "../features/booking/MyBookings";
import BookingDetails from "../features/booking/BookingDetails";
import Profile from "../features/auth/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Super Admin */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<MyBookings />} />
        </Route>

        {/* Theater Manager */}
        <Route path="/theater-manager" element={<TheaterManagerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<MyBookings />} />
        </Route>

        {/* Staff */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<MyBookings />} />
        </Route>

        {/* Customer */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="theaters" element={<TheaterList />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="my-bookings/:bookingId" element={<BookingDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
