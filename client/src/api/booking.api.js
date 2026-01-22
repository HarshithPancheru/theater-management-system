import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/bookings",
    withCredentials: false
});

export const getMyBookings = async () => {
    const res = await api.get("/my");
    if (!res || !res.data || !res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
};



export const getBookingDetails = async (id) => {
    const res = await api.get(`/${id}`);

    if (!res || !res.data || !res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
}



export const getAllBookings = (params) =>
  api.get("/", { params }).then(res => res.data);

export const cancelBooking = (id) =>
  api.patch(`/admin/bookings/${id}/cancel`);