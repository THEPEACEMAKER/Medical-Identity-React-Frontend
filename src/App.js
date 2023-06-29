import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./features/auth/components/register/register";
import Login from "./features/auth/components/login/Login";
import Navbar from "./features/layout/navbar/navbar";
import Footer from "./features/layout/footer/Footer";
import NotFound from "./features/404/404";
// import Profile from "./features/auth/components/profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import DoctorsZone from "./features/doctors/DoctorsZone/DoctorsZone";
import Dashboard from "./features/doctors/Dashboard/Dashboard";
import Prescription from "./features/doctors/Prescription/Prescription";

import "./App.css";
import Home from "./features/home/homePage";

function App() {
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
              <ProtectedRoutes requiresLogin={false} redirectTo="/login" />
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="" element={<Home />} />
            {/* <Route path="profile" element={<Profile />} /> */}
          </Route>
          <Route path="doctorDashboard" element={<Dashboard />} />
          <Route path="doctorAppointment" element={<DoctorsZone />} />
          <Route path="doctorPrescription" element={<Prescription />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
