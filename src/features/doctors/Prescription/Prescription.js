import React from 'react';
import './Dashboard.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
// import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FullHeight from "react-full-height";


const Prescription = () => {


    const [appointment, setAppointment] = useState([]);
    const [action1, setAction1] = useState(null);
    // const [key, setKey] = useState(null)
    const pendingAppointment = appointment.filter(pa => pa.action1 === "pending");
    const todaysDate = new Date();
    const day = todaysDate.getDate();
    const month = todaysDate.getMonth();
    const year = todaysDate.getFullYear();
    const fullTodaysDate = month + 1 + "/" + day + "/" + year;
    const selectedDateAppointment = appointment.filter(appointment => appointment.details.date === fullTodaysDate);


    useEffect(() => {
        fetch("http://localhost:3500/items")
            .then(res => res.json())
            .then(data => {
                const fetchedData = data.reverse()
                setAppointment(fetchedData);
            });
    }, [action1]);

    console.log("pendingAppointment")
    console.log(pendingAppointment)
    console.log(appointment)
    console.log(selectedDateAppointment)

    return (
        <div className="dashboard">
            <Sidebar></Sidebar>
            {
                appointment[0] ?
                <FullHeight>
                <div className="dashboardTable">
                    <h4>Prescriptions History</h4>
                    <div className="dashboardTableDetails">
                        <div>

                            <MDBTable align='middle' hover>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Gender</th>
                                    <th scope='col'>Phone Number</th>
                                    <th scope='col'>Analysis</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>

                                    {
                                        appointment.map((appoint) => (
                                            <tr>
                                                <td>
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
                                                </td>
                                                <td>
                                                    Male
                                                </td>
                                                <td>
                                                    011326134665
                                                </td>
                                                <td>
                                                    Short brief about the patient
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

export default Prescription;