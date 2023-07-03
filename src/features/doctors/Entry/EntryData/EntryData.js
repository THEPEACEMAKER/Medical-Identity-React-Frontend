import FullHeight from "react-full-height";
import { helpers } from "../../../utils/helpers";
import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBCardText,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalFooter,
  MDBModalTitle,
  MDBModalHeader,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicalHistory } from "./MedicalHistorySlice";
import { useParams } from "react-router-dom";
import EntrySubbmit from "../EntrySubbmit/EntrySubbmit";

const EntryData = () => {
  const { patientId, appointmentId, code } = useParams();
  const dispatch = useDispatch();
  const { appointments, status, error, totalEntriesCount } = useSelector(
    (state) => state.medicalHistory
  );
  const { isDoctor, isPatient } = useSelector((state) => state.auth);

  const [centredModal, setCentredModal] = useState(false);
  const [centredModalDoctor, setCentredModalDoctor] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [selectedDoctors, setSelectedDoctors] = useState(null);

  const doctor = JSON.parse(localStorage.getItem("user"));
  console.log(doctor);

  const isLoading = false;
  // const toggleShowPatient = () => setCentredModal(!centredModal);
  const toggleShowPatient = (appoint) => {
    if (appoint !== null) {
      setSelectedAppointment(appoint);
    }
    setCentredModal(!centredModal);
  };

  // const toggleShowDoctor = () => setCentredModalDoctor(!centredModalDoctor);
  const toggleShowDoctor = (appoint) => {
    if (appoint !== null) {
      setSelectedDoctors(appoint);
    }
    setCentredModalDoctor(!centredModalDoctor);
  };

  useEffect(() => {
    dispatch(
      fetchMedicalHistory({
        isDoctor,
        isPatient,
        patientId,
        appointmentId,
        code,
        pageSize: 1,
        page: 1,
      })
    );
  }, [appointmentId, code, dispatch, isPatient, patientId]);

  if (status === "loading") {
    return (
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
    );
  }

  // Handle error state
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="dashboard">
        {/* <Sidebar></Sidebar> */}
        <FullHeight>
          <div className="dashboardTable">
            <h4>Medical Records</h4>
            <div className="dashboardHeading">
              <div className="my-All-Appointment-component">
                {/* <h1>{totalCount.total}</h1> */}
                <p>
                  All
                  <br />
                  Records
                </p>
              </div>
              <div className="my-available-Appointment-component">
                {/* <h1>{totalCount.Available}</h1> */}
                <p>
                  {doctor.specialization}
                  <br />
                  Records
                </p>
              </div>
            </div>
            <div className="dashboardTableDetails">
              <div>
                <p>Records</p>
                <MDBTable align="middle" hover>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Dicipline</th>
                      <th scope="col">Doctor Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Detailed History </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {appointments &&
                      appointments.map((appoint) => (
                        <tr key={appoint.id}>
                          <td>
                            {
                              <p className="fw-bold mb-0 pt-1 pb-1">
                                {appoint.doctor.specialization}
                              </p>
                            }
                          </td>
                          <td>
                            <MDBBtn onClick={() => toggleShowDoctor(appoint)}>
                              {
                                <p className="fw-bold mb-0 pt-1 pb-1">
                                  {appoint.doctor.first_name +
                                    " " +
                                    appoint.doctor.last_name}
                                </p>
                              }
                            </MDBBtn>
                            {/* {
                                                        <p className='fw-bold mb-0 pt-1 pb-1'>{appoint.doctor.first_name + " " + appoint.doctor.last_name}</p>
                                                    } */}
                          </td>

                          <td>{helpers.formatLongDate(appoint.created_at)}</td>

                          <td>
                            <MDBBtn onClick={() => toggleShowPatient(appoint)}>
                              Medical Record
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>
        </FullHeight>

        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => toggleShowPatient(null)}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {/* <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p> */}

                {selectedAppointment && (
                  <div>
                    <p>
                      <strong>Medical Analysis:</strong>
                    </p>
                    <span>{selectedAppointment.comment}</span>

                    <p>
                      <strong>Prescription:</strong>
                    </p>
                    <span>{selectedAppointment.prescription_image}</span>

                    <p>
                      <strong>Radiology:</strong>
                    </p>
                    <span>{selectedAppointment.analysis_image}</span>
                  </div>
                )}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  onClick={() => toggleShowPatient(null)}
                >
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        {/* Doctor model */}
        <MDBModal
          tabIndex="-1"
          show={centredModalDoctor}
          setShow={setCentredModalDoctor}
        >
          <MDBContainer className="container py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="12" xl="4">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="text-center">
                    {selectedDoctors && (
                      <>
                        <div className="mt-3 mb-4">
                          {/* <MDBCardImage src={`${process.env.REACT_APP_IMGE_API_URL}/${selectedDoctors.doctor.profileImgUrl}`}
                                        className="rounded-circle" fluid style={{ width: '100px' }} /> */}
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                            className="rounded-circle"
                            fluid
                            style={{ width: "100px" }}
                          />
                        </div>
                        <MDBTypography tag="h4">
                          {selectedDoctors.doctor.first_name +
                            " " +
                            selectedDoctors.doctor.last_name}
                        </MDBTypography>
                        <MDBCardText className="text-muted mb-4">
                          {selectedDoctors.doctor.specialization}{" "}
                          <span className="mx-2">|</span>{" "}
                          <a href="#!">{selectedDoctors.doctor.email}</a>
                        </MDBCardText>
                      </>
                    )}
                  </MDBCardBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color="secondary"
                      onClick={() => toggleShowDoctor(null)}
                    >
                      Close
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBModal>
      </div>

      {isDoctor && <EntrySubbmit code={code} />}
    </>
  );
};

export default EntryData;
