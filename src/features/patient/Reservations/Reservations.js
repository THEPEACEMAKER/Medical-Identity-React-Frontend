import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "./ReservationsSlice";
import styles from "./stylee.module.css";
import GenerateCodeBtn from "./layout/GenerateCodeBtn";
import CancelBtn from "./layout/CancelBtn";

export default function Reservations() {
  const dispatch = useDispatch();
  const { reservations, status, error, totalCount } = useSelector(
    (state) => state.patientReservations
  );

  // pagination
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchReservations({ pageSize, page }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    // calculate the total number of pages
    const totalPages = Math.ceil(totalCount / pageSize);

    setPagesQuantity(totalPages);
  }, [pageSize, totalCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <MDBContainer fluid className="my-5">
      <h4>Reservations</h4>
      <MDBCard className="mb-3" style={{ minHeight: "30rem" }}>
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
                  <th scope="col">Cancel</th>
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
                      <GenerateCodeBtn reservation={reservation} />
                    </td>
                    <td>
                      <CancelBtn id={reservation.id} />
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>

        <nav aria-label="..." className={`${styles.pagination}`}>
          <MDBPagination center size="lg" className="mb-0">
            {Array.from({ length: pagesQuantity }, (_, index) => (
              <MDBPaginationItem key={index} active={index + 1 === page}>
                <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                  {index + 1 === page && (
                    <span className="visually-hidden">(current)</span>
                  )}
                </MDBPaginationLink>
              </MDBPaginationItem>
            ))}
          </MDBPagination>
        </nav>
      </MDBCard>
    </MDBContainer>
  );
}
