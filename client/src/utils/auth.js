export const getToken = () => localStorage.getItem("CinemaHub-token");
export const getRole = () => localStorage.getItem("CinemaHub-role");

export const isAuthenticated = () => !!getToken();
