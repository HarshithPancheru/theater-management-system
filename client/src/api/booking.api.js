import api from "./axios";


export const getMyBookings = async () => {
    const res = await api.get("/bookings/my");
    if (!res || !res.data || !res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
};



export const getBookingDetails = async (id) => {
    const res = await api.get(`/bookings/${id}`);

    if (!res || !res.data || !res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
}



export const getAllBookings = (params) =>
  api.get("bookings/", { params }).then(res => res.data);

export const cancelBooking = (id) =>
  api.patch(`/bookings/${id}/cancel`);