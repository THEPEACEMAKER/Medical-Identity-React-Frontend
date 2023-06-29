import React from 'react';
import './PatientSidebar.css';
import FullHeight from "react-full-height";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faCalendarDay, faUserFriends, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const PatientSidebar = () => {
    return (
        <div>
            <FullHeight className="section-styles sidebar">
                    <Link to="/patientDashboard" style={{ textDecoration: "none" }} className="sideBarLink">
                        <FontAwesomeIcon className="icon" icon={faTh} />
                        <p>Dashboard</p>
                    </Link>
                    <Link to="/patientAppointment" style={{ textDecoration: "none" }} className="sideBarLink">
                        <FontAwesomeIcon className="icon" icon={faCalendarDay} />
                        <p>Appointment</p>
                    </Link>
                    <Link to="/patientPrescription" style={{ textDecoration: "none" }} className="sideBarLink">
                        <FontAwesomeIcon className="icon" icon={faFileAlt} />
                        <p>Prescriptions</p>
                    </Link>
                    <Link to="" style={{ textDecoration: "none" }} className="sideBarLink">
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                        <p>Log Out</p>
                    </Link>
            </FullHeight>
        </div>
    );
};

export default PatientSidebar;