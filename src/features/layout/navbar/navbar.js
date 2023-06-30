import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./stylee.module.css";
import { logout } from "../../auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, isDoctor, isPatient } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary p-0`}>
      <div className="d-flex flex-column w-100 ">
        <div className={`${styles.top}`}>
          <div className="d-flex  w-100 justify-content-between align-items-center container-fluid">
            <div className="social-links my-2 ">
              <Link>
                <i className="fa-brands mx-1 fa-facebook text-dark"></i>
              </Link>
              <Link>
                <i className="fa-brands mx-1 fa-twitter text-dark"></i>
              </Link>
              <Link>
                <i className="fa-brands mx-1 fa-github text-dark"></i>{" "}
              </Link>
              <Link>
                <i className="fa-brands mx-1 fa-linkedin text-dark"></i>{" "}
              </Link>
              <Link>
                <i className="fab mx-1 fa-google text-dark"></i>{" "}
              </Link>
            </div>

            <div className="my-2">
              {isDoctor && (
                <>
                  <Link to="/doctorDashboard" className="mx-2 text-dark">
                    <i className="fas fa-book-medical"></i>
                    <span> Doctors</span>
                  </Link>
                </>
              )}

              {isPatient && (
                <>
                  <Link to="/patientDashboard" className="mx-2 text-dark">
                    <i className="fas fa-bed-pulse"></i>
                    <span> Patients</span>
                  </Link>{" "}
                </>
              )}

              {!isLoggedIn && (
                <>
                  <Link to="/login" className="mx-2 text-dark">
                    <i className="fa-solid fa-user"></i>
                    <span> Login</span>
                  </Link>
                  <Link to="/register" className="mx-2 text-dark">
                    <span> Register</span>
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link to="/profile" className="mx-2 text-black">
                    <i className="fa-solid fa-user "></i>
                    <span> Profile</span>
                  </Link>

                  <Link className="mx-2 text-black" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    <span> Logout</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="home">
              <div className="col-lg-4 w-100">
                <Link to="/home" className="text-decoration-none">
                  <span className="h1 text-uppercase text-primary bg-dark px-2">
                    Medical
                  </span>
                  <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                    Identity
                  </span>
                </Link>
              </div>
            </Link>

            <div className="cart d-flex">
              <Link to="/wishlist" className="btn-new p-2">
                <i className="fa-regular fa-lg fa-heart text-black"></i>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <i className="fa-solid fa-bars text-black"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
