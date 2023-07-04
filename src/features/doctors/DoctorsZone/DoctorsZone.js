import React, { useEffect } from "react";
import "./DoctorsZone.css";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { TableContainer } from "@mui/material";
import FullHeight from "react-full-height";
import Sidebar from "../Sidebar/Sidebar";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBBtn,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import api from "../../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { helpers } from "../../utils/helpers";
import HourDropdown from "./Layout/HourDropdown";

const DoctorsZone = () => {
  const dispatch = useDispatch();

  let appointment = [];
  let todaysAppointment = [];

  // const [appointment, setAppointment] = useState([]);
  // const [todaysAppointment, setTodaysAppointment] = useState([]);

  const [initialDate, setInitialDate] = useState(new Date());
  const [action, setAction] = useState(null);
  const [next, setNext] = useState(0);
  const [previous, setPrevious] = useState(0);

  const [skip, setSkip] = useState(1);
  const [limit, setPLimit] = useState(2);

  const day = initialDate.getDate();
  const month = initialDate.getMonth();
  const year = initialDate.getFullYear();
  const fullDate = `${year}-${month + 1}-${day}`; //"2023-06-29"

  const [selectedHour, setSelectedHour] = useState("");

  const [varyingState, setVaryingState] = useState("");
  const [varyingModal, setVaryingModal] = useState(false);
  const [price, setPrice] = useState("Enter price");

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const tileDisabled = ({ date, view }) => {
    // Disable all dates before today (excluding today)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    if (date < today) {
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

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // This line prevents the default form submission

    if (selectedHour.label !== null) {
      let data = {
        date: fullDate,
        start_time: selectedHour.label,
        duration: 60,
        price: parseInt(event.target[0].value),
      };

      api
        .post("/appointment/doctor/add/", data)
        .then((res) => {
          const newData = res.data;
          console.log("res");
          console.log(res.status);
          setVaryingModal(!varyingModal);
          setPrice("Enter price");
          setSelectedHour("");

          helpers.fetchDoctorData(dispatch);
        })
        .catch((error) => {
          console.log("inside error");
          alert("Error: Missing data");
        });
    }
  };

  const onKeyPressPrice = (event) => {
    if (event.key === "-" || event.key === "Minus") {
      event.preventDefault();
    }
  };

  // useEffect(()=> {

  // },[])

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    const formattedMonth = parseInt(month, 10) < 10 ? `0${month}` : month;
    const formattedDay = parseInt(day, 10) < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  appointment = useSelector((state) => state.doctor.availableAppointments);

  // setAppointment(useSelector((state) => state.doctor.availableAppointments))

  todaysAppointment = appointment.filter(
    (appointment) => appointment.date === formatDate(fullDate)
  ); //formatDate(fullDate));

  // setTodaysAppointment(appointment.filter((appointment) => appointment.date === "2023-06-30" ))

  const isLoading = useSelector((state) => state.doctor.isLoading);

  console.log("todaysAppointment");
  console.log(todaysAppointment);

  console.log("appointment 1");
  console.log(appointment);

  let upperLimit = 0;
  let lowerLimit = appointment.length;

  const nextPage = () => {
    // sessionStorage.setItem('urlValue', next);
    // dispatch(productActions.replaceProducts({ isLoading: true }))
    // dispatch(fetchProducts(next))
    if (skip * limit <= appointment.length) {
      setSkip(skip + 1);
    }

    upperLimit =
      skip * limit >= appointment.length ? appointment.length : skip * limit;
    lowerLimit = skip * limit - limit <= 0 ? 0 : skip * limit - limit;

    // todaysAppointment = todaysAppointment.slice(((skip*limit)-limit),(skip*limit))
    todaysAppointment = todaysAppointment.slice(lowerLimit, upperLimit);

    console.log("todaysAppointment in next");
    console.log(todaysAppointment);

    console.log(skip);
    // console.log(((skip*limit)-2))
    // console.log((skip*limit))
    console.log(upperLimit);
    console.log(lowerLimit);
  };

  const prevPage = () => {
    // sessionStorage.setItem('urlValue', previous);
    // dispatch(productActions.replaceProducts({ isLoading: true }))
    // dispatch(fetchProducts(previous))
    setPrevious(previous + 1);
    console.log(previous);
  };

  function handleDeleteRecord(recordId) {
    console.log(recordId);

    api.delete(`appointment/doctor/delete/${recordId}/`).then((res) => {
      const newData = res.data;
      console.log("delete res");
      console.log(res);
      helpers.fetchDoctorData(dispatch);
    });
  }

  return (
    <div className="doctorsZone">
      <Sidebar></Sidebar>
      <div className="zoneAppointment">
        <h4>Appointment</h4>
        <div>
          <Calendar
            className="calender"
            selected={initialDate}
            onChange={(date) => setInitialDate(date)}
            tileDisabled={tileDisabled}
          ></Calendar>
        </div>
        {!isLoading ? (
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
              <TableContainer>
                <MDBTable striped hover>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Session Start</th>
                      <th scope="col">Session End</th>
                      <th scope="col">Price</th>
                      {/* <th scope="col">Date</th> */}
                      <th scope="col">Delete</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {todaysAppointment.map((appoint) => (
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          {helpers.convertTimeTo12HourFormat(
                            appoint.start_time
                          )}
                        </td>
                        <td>
                          {helpers.convertTimeTo12HourFormat(appoint.end_time)}
                        </td>
                        <td>{appoint.price}</td>
                        {/* <td>{appoint.date}</td> */}
                        <td>
                          <MDBBtn
                            type="button"
                            rounded
                            className="mx-2"
                            color="danger"
                            onClick={() => handleDeleteRecord(appoint.id)}
                          >
                            Delete
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>

                <div className="d-flex justify-content-center">
                  <button
                    onClick={prevPage}
                    class="opacity-50 cursor-default items-center px-4 py-2 text-sm font-medium text-black bg-gray-800 rounded-l dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 mr-2"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="text-black hover:text-white">Prev</span>
                  </button>
                  <button
                    onClick={nextPage}
                    class="opacity-50 cursor-default items-center px-4 py-2 text-sm font-medium text-black bg-gray-800 border-0 border-l border-gray-700 rounded-r dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="text-black hover:text-white">Next</span>
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 ml-2"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </TableContainer>
            </div>
          </FullHeight>
        ) : (
          <div
            style={{ margin: "400px 200px" }}
            className="spinner-border text-success"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>New Appointment </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVaryingModal(!varyingModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  {varyingModal && (
                    <MDBInput
                      value={price}
                      onChange={onChangePrice}
                      onKeyPress={onKeyPressPrice}
                      labelClass="col-form-label"
                      label="Price:"
                      type="number"
                      placeholder="Positive numbers only"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {varyingModal && (
                    <HourDropdown
                      selectedHour={selectedHour}
                      handleHourSelect={handleHourSelect}
                      fullDate={fullDate}
                    />
                  )}
                </div>
                <MDBModalFooter>
                  <MDBBtn
                    type="button"
                    color="secondary"
                    onClick={() => setVaryingModal(!varyingModal)}
                  >
                    Close
                  </MDBBtn>
                  <MDBBtn>Set Appointment</MDBBtn>
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
