import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

function DoctorCard({ doctor }) {
  const { id, first_name, last_name, specialization, profileImgUrl } = doctor;

  return (
    <MDBCol md="12" lg="3" className="mb-4">
      <Link to={`/doctor/${id}`} className="mx-2 text-dark">
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image rounded hover-zoom"
          >
            <MDBCardImage
              src={process.env.REACT_APP_PUBLIC_URL + "/assets/user.webp"}
              fluid
              className="w-100"
            />
            <a href="#!">
              <div className="hover-overlay">
                <div
                  className="mask"
                  style={{
                    backgroundColor: "rgba(251, 251, 251, 0.15)",
                  }}
                ></div>
              </div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <a href="#!" className="text-reset">
              <h5 className="card-title mb-3">{`${first_name} ${last_name}`}</h5>
            </a>
            <a href="#!" className="text-reset">
              <p>{specialization}</p>
            </a>
          </MDBCardBody>
        </MDBCard>
      </Link>
    </MDBCol>
  );
}

export default DoctorCard;
