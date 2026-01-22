import api from "./axios";

export const getMyBookings = async () => {
    const res = await api.get("/booking/my");
    if (!res || !res.data || !res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
};



export const getBookingDetails = async (id) => {
    const res = await api.get(`/booking/${id}`);

    if (!res || !res.data || !res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
}



export const getAllBookings = (params) =>
  api.get("/booking/", { params }).then(res => res.data);

export const cancelBooking = (id) =>
  api.patch(`/bookings/${id}/cancel`);