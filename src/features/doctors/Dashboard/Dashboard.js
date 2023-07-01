import React from 'react';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FullHeight from "react-full-height";
import { useSelector,useDispatch } from 'react-redux';
import { helpers } from '../../utils/helpers';

const Dashboard = () => {

    const [appointment, setAppointment] = useState([])

    const [notAll, setNotAll] = useState(true)

    const dispatch = useDispatch();

    const getAllAppointment = useSelector((state) => state.doctor.appointments)
    const availableAppointments = useSelector((state) => state.doctor.availableAppointments)
    const reservedAppointments = useSelector((state) => state.doctor.reservedAppointment)

    console.log("Dashboard appointment")
    console.log(appointment)

    const totalCount = useSelector((state) => state.doctor.appointmentCount)
    const isLoading = useSelector((state) => state.doctor.isLoading)

    useEffect(() => {
        
        setAppointment(getAllAppointment)
        if(notAll){
            helpers.fetchDoctorData(dispatch)
            console.log("inside useEfect notAll")
        }
        setNotAll(false)

    }, [dispatch, getAllAppointment, notAll]);

    function allAppointment (){
        setAppointment(getAllAppointment)

    }

    function availableAppointment  (){
        setAppointment(availableAppointments)
        
    }

    function reservedAppointment (){
        setAppointment(reservedAppointments)
        
    }

    return (
        <div className="dashboard">
            <Sidebar></Sidebar>
            {
                !isLoading ?
                <FullHeight>
                <div className="dashboardTable">
                    <h4>Dashboard</h4>
                    <div className="dashboardHeading">
                        <div
                              className="my-All-Appointment-component"
                              onClick={allAppointment}>
                            <h1>{totalCount.total}</h1>
                            <p>
                                All
                            <br />
                            Appointments
                            </p>
                        </div>
                        <div 
                            className="my-available-Appointment-component"
                            onClick={availableAppointment}>
                            <h1>{totalCount.Available}</h1>
                            <p>
                                Available
                            <br />
                            Appointments
                            </p>
                        </div>
                        <div 
                            className='my-reserved-Appointment-component'
                        onClick={reservedAppointment}>
                            <h1>{totalCount.Reserved}</h1>
                            <p>
                                Reserved
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
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Session Start </th>
                                    <th scope='col'>Session End</th>
                                    <th scope='col'>Price</th>
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
                                                                    alt='User_picture'
                                                                    style={{ width: '45px', height: '45px' }}
                                                                    className='rounded-circle'
                                                                />
                                                                <div className='ms-3'>
                                                                    <p className='fw-bold mb-0 pt-1 pb-1'>{appoint.reservation_data.patient.first_name + " " + appoint.reservation_data.patient.last_name}</p>
                                                                    <p className='text-muted mb-0 pt-1 pb-1'>{appoint.reservation_data.patient.phone}</p>
                                                                    <p className='text-muted mb-0 pt-1 pb-1'>{appoint.reservation_data.patient.gender}</p>
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
                                                        <MDBBadge color='warning' pill>
                                                        Booked
                                                        </MDBBadge>
                                                    )
                                                    }

                                                </td>
                                                <td>{appoint.date}</td>

                                                <td>
                                                    {helpers.convertTimeTo12HourFormat(appoint.start_time)}
                                                </td>
                                                <td>
                                                {helpers.convertTimeTo12HourFormat(appoint.end_time)}
                                                </td>
                                                <td>
                                                {appoint.price}
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