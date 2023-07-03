import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import BookAppointment from "../../layout/DoctorCard/layout/BookAppointment";
import "./DoctorsData.css";

function DoctorsData(props) {
  const imageUrl = process.env.REACT_APP_IMGE_API_URL;
  const isPatient = useSelector((state) => state.auth.isPatient);
  const [specializationName, setSpecializationName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const base = process.env.REACT_APP_BASE_API_URL;

  useEffect(() => {
    // Make an API request to retrieve the name of the specialization by its ID
    fetch(
      `${process.env.REACT_APP_BASE_API_URL}/specialization/${props.specialization}/`
    )
      .then((response) => response.json())
      .then((data) => setSpecializationName(data.name))
      .catch((error) => console.error(error));

    fetch(`${process.env.REACT_APP_BASE_API_URL}/city/${props.city}/`)
      .then((response) => response.json())
      .then((data) => setCityName(data.name_en))
      .catch((error) => console.error(error));
  }, [props.specialization, props.city]);
  return (
    <MDBCol>
      <MDBCard className="doctor-card">
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image rounded hover-zoom"
        >
          <MDBCardImage
            src={imageUrl + props.profileImgUrl}
            fluid
            className="w-100"
            alt={`${props.first_name}'s profile picture`}
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
          <h5 className="card-title mb-3">{`${props.first_name} ${props.last_name} `}</h5>
          <div className="card-info">
            <p className="specialization">
              {" "}
              Specialziation : {specializationName}
            </p>
            <p className="city"> City : {cityName}</p>
            <p className="phone"> Phone : {props.phone}</p>
          </div>
          {isPatient && (
            <BookAppointment
              doctorID={props.id}
              className="book-appointment-btn"
            />
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default DoctorsData;
