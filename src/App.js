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
import api from "./api/api";
import PatientDashboard from "./features/patient/Dashboard/PatientDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doctorActions } from "./store/doctor/doctor-slice";
import Home from "./features/home/homePage";
import "./App.css";
import DoctorsListPage from "./features/DoctorsListPage/DoctorsListPage";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const endpoint1 = "/appointment/doctor/list-all/";
    const endpoint2 = "/appointment/doctor/list/count/status/";
    
    Promise.all([
      api.get(endpoint1),
      api.get(endpoint2),
    ])
      .then(([appointmentsRes, countRes]) => {
        const appointments = appointmentsRes.data || [];
        const count = countRes.data || 0;
    
        console.log(appointments, count);
        dispatch(doctorActions.replaceApointments({
          data: appointments,
          appointmentCount: count,
          availableAppointments:appointments,
          isLoading : false,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
    
    console.log("Inside useeffect after dispatch")

}, [dispatch]);

  // useEffect(() => {
  //   // fetch("http://localhost:3500/items")
  //   //     .then(res => res.json())
  //   //     .then(data => {
  //   //         const fetchedData = data.reverse()
  //   //         setAppointment(fetchedData);
  //   //     });
  //   console.log("Inside useeffect")
  //   api.get("/appointment/doctor/list-all/")
  //   .then((res)=> {
  //     const data = res.data
  //     console.log(data)
  //     dispatch(doctorActions.replaceApointments({
  //       data: data || [],
  //       isLoading: false,
  //       next: null,
  //       previous: null
  //     }))
  //   })
  // }, [dispatch]);

  // console.log("Inside useeffect")
  // api.get("/appointment/doctor/list-all/")
  // .then((res)=> {
  //   const data = res.data
  //   console.log("data in app")
  //   console.log(data)
  //   dispatch(doctorActions.replaceApointments({
  //     data: data || [],
  //     isLoading: false,
  //     next: null,
  //     previous: null
  //   }))
  // })
  // .catch((err) => {
  //   console.log("inside error")
  //   console.log(err);
  // });

  // console.log("after useEffect")

  // console.log("App")

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
            {/* <Route path="profile" element={<Profile />} /> */}
          </Route>

          <Route
            path="doctors/:specializationId"
            element={<DoctorsListPage />}
          />

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
