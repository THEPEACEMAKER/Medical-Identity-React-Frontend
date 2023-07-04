import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./features/auth/components/register/register";
import Login from "./features/auth/components/login/Login";
import Navbar from "./features/layout/navbar/navbar";
import Footer from "./features/layout/footer/Footer";
import NotFound from "./features/404/404";
import ProtectedRoutes from "./ProtectedRoutes";
import DoctorsZone from "./features/doctors/DoctorsZone/DoctorsZone";
import Dashboard from "./features/doctors/Dashboard/Dashboard";
import Prescription from "./features/doctors/Prescription/Prescription";
import api from "./api/api";
import PatientDashboard from "./features/patient/Dashboard/PatientDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doctorActions } from "./store/doctor/doctor-slice";
import Home from "./features/home/homePage";
import "./App.css";
import DoctorsListPage from "./features/DoctorsListPage/DoctorsListPage";
import { helpers } from "./features/utils/helpers";
import MedicalEntry from "./features/medicalEntry/medicalEntry";

import Reservations from "./features/patient/Reservations/Reservations";
import EntryData from "./features/doctors/Entry/EntryData/EntryData";

function App() {
  const dispatch = useDispatch();

  const isDoctor = localStorage.getItem("isDoctor")
  const isPatient = localStorage.getItem("isPatient")

  console.log("isDoctor, isPatient", isDoctor, isPatient)

  useEffect(() => {

    // if(isDoctor){
      helpers.fetchDoctorData(dispatch);
    // }
    
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route
            element={<ProtectedRoutes requiresLogin={false} redirectTo="/" />}
          >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            element={
              <ProtectedRoutes requiresLogin={true} redirectTo="/login" />
            }
          >
            <Route path="medicalHistory" element={<EntryData />} />
            <Route
              path="medicalHistory/patient/:patientId/appointment/:appointmentId/code/:code/"
              element={<EntryData />}
            />
          </Route>
          <Route
            element={
              <ProtectedRoutes
                requiresLogin={true}
                requiresDoctor={true}
                redirectTo="/login"
              />
            }
          >
            <Route path="doctorDashboard" element={<Dashboard />} />
            <Route path="doctorAppointment" element={<DoctorsZone />} />
            <Route path="doctorPrescription" element={<Prescription />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes
                requiresLogin={true}
                requiresPatient={true}
                redirectTo="/login"
              />
            }
          >
            <Route path="patientDashboard" element={<PatientDashboard />} />
            <Route path="reservations" element={<Reservations />} />
            {/* <Route path="profile" element={<Profile />} /> */}
          </Route>

          <Route
            path="doctors/:specializationId"
            element={<DoctorsListPage />}
          />

          <Route path="medicalEntry" element={<MedicalEntry />} />

          <Route path="home" element={<Home />} />
          <Route path="" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
