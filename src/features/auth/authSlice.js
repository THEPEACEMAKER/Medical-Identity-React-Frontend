import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: localStorage.getItem("user"),
  isDoctor: localStorage.getItem("isDoctor"),
  isPatient: localStorage.getItem("isPatient"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user = action.payload.user;
      state.isDoctor = action.payload.user.isDoctor;
      state.isPatient = !action.payload.user.isDoctor;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isDoctor", action.payload.user.isDoctor);
      localStorage.setItem("isPatient", !action.payload.user.isDoctor);
    },
    logout: (state) => {
      state.isLoggedIn = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {};
      state.isDoctor = null;
      state.isPatient = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("isDoctor");
      localStorage.removeItem("isPatient");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
