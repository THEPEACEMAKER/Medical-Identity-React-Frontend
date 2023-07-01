import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import BookAppointment from "./layout/BookAppointment";
import { useSelector } from "react-redux";

function DoctorCard({ doctor }) {
  const { id, first_name, last_name, specialization, profileImgUrl } = doctor;
  const isPatient = useSelector((state) => state.auth.isPatient);

  return (
    <MDBCol md="12" lg="3" className="mb-4">
      <MDBCard>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image rounded hover-zoom"
        >
          <MDBCardImage
            src={process.env.REACT_APP_IMGE_API_URL + profileImgUrl}
            fluid
            className="w-100"
          />
          <div className="hover-overlay">
            <div
              className="mask"
              style={{
                backgroundColor: "rgba(251, 251, 251, 0.15)",
              }}
            ></div>
          </div>
        </MDBRipple>
        <MDBCardBody>
          <h5 className="card-title mb-3">{`${first_name} ${last_name}`}</h5>
          <p>{specialization.name}</p>

          {isPatient && <BookAppointment doctorID={id} />}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default DoctorCard;
