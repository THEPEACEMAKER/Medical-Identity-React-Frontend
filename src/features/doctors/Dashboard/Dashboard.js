import React from "react";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  MDBModal,
  MDBInput,
  MDBTextArea,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import FullHeight from "react-full-height";
import { useSelector, useDispatch } from "react-redux";
import { helpers } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import StartSessionBtn from "./layout/StartSessionBtn";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAll, setIsAll] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isResrved, setIsReserved] = useState(false)

  console.log("isAll, isAvailable, isResrved")
  console.log(isAll, isAvailable, isResrved)

  const [appointment, setAppointment] = useState([]);

  // let appointment = undefined

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [notAll, setNotAll] = useState(true);

  console.log("notAll")
  console.log(notAll)

  const next = useSelector((state) => state.doctor.next)
  const previous = useSelector((state) => state.doctor.previous)

  console.log("next and previous")
  console.log(next)
  console.log(previous)

  const getAllAppointment = useSelector((state) => state.doctor.appointments);
  const availableAppointments = useSelector(
    (state) => state.doctor.availableAppointments
  );
  const reservedAppointments = useSelector(
    (state) => state.doctor.reservedAppointment
  );

  console.log("reserced in dashboard")
  console.log(reservedAppointments)

  console.log("Dashboard appointment");
  console.log(appointment);

  const totalCount = useSelector((state) => state.doctor.appointmentCount);
  const isLoading = useSelector((state) => state.doctor.isLoading);


  useEffect(() => {

    if (!notAll) setNotAll(true);

    if (isAll) {
      setAppointment(getAllAppointment);
      console.log("in IsAll")

    }
    
    if (notAll) {
      helpers.fetchDoctorData(dispatch);

      console.log("inside useEfect notAll");
    }
    setNotAll(false);
    setIsAll(true)
  }, [dispatch, getAllAppointment, notAll]);


  useEffect(()=>{
    if(isResrved){
      setAppointment(reservedAppointments);
      console.log("inside is reserved in next")
    }

  }, [reservedAppointments])


  useEffect(()=>{
    if(isAvailable){
      setAppointment(availableAppointments);
      console.log("inside is reserved in next")
    }

  }, [availableAppointments])


  function allAppointment() {

    helpers.fetchDoctorData(dispatch);
    setAppointment(getAllAppointment);
    setIsAll(true)
    setIsReserved(false)
    setIsAvailable(false)
  }

  function availableAppointment() {

    helpers.fetchAvailableDoctorData(dispatch)
    setAppointment(availableAppointments);
    setIsAll(false)
    setIsReserved(false)
    setIsAvailable(true)
  }

  function reservedAppointment() {
    // helpers.fetchDoctorData(dispatch);

    helpers.fetchReservedDoctorData(dispatch)
    setAppointment(reservedAppointments);
    setIsAll(false)
    setIsAvailable(false)
    setIsReserved(true)
  }

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (appoint) => {
    setBasicModal(!basicModal);

    console.log("inside toggle");
    console.log(appoint);

    setSelectedAppointment(appoint);
    setInputValue("");
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendingCode = async () => {
    console.log("send code");
    console.log(inputValue);

    const patientId = selectedAppointment.reservation_data.patient.id;
    const appointmentId = selectedAppointment.id;

    console.log(patientId, appointmentId);

    console.log(selectedAppointment);

    const result = await helpers.sendMedicalCode(
      inputValue,
      patientId,
      appointmentId
    );
    console.log("result");
    console.log(result);

    console.log("returnM");

    if (result === 200) {
      navigate(
        `/medicalHistory/patient/${patientId}/appointment/${appointmentId}/code/${inputValue}/`
      );
    }
  };



  const nextPage = () => {

    console.log("inside next")

    if(isResrved){

      helpers.fetchReservedDoctorData(dispatch, next)

    }else if (isAll){
      helpers.fetchDoctorData(dispatch, next);
      console.log("inside is all")

    }else if (isAvailable){

      helpers.fetchAvailableDoctorData(dispatch, next)
      console.log("inside is available")

    }

  };

  const prevPage = () => {

    console.log("inside prev")

    if(isResrved){
      helpers.fetchReservedDoctorData(dispatch, previous)
      console.log("inside is reserved")

    }else if (isAll){
      helpers.fetchDoctorData(dispatch, previous);
      console.log("inside is all")

    }else if (isAvailable){
      helpers.fetchAvailableDoctorData(dispatch, previous)
      console.log("inside is available")
  
    }
  };


  // const check = []
  console.log("inputValue");
  console.log(inputValue);

  console.log("appointment");
  console.log(appointment);

  return (
    <div className="dashboard">
      <Sidebar></Sidebar>
      {!isLoading || appointment !== undefined && totalCount ? (
        <FullHeight>
          <div className="dashboardTable">
            <h4>Dashboard</h4>
            <div className="dashboardHeading">
              <div
                className="my-All-Appointment-component"
                onClick={allAppointment}
              >
                <h1>{totalCount.total}</h1>
                <p>
                  All
                  <br />
                  Appointments
                </p>
              </div>
              <div
                className="my-available-Appointment-component"
                onClick={availableAppointment}
              >
                <h1>{totalCount.Available}</h1>
                <p>
                  Available
                  <br />
                  Appointments
                </p>
              </div>
              <div
                className="my-reserved-Appointment-component"
                onClick={reservedAppointment}
              >
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
                <MDBTable align="middle" hover>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Session Start </th>
                      <th scope="col">Session End</th>
                      <th scope="col">Price</th>
                      <th scope="col">Start Session</th>
                    </tr>
                  </MDBTableHead>

                  {
                    appointment  ?  
                    
                    <MDBTableBody>
                    {appointment.map((appoint) => (
                      <tr>
                        <td>
                          {appoint.status === "A" ? (
                            <p>Not Booked yet</p>
                          ) : (
                            <div className="d-flex align-items-center">
                              <img
                                src={`${process.env.REACT_APP_IMGE_API_URL}/${appoint.reservation_data.patient.profileImgUrl}`}
                                alt="User_picture"
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle"
                              />
                              <div className="ms-3">
                                <p className="fw-bold mb-0 pt-1 pb-1">
                                  {appoint.reservation_data.patient.first_name +
                                    " " +
                                    appoint.reservation_data.patient.last_name}
                                </p>
                                <p className="text-muted mb-0 pt-1 pb-1">
                                  {appoint.reservation_data.patient.phone}
                                </p>
                                <p className="text-muted mb-0 pt-1 pb-1">
                                  {appoint.reservation_data.patient.gender}
                                </p>
                              </div>
                            </div>
                          )}
                        </td>
                        <td>
                          {appoint.status === "A" ? (
                            <MDBBadge color="success" pill>
                              Available
                            </MDBBadge>
                          ) : (
                            <MDBBadge color="warning" pill>
                              Booked
                            </MDBBadge>
                          )}
                        </td>
                        <td>{appoint.date}</td>

                        <td>
                          {helpers.convertTimeTo12HourFormat(
                            appoint.start_time
                          )}
                        </td>
                        <td>
                          {helpers.convertTimeTo12HourFormat(appoint.end_time)}
                        </td>
                        <td>{appoint.price}</td>
                        <td>
                          <StartSessionBtn
                            appointment={appoint}
                            toggleShow={toggleShow}
                          />
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                    : 
                    <span></span>
                  }
                </MDBTable>
              </div>

              <div className="d-flex justify-content-center">
                    <button
                      disabled={previous === null}
                      onClick={prevPage}
                      className={`items-center px-4 py-2 text-sm font-medium text-black bg-gray-800 rounded-l dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                        previous === null ? "opacity-50 cursor-default" : "hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2"
                        fill="black"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-black hover:text-white">Prev</span>
                    </button>

                  <button
                    disabled={next === null}
                    onClick={nextPage}
                    className={`items-center px-4 py-2 text-sm font-medium text-black bg-gray-800 border-0 border-l border-gray-700 rounded-r dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                      next === null ? "opacity-50 cursor-default" : "hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="text-black hover:text-white">Next</span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 ml-2"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>

              </div>

            </div>
          </div>
        </FullHeight>
      ) : (
        <FullHeight>
          <div style={{ margin: "350px 550px", display: "flex" }}>
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </FullHeight>
      )}

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Enter medical Code</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Enter code:"
                id="inputField"
                value={inputValue}
                onChange={handleInputChange}
              />
              {/* <MDBTextArea label='Enter description:' id='textareaField' value={inputValue} onChange={handleInputChange} /> */}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSendingCode}>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Dashboard;
