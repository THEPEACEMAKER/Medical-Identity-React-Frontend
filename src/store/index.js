import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import doctorSlice from "./doctor/doctor-slice";
import DoctorsListSlice from "../features/DoctorsListPage/DoctorsListSlice";
import ReservationsSlice from "../features/patient/Reservations/ReservationsSlice";
import DoctorsSlice from "../features/doctors/DoctorsData/DoctorsSlice/DoctorsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    doctor: doctorSlice.reducer,
    doctorsPage: DoctorsListSlice,
    patientReservations: ReservationsSlice,
    doctorsData: DoctorsSlice,
  },
});

export default store;
