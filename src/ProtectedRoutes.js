import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const isUserLoggedIn = (requiresLogin, isLoggedIn) => {
  const isLoginRequired = requiresLogin && isLoggedIn;
  const isLoginNotRequired = !requiresLogin && !isLoggedIn;
  return isLoginRequired || isLoginNotRequired;
};

const isAccessAllowed = (
  requiresDoctor,
  requiresPatient,
  isDoctor,
  isPatient
) => {
  const isDoctorRequired = requiresDoctor && isDoctor;
  const isPatientRequired = requiresPatient && isPatient;
  return (
    (!requiresDoctor && !requiresPatient) ||
    isDoctorRequired ||
    isPatientRequired
  );
};

const ProtectedRoutes = ({
  requiresLogin,
  requiresDoctor,
  requiresPatient,
  redirectTo,
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDoctor = useSelector((state) => state.auth.isDoctor);
  const isPatient = useSelector((state) => state.auth.isPatient);

  const isUserLoggedInAndAccessAllowed =
    isUserLoggedIn(requiresLogin, isLoggedIn) &&
    isAccessAllowed(requiresDoctor, requiresPatient, isDoctor, isPatient);

  if (isUserLoggedInAndAccessAllowed) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} />;
};

export default ProtectedRoutes;
