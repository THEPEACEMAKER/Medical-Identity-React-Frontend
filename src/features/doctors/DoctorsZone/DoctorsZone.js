import React, { useEffect } from 'react';
import './DoctorsZone.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
// import { TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@material-ui/core'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material'
// import { makeStyles } from '@mui/styles';
import FullHeight from "react-full-height";
import Sidebar from '../Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBModal, MDBBtn, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBInput, MDBModalFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';


const hours = [
    { id: 1, label: '9:00 AM' },
    { id: 2, label: '10:00 AM' },
    { id: 3, label: '11:00 AM' },
    { id: 4, label: '12:00 PM' },
    { id: 5, label: '1:00 PM' },
    { id: 6, label: '2:00 PM' },
    { id: 7, label: '3:00 PM' },
    { id: 8, label: '4:00 PM' },
    { id: 9, label: '5:00 PM' },
    { id: 10, label: '6:00 PM' },
    { id: 11, label: '7:00 PM' },
    { id: 12, label: '8:00 PM' },
    { id: 13, label: '9:00 PM' },
    { id: 14, label: '10:00 PM' },
    { id: 15, label: '11:00 PM' },

  ];

const DoctorsZone = () => {


    const [isAnimating, setIsAnimating] = useState(false);
    const [initialDate, setInitialDate] = useState(new Date());
    const [appointment, setAppointment] = useState([]);
    const [key, setKey] = useState(null);
    const [action, setAction] = useState(null);
    // const classes = useStyles();
    const day = initialDate.getDate();
    const month = initialDate.getMonth();
    const year = initialDate.getFullYear();
    const fullDate = month + 1 + "/" + day + "/" + year;

    const [selectedHour, setSelectedHour] = useState(null);


    const [varyingState, setVaryingState] = useState('');
    const [varyingModal, setVaryingModal] = useState(false);
    const [price, setPrice] = useState("Enter price");
  
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
  

    // const handleChange = (event) => {
    //     let action = event.target.value;
    //     const actions = { action: action, key };
    //     fetch("https://guarded-anchorage-08361.herokuapp.com/modifyActionByKey", {
    //         method: "post",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(actions)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setAction(data);
    //             console.log(data);
    //         })
    // }

    useEffect(() => {
        fetch("http://localhost:3500/items")
            .then(res => res.json())
            .then(data => {
                const fetchedData = data.reverse();
                setAppointment(fetchedData);
            })
    }, [action]);

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // This line prevents the default form submission
        // Do something with the form data
    };

    console.log("appointment")
    console.log(appointment)

    const selectedDateAppointment = appointment.filter(appointment => appointment.details.date === fullDate);

    return (
        <div className="doctorsZone">
            <Sidebar></Sidebar>
            <div className="zoneAppointment">
            <h4>Appointment</h4>
                <div>
                    
                    <Calendar
                        className="calender"
                        selected={initialDate}
                        onChange={date => setInitialDate(date)}
                    >
                    </Calendar>
                </div>
                {
                    appointment[0] ?
                        <FullHeight>
                            <div className="appointmentTable">
                                <div className="tableHeading">
                                    <p>Appointment</p>
                                    <MDBBtn
                                        onClick={() => {
                                        // setVaryingState('@mdo');
                                        setVaryingModal(!varyingModal);
                                        // setVaryingRecipient('@mdo');
                                        }}
                                    >
                                        Add
                                    </MDBBtn>
                                    <p>{fullDate}</p>
                                </div>
                                <TableContainer >
                                    {/* <Table >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Name</TableCell>
                                                <TableCell align="center">Schedule</TableCell>
                                                <TableCell align="right">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                selectedDateAppointment.map((appointment) => (
                                                    <TableRow key={appointment._id}>
                                                        <TableCell align="left">
                                                            {appointment.details.name}
                                                        </TableCell>
                                                        <TableCell align="center">{appointment.details.time}</TableCell>
                                                        <TableCell onMouseOver={() => setKey(appointment.key)} align="right">
                                                            <Select
                                                                style={{ color: "white" }}
                                                                className="actionSelect"
                                                                value={appointment.action}
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem value={"notVisited"}>Not Visited</MenuItem>
                                                                <MenuItem value={"visited"}>Visited</MenuItem>
                                                            </Select>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table> */}
                                </TableContainer>
                            </div>
                        </FullHeight> :
                        <div style={{ margin: "400px 200px" }} className="spinner-border text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                }
            </div>


            <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle>New message to {varyingState}</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                            {varyingModal && (
                                <MDBInput
                                value={price}
                                onChange={onChangePrice}
                                labelClass='col-form-label'
                                label='Price:'
                                type='number'
                                />
                            )}
                            </div>
                            <div className='mb-3'>
                            {varyingModal && (
                                <MDBDropdown>
                                <MDBDropdownToggle>
                                {selectedHour ? selectedHour.label : 'Select an hour'}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                {hours.map((hour) => (
                                    <MDBDropdownItem key={hour.id} onClick={() => handleHourSelect(hour)}>
                                    {hour.label}
                                    </MDBDropdownItem>
                                ))}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            )}
                            </div>
                        </form>

                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
                        Close
                    </MDBBtn>
                    <MDBBtn>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>



        </div>
        
    );
};

export default DoctorsZone;