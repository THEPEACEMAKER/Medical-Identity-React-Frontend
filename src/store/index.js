import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import doctorSlice from "./doctor/doctor-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    doctor: doctorSlice.reducer
  },
});

export default store;
