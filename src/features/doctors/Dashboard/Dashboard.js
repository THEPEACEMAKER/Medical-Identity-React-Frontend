import React from 'react';
import './Dashboard.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
// import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FullHeight from "react-full-height";
import { useSelector,useDispatch } from 'react-redux';
import api from '../../../api/api';
import { doctorActions } from '../../../store/doctor/doctor-slice';
import { fetchAppointments } from '../../../store/doctor/doctor-action';




const Dashboard = () => {

    const dispatch = useDispatch();


    // const [appointment, setAppointment] = useState([]);
    let appointment = []
    const [action1, setAction1] = useState(null);
    // const [key, setKey] = useState(null)
    const pendingAppointment = appointment.filter(pa => pa.action1 === "pending");
    const todaysDate = new Date();
    const day = todaysDate.getDate();
    const month = todaysDate.getMonth();
    const year = todaysDate.getFullYear();
    const fullTodaysDate = month + 1 + "/" + day + "/" + year;
    const selectedDateAppointment = appointment.filter(appointment => appointment.details.date === fullTodaysDate);


    function convertTimeTo12HourFormat(timeStr) {
        // Create a Date object with the time string
        const dateObj = new Date(`2000-01-01T${timeStr}`);
      
        // Get the hours and minutes from the Date object
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
      
        // Determine if the time is AM or PM
        let amOrPm = hours < 12 ? "AM" : "PM";
      
        // Convert hours to 12-hour format
        if (hours > 12) {
          hours -= 12;
        } else if (hours === 0) {
          hours = 12;
        }
      
        // Pad the minutes with a leading zero if necessary
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
      
        // Construct the new time string in 12-hour format
        const time12Hour = `${hours}:${minutes} ${amOrPm}`;
      
        return time12Hour;
      }


    useEffect(() => {

        // console.log("Inside useeffect")
        // api.get("/appointment/doctor/list-all/")
        // .then((res)=> {
        //   const data = res.data
        //   console.log(data)
        //   dispatch(doctorActions.replaceApointments({
        //     data: data || [],
        //   }))
        // })

        // api.get("/appointment/doctor/list/count/status/")
        // .then((res)=> {
        //   const newData = res.data
        //   console.log("Count")
        //   console.log(newData)
        //   dispatch(doctorActions.replaceApointments({
        //     appointmentCount: newData
        //   }))
        // })




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
            }));
          })
          .catch((error) => {
            console.error(error);
          });
        
        console.log("Inside useeffect after dispatch")

      }, [dispatch]);



    // useEffect(() => {
    //     fetch("http://localhost:3500/items")
    //         .then(res => res.json())
    //         .then(data => {
    //             const fetchedData = data.reverse()
    //             setAppointment(fetchedData);
    //         });
    // }, [action1]);

    console.log("pendingAppointment")
    console.log(pendingAppointment)
    console.log(appointment)
    console.log(selectedDateAppointment)

    appointment = useSelector((state) => state.doctor.appointments)
    console.log("myAppointment")
    console.log(appointment)

    const totalCount = useSelector((state) => state.doctor.appointmentCount)
    console.log("totalCount")
    console.log(totalCount)



    return (
        <div className="dashboard">
            <Sidebar></Sidebar>
            {
                appointment[0] ?
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
                                                    {convertTimeTo12HourFormat(appoint.start_time)}
                                                </td>
                                                <td>
                                                {convertTimeTo12HourFormat(appoint.end_time)}
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