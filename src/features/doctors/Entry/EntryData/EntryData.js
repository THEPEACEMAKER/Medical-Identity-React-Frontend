import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FullHeight from "react-full-height";

const appointment = [
    {
      "id": 1,
      "comment": "Medical comment for patient 1",
      "prescription_image": null,
      "analysis_image": null,
      "patient": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "date_of_birth": "1980-01-01",
        "phone": "555-1234",
        "gender": "Male",
        "profileImgUrl": "image/upload/v1688154577/johndoe.png"
      },
      "doctor": {
        "id": 2,
        "specialization": "Internal medicine ",
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
      "created_at": "2023-07-02T08:00:00.000000Z",
      "updated_at": "2023-07-02T08:00:00.000000Z"
    },
    {
      "id": 2,
      "comment": "Medical comment for patient 2",
      "prescription_image": null,
      "analysis_image": null,
      "patient": {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "date_of_birth": "1985-01-01",
        "phone": "555-5678",
        "gender": "Female",
        "profileImgUrl": "image/upload/v1688154577/janedoe.png"
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
      "created_at": "2023-07-02T09:00:00.000000Z",
      "updated_at": "2023-07-02T09:00:00.000000Z"
    },
    {
      "id": 3,
      "comment": "Medical comment for patient 3",
      "prescription_image": null,
      "analysis_image": null,
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
      "created_at": "2023-07-04T13:00:00.000000Z",
      "updated_at": "2023-07-04T13:00:00.000000Z"
    }
  ]


const EntryData = () => {

    const doctor = JSON.parse(localStorage.getItem("user"))
    console.log(doctor)

    const isLoading = false;

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
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Session Start </th>
                                    <th scope='col'>Session End</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Start Session</th>
                                    </tr>
                                </MDBTableHead>
                                {/* <MDBTableBody>

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
                                                <td>
                                                    <MDBBtn disabled={appoint.status === "A"} type='button' className='me-1' color='success'>
                                                        Start
                                                    </MDBBtn>
                                                </td>
                                            </tr>

                                        ))
                                    }

                                </MDBTableBody> */}
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
    )
}

export default EntryData