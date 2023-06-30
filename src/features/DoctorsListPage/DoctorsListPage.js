import { React } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";
import styles from "./stylee.module.css";

import DoctorCard from "../layout/DoctorCard/DoctorCard";

function DoctorsListPage() {
  const { specializationId } = useParams();
  const doctors = [
    {
      id: 7,
      first_name: "Adel",
      last_name: "Kenawy",
      email: "adel@doctor.com",
      date_of_birth: "2005-06-03",
      phone: "01013552661",
      national_id: "21232324243231",
      profileImgUrl: "image/upload/v1688068062/vv7drw0atyjwofhpufmx.webp",
      gender: "male",
      specialization: 2,
      profLicenseNo: "221112",
      city: 5,
      district: 161,
      address: null,
    },
    {
      id: 8,
      first_name: "Adel",
      last_name: "Kenawy",
      email: "adel3@doctor.com",
      date_of_birth: "2005-06-08",
      phone: "01073552667",
      national_id: "21232324243733",
      profileImgUrl: "image/upload/v1688068185/q8tmxjzbuuzbyk5j1pz0.webp",
      gender: "male",
      specialization: 2,
      profLicenseNo: "221112",
      city: 7,
      district: 185,
      address: null,
    },
  ];

  return (
    <MDBContainer fluid className="my-5">
      <h1 className="">
        {/* {status === "succeeded" && doctors.length
          ? doctors[0].specialization.name
          : ""} */}
      </h1>
      <br />
      <MDBRow>
        {doctors.length ? (
          <>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </>
        ) : (
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
          >
            {/* <img src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"} /> TODO: fix the img */}
            <h3>There are no doctors in this page yet</h3>
            <span className="text-muted">Check other doctors or services!</span>
            <Link to="/home" className={`{styles.color} btn btn-primary my-3`}>
              Home
            </Link>
          </div>
        )}
      </MDBRow>
    </MDBContainer>
  );
}

export default DoctorsListPage;
