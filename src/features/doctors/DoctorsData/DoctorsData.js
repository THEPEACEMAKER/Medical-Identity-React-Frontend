/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import BookAppointment from "../../layout/DoctorCard/layout/BookAppointment";

function DoctorsData(props) {
  const imageUrl = process.env.REACT_APP_IMGE_API_URL;
  const isPatient = useSelector((state) => state.auth.isPatient);

  return (
    <MDBCol>
      <MDBCard>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image rounded hover-zoom"
        >
          <MDBCardImage
            src={imageUrl + props.profileImgUrl}
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
          <h5 className="card-title mb-3">{`${props.first_name}`}</h5>
          <p>{props.specialization.name}</p>
          <p>{props.city}</p>
          <p>{props.phone}</p>

          {/* {isPatient && <BookAppointment doctorID={props.id} />} */}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default DoctorsData;
