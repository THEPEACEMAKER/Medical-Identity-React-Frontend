import React from 'react';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FullHeight from "react-full-height";
import { useSelector,useDispatch } from 'react-redux';
import api from '../../../api/api';
import { doctorActions } from '../../../store/doctor/doctor-slice';
import { fetchAppointments } from '../../../store/doctor/doctor-action';
import { helpers } from '../../utils/helpers';




const Dashboard = () => {

    const dispatch = useDispatch();

    // const [appointment, setAppointment] = useState([]);
    let appointment = []

    // const [action1, setAction1] = useState(null);
    // const [key, setKey] = useState(null)
    // const pendingAppointment = appointment.filter(pa => pa.action1 === "pending");
    // const todaysDate = new Date();
    // const day = todaysDate.getDate();
    // const month = todaysDate.getMonth();
    // const year = todaysDate.getFullYear();
    // const fullTodaysDate = month + 1 + "/" + day + "/" + year;


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
        
            console.log("inside app")
            console.log(appointments, count);
            dispatch(doctorActions.replaceApointments({
              data: appointments.result,
              appointmentCount: count,
              availableAppointments:appointments.result,
              isLoading : false,
            }));
          })
          .catch((error) => {
            console.error(error);
          });
        
        console.log("Inside useeffect after dispatch")
    
    }, [dispatch]);

    appointment = useSelector((state) => state.doctor.appointments)

    console.log("Appointment")
    console.log(appointment)

    const totalCount = useSelector((state) => state.doctor.appointmentCount)
    const isLoading = useSelector((state) => state.doctor.isLoading)




    return (
        <div className="dashboard">
            <Sidebar></Sidebar>
            {
                !isLoading ?
                <FullHeight>
                <div className="dashboardTable">
                    <h4>Dashboard</h4>
                    <div className="dashboardHeading">
                        <div style={{ backgroundColor: "tomato" }}>
                            <h1>{totalCount.Reserved}</h1>
                            <p>
                                Reserved
                            <br />
                            Appointments
                        </p>
                        </div>
                        <div style={{ backgroundColor: "deepskyblue" }}>
                            <h1>{totalCount.Available}</h1>
                            <p>
                                Available
                            <br />
                            Appointments
                        </p>
                        </div>
                        <div style={{ backgroundColor: "mediumseagreen" }}>
                            <h1>{totalCount.total}</h1>
                            <p>
                                Total
                            <br />
                            Appointments
                        </p>
                        </div>
                        <div style={{ backgroundColor: "orange" }}>
                            {/* <h1>{appointment.length}</h1> */}
                            <p>
                                All
                            <br />
                            Appointments
                        </p>
                        </div>
                    </div>
                    <div className="dashboardTableDetails">
                        <div>
                            <p>Recent Appointments</p>
                            <MDBTable align='middle' hover>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>Name</th>
                                    {/* <th scope='col'>Title</th> */}
                                    <th scope='col'>Status</th>
                                    {/* <th scope='col'>Position</th> */}
                                    <th scope='col'>Session Start </th>
                                    <th scope='col'>Session End</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>

                                    {
                                        appointment.map((appoint) => (
                                            <tr>
                                                <td>
                                                    {
                                                        appoint.status === "A" ? (
                                                            <p>Not Booked yet</p>
                                                        ) : (
                                                            <div className='d-flex align-items-center'>
                                                                <img
                                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                                    alt=''
                                                                    style={{ width: '45px', height: '45px' }}
                                                                    className='rounded-circle'
                                                                />
                                                                <div className='ms-3'>
                                                                    <p className='fw-bold mb-1'>John Doe</p>
                                                                    <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                                                </div>
                                                            </div>
                                                        )

                                                    }
                                                </td>
                                                <td>{
                                                    appoint.status === "A" ? (
                                                        <MDBBadge color='success' pill>
                                                        Available
                                                        </MDBBadge>
                                                    ) : (
                                                        <MDBBadge color='success' pill>
                                                        Booked
                                                        </MDBBadge>
                                                    )
                                                    }

                                                </td>
                                                {/* <td>Senior</td> */}

                                                <td>
                                                    {helpers.convertTimeTo12HourFormat(appoint.start_time)}
                                                </td>
                                                <td>
                                                {helpers.convertTimeTo12HourFormat(appoint.end_time)}
                                                </td>
                                            </tr>

                                        ))
                                    }

                                   
                                </MDBTableBody>
                                </MDBTable>

                        </div>
                    </div>
                </div>
            </FullHeight> :
            <FullHeight>
                <div style={{ margin: "350px 550px", display: "flex" }}>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </FullHeight>            }
        </div>
    );
};

export default Dashboard;