import React, { useEffect } from 'react';
import './DoctorsZone.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { TableContainer } from '@mui/material'
import FullHeight from "react-full-height";
import Sidebar from '../Sidebar/Sidebar';
import { MDBModal, MDBBtn, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBInput, MDBModalFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import api from '../../../api/api';
import { useSelector,useDispatch } from 'react-redux';
// import { doctorActions } from '../../../store/doctor/doctor-slice';



// const hours = [
//     { id: 1, label: '9:00 AM' },
//     { id: 2, label: '10:00 AM' },
//     { id: 3, label: '11:00 AM' },
//     { id: 4, label: '12:00 PM' },
//     { id: 5, label: '1:00 PM' },
//     { id: 6, label: '2:00 PM' },
//     { id: 7, label: '3:00 PM' },
//     { id: 8, label: '4:00 PM' },
//     { id: 9, label: '5:00 PM' },
//     { id: 10, label: '6:00 PM' },
//     { id: 11, label: '7:00 PM' },
//     { id: 12, label: '8:00 PM' },
//     { id: 13, label: '9:00 PM' },
//     { id: 14, label: '10:00 PM' },
//     { id: 15, label: '11:00 PM' },

//   ];

  const hours = [
    { id: 1, label: '9:00:00' },
    { id: 2, label: '10:00:00' },
    { id: 3, label: '11:00:00' },
    { id: 4, label: '12:00:00' },
    { id: 5, label: '13:00:00' },
    { id: 6, label: '14:00:00' },
    { id: 7, label: '15:00:00' },
    { id: 8, label: '16:00:00' },
    { id: 9, label: '17:00:00' },
    { id: 10, label: '18:00:00' },
    { id: 11, label: '19:00:00' },
    { id: 12, label: '20:00:00' },
    { id: 13, label: '21:00:00' },
    { id: 14, label: '22:00:00' },
    { id: 15, label: '23:00:00' },

  ];


const DoctorsZone = () => {
    const dispatch = useDispatch();



    const [initialDate, setInitialDate] = useState(new Date());
    const [appointment, setAppointment] = useState([]);
    const [action, setAction] = useState(null);
    const day = initialDate.getDate();
    const month = initialDate.getMonth();
    const year = initialDate.getFullYear();
    // const fullDate = month + 1 + "/" + day + "/" + year;    //"2023-06-29"
    const fullDate = `${year}-${month+1}-${day}`    //"2023-06-29"

    const [selectedHour, setSelectedHour] = useState(null);


    const [varyingState, setVaryingState] = useState('');
    const [varyingModal, setVaryingModal] = useState(false);
    const [price, setPrice] = useState("Enter price");
  
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
  
    // const onSetNewAppointment = () =>{
    //     api.post("/appointment/doctor/add/")
    //     .then((res)=> {
    //       const newData = res.data
    //       console.log("newData")
    //       console.log(newData)
    //     //   dispatch(doctorActions.replaceApointments({
    //     //     appointmentCount: newData
    //     //   }))
    //     })

    // }

    const tileDisabled = ({ date, view }) => {
        // Disable all dates before today
        if (date < new Date()) {
          return true;
        }
        // Disable all dates after 6 days from today
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 6);
        if (date > maxDate) {
          return true;
        }
        return false;
      };

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
        // onSetNewAppointment();
        // Do something with the form data
        if(selectedHour.label){
            let data = {
                date:fullDate,
                start_time: selectedHour.label,
                duration: 60,
                price: parseInt(event.target[0].value)
            }
    
            console.log("data inside submit")
            console.log(data)
    
            api.post("/appointment/doctor/add/",data)
            .then((res)=> {
              const newData = res.data
              console.log("newData")
              console.log(newData)
            //   dispatch(doctorActions.replaceApointments({
            //     appointmentCount: newData
            //   }))
            })
        }
 
        // setVaryingModal(!varyingModal)
    };

    const onKeyPressPrice = (event) => {
        if (event.key === '-' || event.key === 'Minus') {
          event.preventDefault();
        }
      };

    console.log("appointment")
    console.log(appointment)

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
                        tileDisabled={tileDisabled}
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
                                        setVaryingModal(!varyingModal);
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
                    <MDBModalTitle>New Appointment </MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                            {varyingModal && (
                                <MDBInput
                                value={price}
                                onChange={onChangePrice}
                                onKeyPress={onKeyPressPrice}
                                labelClass='col-form-label'
                                label='Price:'
                                type='number'
                                placeholder='Positive numbers only'
                                />
                            )}
                            </div>
                            <div className='mb-3'>
                            {varyingModal && (



                                <MDBDropdown>
                                <MDBDropdownToggle type="button">
                                {selectedHour ? selectedHour.label : 'Select an hour'}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu type="dropdown">
                                {hours.map((hour) => (
                                    <MDBDropdownItem key={hour.id} onClick={() => handleHourSelect(hour)}>
                                    {hour.label}
                                    </MDBDropdownItem>
                                ))}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            )}
                            </div>
                            <MDBModalFooter>
                            <MDBBtn type="button" color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
                                Close
                            </MDBBtn>
                            <MDBBtn >Set Appointment</MDBBtn>
                            </MDBModalFooter>
                        </form>

                    </MDBModalBody>

                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
        
    );
};

export default DoctorsZone;