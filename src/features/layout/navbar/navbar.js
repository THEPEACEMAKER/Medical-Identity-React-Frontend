import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./stylee.module.css";
import { logout } from "../../auth/authSlice";
import { useEffect, useState } from "react";
import api from "../../../api/api";
import logo from "../../../assets/logo2.png"

function Navbar() {
  const user = localStorage.getItem("user");
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
                    <span> Medical History</span>
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
                  <Link to={`/doctor/${user.id}`} className="mx-2 text-black">
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
                {/* <li className="nav-item">
                  <Link
                    to="/home"
                    // aria-current="page"
                    className="footerLogo" 
                  >
                    <img src={logo} alt="logo" className="footerLogo" />
                  </Link>
                </li> */}
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
                {/* <li className="nav-item">
                  <Link
                    className={`nav-link `}
                    aria-current="page"
                    to="/doctor"
                  >
                    Doctors
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    to="/orders"
                    className={`nav-link `}
                    aria-current="page"
                  >
                    Hospitals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link `}
                    aria-current="page"
                    to="/aboutus"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contactus"
                    className={`nav-link `}
                    aria-current="page"
                  >
                    Contact Us
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
