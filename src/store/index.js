import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import doctorSlice from "./doctor/doctor-slice";
import DoctorsListSlice from "../features/DoctorsListPage/DoctorsListSlice";
import ReservationsSlice from "../features/patient/Reservations/ReservationsSlice";
import DoctorsSlice from "../features/doctors/DoctorsData/DoctorsSlice/DoctorsSlice";
import MedicalHistorySlice from "../features/doctors/Entry/EntryData/MedicalHistorySlice";
import DoctorSlice from "../features/doctors/DoctorProfile/DoctorSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    doctor: doctorSlice.reducer,
    doctorsPage: DoctorsListSlice,
    patientReservations: ReservationsSlice,
    doctorsData: DoctorsSlice,
    medicalHistory: MedicalHistorySlice,
    doctorData: DoctorSlice,
  },
});

export default store;
