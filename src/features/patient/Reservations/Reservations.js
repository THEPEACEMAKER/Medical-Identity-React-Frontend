import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "./ReservationsSlice";

export default function Reservations() {
  const dispatch = useDispatch();
  const { reservations, status, error, totalCount } = useSelector(
    (state) => state.patientReservations
  );

  useEffect(() => {
    // dispatch(fetchReservations());
  }, [dispatch]);

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
              reservations
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
              reservations
            </p>
          </div>
          <div className="my-reserved-Appointment-component" onClick="function">
            <h1>4</h1>
            <p>
              Done
              <br />
              reservations
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
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            process.env.REACT_APP_IMGE_API_URL +
                            reservation.doctor.profileImgUrl
                          }
                          alt="User_picture"
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-0 pt-1 pb-1">
                            Dr.{" "}
                            {reservation.doctor.first_name +
                              " " +
                              reservation.doctor.last_name}
                          </p>
                          <p className="text-muted mb-0 pt-1 pb-1">
                            {reservation.doctor.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* <td>{reservation.doctor.specialization.name}</td> */}
                    {/* <td>
                      {reservation.status === "A" ? (
                        <MDBBadge color="success" pill>
                          Available
                        </MDBBadge>
                      ) : (
                        <MDBBadge color="warning" pill>
                          Booked
                        </MDBBadge>
                      )}
                    </td> */}
                    <td>{reservation.appointment_date}</td>
                    <td>{reservation.appointment_time}</td>
                    <td>{reservation.appointment_duration} minutes</td>
                    <td>
                      {reservation.status === "A" ? (
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
