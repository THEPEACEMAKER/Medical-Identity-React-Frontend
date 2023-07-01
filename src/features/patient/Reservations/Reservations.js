import React from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
} from "mdb-react-ui-kit";

export default function Reservations() {
  const appointments = [
    {
      id: 1,
      appointment_time: "08:00 PM",
      appointment_duration: 60,
      appointment_date: "2023-07-02",
      appointment_price: 1111.0,
      doctor_name: "Adel Kenawy",
      status: "R",
      patient: 3,
      appointment: 2,
      doctor: {
        id: 2,
        first_name: "moustafa",
        last_name: "mohamed",
        email: "moustafa@gmail.com",
        date_of_birth: "1990-12-12",
        phone: "01033022410",
        national_id: "29510010402099",
        profileImgUrl: "image/upload/v1688058547/jyqnachpltnpmc0ucaid.webp",
        gender: "male",
        specialization: {
          id: 1,
          name: "assd",
        },
        profLicenseNo: "221133",
        city: 1,
        district: 2,
        address: "street 9",
      },
    },
  ];

  return (
    <MDBContainer fluid className="my-5">
      <h4>Reservations</h4>
      <MDBCard className="mb-3" style={{ height: "40rem" }}>
        {/* <div className="dashboardHeading">
          <div className="my-All-Appointment-component" onClick="function">
            <h1>5</h1>
            <p>
              All
              <br />
              Appointments
            </p>
          </div>
          <div
            className="my-available-Appointment-component"
            onClick="function"
          >
            <h1>4</h1>
            <p>
              Future
              <br />
              Appointments
            </p>
          </div>
          <div className="my-reserved-Appointment-component" onClick="function">
            <h1>4</h1>
            <p>
              Done
              <br />
              Appointments
            </p>
          </div>
        </div> */}
        <div className="dashboardTableDetails">
          <div>
            <MDBTable align="middle" hover>
              <MDBTableHead>
                <tr>
                  <th scope="col">Name</th>
                  {/* <th scope="col">Specialization</th> */}
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Date</th>
                  <th scope="col">Session Start</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Session Code</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            process.env.REACT_APP_IMGE_API_URL +
                            appointment.doctor.profileImgUrl
                          }
                          alt="User_picture"
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-0 pt-1 pb-1">
                            Dr.{" "}
                            {appointment.doctor.first_name +
                              " " +
                              appointment.doctor.last_name}
                          </p>
                          <p className="text-muted mb-0 pt-1 pb-1">
                            {appointment.doctor.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* <td>{appointment.doctor.specialization.name}</td> */}
                    {/* <td>
                      {appointment.status === "A" ? (
                        <MDBBadge color="success" pill>
                          Available
                        </MDBBadge>
                      ) : (
                        <MDBBadge color="warning" pill>
                          Booked
                        </MDBBadge>
                      )}
                    </td> */}
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.appointment_duration} minutes</td>
                    <td>
                      {appointment.status === "A" ? (
                        <MDBBtn color="primary" size="sm">
                          Book Now
                        </MDBBtn>
                      ) : (
                        <span>Session Code</span>
                      )}
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </MDBCard>
    </MDBContainer>
  );
}
