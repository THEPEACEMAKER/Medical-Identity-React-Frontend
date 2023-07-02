import FullHeight from "react-full-height";
import { helpers } from '../../../utils/helpers';
import { useState } from 'react';
import {MDBContainer, MDBRow,MDBCol,MDBCard, MDBCardBody, MDBCardImage,MDBTypography,MDBIcon,   MDBCardText, MDBBadge,MDBModal,MDBModalDialog,MDBModalContent, MDBModalBody, MDBModalFooter, MDBModalTitle, MDBModalHeader,  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


const appointment = [
     
    {
      "id": 3,
      "comment": "Medical comment for patient 3",
      "prescription_image": "Prescription for patient 3",
      "analysis_image": "Radiology for patient 3",
      "patient": {
        "id": 3,
        "first_name": "Alice",
        "last_name": "Smith",
        "date_of_birth": "1975-01-01",
        "phone": "555-9012",
        "gender": "Female",
        "profileImgUrl": "image/upload/v1688154577/alicesmith.png"
      },
      "doctor": {
        "id": 2,
        "specialization": "Internal medicine",
        "city": "Cairo",
        "district": "15 May",
        "first_name": "omar",
        "last_name": "amgad",
        "email": "omar@gmail.com",
        "date_of_birth": "1990-12-12",
        "phone": "01033022410",
        "national_id": "29510010402099",
        "profileImgUrl": "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
        "gender": "male",
        "profLicenseNo": "221133",
        "address": "street 9"
      },
      "created_at": "2023-07-03T10:00:00.000000Z",
      "updated_at": "2023-07-03T10:00:00.000000Z"
    },
    {
      "id": 4,
      "comment": "Medical comment for patient 4",
      "prescription_image": null,
      "analysis_image": null,
      "patient": {
        "id": 4,
        "first_name": "Bob",
        "last_name": "Johnson",
        "date_of_birth": "1990-01-01",
        "phone": "555-2345",
        "gender": "Male",
        "profileImgUrl": "image/upload/v1688154577/bobjohnson.png"
      },
      "doctor": {
        "id": 2,
        "specialization": "Internal medicine",
        "city": "Cairo",
        "district": "15 May",
        "first_name": "islam",
        "last_name": "Sulaiman",
        "email": "omar@gmail.com",
        "date_of_birth": "1990-12-12",
        "phone": "01033022410",
        "national_id": "29510010402099",
        "profileImgUrl": "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
        "gender": "male",
        "profLicenseNo": "221133",
        "address": "street 9"
      },
      "created_at": "2023-07-03T11:00:00.000000Z",
      "updated_at": "2023-07-03T11:00:00.000000Z"
    },
    {
      "id": 5,
      "comment": "Medical comment for patient 5",
      "prescription_image": null,
      "analysis_image": null,
      "patient": {
        "id": 5,
        "first_name": "Mary",
        "last_name": "Brown",
        "date_of_birth": "1982-01-01",
        "phone": "555-3456",
        "gender": "Female",
        "profileImgUrl": "image/upload/v1688154577/marybrown.png"
      },
      "doctor": {
        "id": 2,
        "specialization": "Internal medicine",
        "city": "Cairo",
        "district": "15 May",
        "first_name": "dar4",
        "last_name": "7oda",
        "email": "omar@gmail.com",
        "date_of_birth": "1990-12-12",
        "phone": "01033022410",
        "national_id": "29510010402099",
        "profileImgUrl": "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
        "gender": "male",
        "profLicenseNo": "221133",
        "address": "street 9"
      },
      "created_at": "2023-07-04T12:00:00.000000Z",
      "updated_at": "2023-07-04T12:00:00.000000Z"
    },
    {
      "id": 6,
      "comment": "Medical comment for patient 6",
      "prescription_image": null,
      "analysis_image": null,
      "patient": {
        "id": 6,
        "first_name": "David",
        "last_name": "Lee",
        "date_of_birth": "1995-01-01",
        "phone": "555-6789",
        "gender": "Male",
        "profileImgUrl": "image/upload/v1688154577/davidlee.png"
      },
      "doctor": {
        "id": 2,
        "specialization": "Internal medicine",
        "city": "Cairo",
        "district": "15 May",
        "first_name": "mo",
        "last_name": "sala7",
        "email": "omar@gmail.com",
        "date_of_birth": "1990-12-12",
        "phone": "01033022410",
        "national_id": "29510010402099",
        "profileImgUrl": "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
        "gender": "male",
        "profLicenseNo": "221133",
        "address": "street 9"
      },
      "created_at": "2023-09-04T13:00:00.000000Z",
      "updated_at": "2023-07-04T13:00:00.000000Z"
    },
    {
        "id": 6,
        "comment": "Medical comment for patient 6",
        "prescription_image": null,
        "analysis_image": null,
        "patient": {
          "id": 6,
          "first_name": "David",
          "last_name": "Lee",
          "date_of_birth": "1995-01-01",
          "phone": "555-6789",
          "gender": "Male",
          "profileImgUrl": "image/upload/v1688154577/davidlee.png"
        },
        "doctor": {
          "id": 2,
          "specialization": "Internal medicine",
          "city": "Cairo",
          "district": "15 May",
          "first_name": "Adel",
          "last_name": "elmogadel",
          "email": "omar@gmail.com",
          "date_of_birth": "1990-12-12",
          "phone": "01033022410",
          "national_id": "29510010402099",
          "profileImgUrl": "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
          "gender": "male",
          "profLicenseNo": "221133",
          "address": "street 9"
        },
        "created_at": "2023-09-04T13:00:00.000000Z",
        "updated_at": "2023-07-04T13:00:00.000000Z"
      }
  ]


const EntryData = () => {

    const [centredModal, setCentredModal] = useState(false);
    const [centredModalDoctor, setCentredModalDoctor] = useState(false)

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [selectedDoctors, setSelectedDoctors] = useState(null);

    const doctor = JSON.parse(localStorage.getItem("user"))
    console.log(doctor)

    const isLoading = false;
    // const toggleShowPatient = () => setCentredModal(!centredModal);
    const toggleShowPatient = (appoint) => {
        if(appoint !== null){
            setSelectedAppointment(appoint);
        }
        setCentredModal(!centredModal);
    };
    
    // const toggleShowDoctor = () => setCentredModalDoctor(!centredModalDoctor);
    const toggleShowDoctor = (appoint) => {
        if(appoint !== null){
            setSelectedDoctors(appoint);
        }
        setCentredModalDoctor(!centredModalDoctor);
    }

    return(
        <div className="dashboard">
            {/* <Sidebar></Sidebar> */}
            {
                !isLoading ?
                <FullHeight>
                <div className="dashboardTable">
                    <h4>Medical Records</h4>
                    <div className="dashboardHeading">
                        <div
                              className="my-All-Appointment-component"
                              >
                            {/* <h1>{totalCount.total}</h1> */}
                            <p>
                                All
                            <br />
                            Records
                            </p>
                        </div>
                        <div 
                            className="my-available-Appointment-component"
                            >
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
                            <MDBTable align='middle' hover>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Dicipline</th>
                                        <th scope='col'>Doctor Name</th>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Detailed History </th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>

                                    {
                                        appointment.map((appoint) => (
                                            <tr>
                                                <td>{
                                                        <p className='fw-bold mb-0 pt-1 pb-1'>{appoint.doctor.specialization}</p>
                                                    }
                                                </td>
                                                <td>
                                                    <MDBBtn onClick={() => toggleShowDoctor(appoint)}>
                                                        {
                                                            <p className='fw-bold mb-0 pt-1 pb-1'>{appoint.doctor.first_name + " " + appoint.doctor.last_name}</p>
                                                        }
                                                        
                                                        </MDBBtn>
                                                    {/* {
                                                        <p className='fw-bold mb-0 pt-1 pb-1'>{appoint.doctor.first_name + " " + appoint.doctor.last_name}</p>
                                                    } */}
                                                </td>

                                                <td>{helpers.formatLongDate(appoint.created_at)}</td>

                                                <td>
                                                    <MDBBtn onClick={() => toggleShowPatient(appoint)}>Medical Record</MDBBtn>
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
            </FullHeight>            
            }

            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Modal title</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => toggleShowPatient(null)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        {/* <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p> */}

                        {
                            selectedAppointment &&
                            <div>
                                <p><strong>Medical Analysis:</strong></p>
                                <span>{selectedAppointment.comment }</span>

                                <p><strong>Prescription:</strong></p>
                                <span>{selectedAppointment.prescription_image }</span>

                                <p><strong>Radiology:</strong></p>
                                <span>{selectedAppointment.analysis_image }</span>
                            </div>
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => toggleShowPatient(null)}>
                        Close
                        </MDBBtn>
                    </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


            {/* Doctor model */}
            <MDBModal tabIndex='-1' show={centredModalDoctor} setShow={setCentredModalDoctor}>
                <MDBContainer className="container py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="12" xl="4">
                        <MDBCard style={{ borderRadius: '15px' }}>
                        <MDBCardBody className="text-center">

                            {
                                selectedDoctors &&
                                <>
                                <div className="mt-3 mb-4">
                                    {/* <MDBCardImage src={`${process.env.REACT_APP_IMGE_API_URL}/${selectedDoctors.doctor.profileImgUrl}`}
                                        className="rounded-circle" fluid style={{ width: '100px' }} /> */}
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle" fluid style={{ width: '100px' }} />
                                </div>
                                <MDBTypography tag="h4">{selectedDoctors.doctor.first_name + " " + selectedDoctors.doctor.last_name}</MDBTypography>
                                <MDBCardText className="text-muted mb-4">
                                {selectedDoctors.doctor.specialization} <span className="mx-2">|</span> <a href="#!">{selectedDoctors.doctor.email}</a>
                                </MDBCardText>
                                </>

                            }


                        </MDBCardBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={()=>toggleShowDoctor(null)}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                        </MDBCard>
                    </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </MDBModal>


    
        </div>
    )
}

export default EntryData