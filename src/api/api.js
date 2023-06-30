import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL, // Django
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    // Add authorization header
    const token = localStorage.getItem("accessToken");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await api.post("/api/token/refresh/", {
        refresh_token: refreshToken,
      });
      if (res.status === 201) {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        api.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("accessToken");
        console.log("token refreshed");
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Redirect to login page
      return Promise.reject({
        message: "Unauthorized. Please log in again.",
        originalError: error,
      });
    } else if (error.response.status === 404) {
      return Promise.reject({
        message: `${error.config.url} not found`,
        originalError: error,
      });
    } else {
      return Promise.reject({
        message: "An error occurred. Please try again later.",
        originalError: error,
      });
    }
  }
);

export default api;
