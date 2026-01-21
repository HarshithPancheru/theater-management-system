import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/bookings",
    withCredentials: false
});

export const getMyBookings = async () => {
    const res = await api.get("/my");
    if (!res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
};


export const getMyBookingDetails = (id) => {
    const res = api.get(`/my/${id}`);
    if (!res.data.success) {
        throw new Error("API failed");
    }
    return res.data.data;
}