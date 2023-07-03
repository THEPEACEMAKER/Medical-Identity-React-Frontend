import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./stylee.module.css";
import { logout } from "../../auth/authSlice";
import { useEffect, useState } from "react";
import api from "../../../api/api";

function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, isDoctor, isPatient } = useSelector(
    (state) => state.auth
  );
  const [specializations, setSpecializations] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("specializations");
        setSpecializations(response.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };

    fetchData();
  }, []);

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
                  <Link to="/reservations" className="mx-2 text-dark">
                    <i className="fas fa-calendar-check"></i>
                    <span> Reservations</span>
                  </Link>{" "}
                  <Link to="/medicalHistory" className="mx-2 text-dark">
                    <i className="fas fa-file-medical"></i>
                    <span>Medical History</span>
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

        <div className="bg-dark py-2 mt-3">
          {" "}
          <div
            className="offcanvas offcanvas-end align-self-start container m-auto"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-body ">
              <ul
                className={`navbar-nav ${styles.ulNavbar} d-lg-flex align-items-lg-center gap-lg-3`}
              >
                <li className="nav-item dropdown">
                  <Link
                    className="btn d-flex align-items-center justify-content-between  bg-primary"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      height: "65px",
                      padding: "0 30px",
                      width: "300px",
                    }}
                  >
                    <h6 className="text-dark m-0">
                      <i className="fa fa-bars mx-2"></i>Specializations
                    </h6>
                    <i className="fa fa-angle-down text-dark mx-2"></i>{" "}
                  </Link>
                  <ul
                    className={`dropdown-menu ${styles.dropdownMenu}`}
                    style={{
                      padding: "0 30px",
                      width: "300px",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {specializations &&
                      specializations.map((el, i) => (
                        <li key={el.id}>
                          <Link
                            to={`/doctors/${el.id}`}
                            className="dropdown-item"
                          >
                            <span>{el.name}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${styles.active}`}
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
