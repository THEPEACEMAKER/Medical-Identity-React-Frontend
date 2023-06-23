import React from "react";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function MainProfile({ profileData, setSwitchComp }) {
  return (
    profileData && (
      <MDBRow className="justify-content-center align-items-center  ">
        <MDBCol lg="9" xl="7" className="w-100 ">
          <MDBCard className="flex flex-column px-2">
            <div
              className="rounded-top text-white"
              style={{ backgroundColor: "#000", height: "200px" }}
            >
              <div className=" d-flex flex-row">
                <div
                  className="ms-4 mt-5 d-flex flex-column "
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={`https://res.cloudinary.com/ddk98mjzn/${profileData.image}`}
                    alt="profile image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1", height: "170px" }}
                  />
                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                    onClick={() => setSwitchComp(false)}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {profileData.first_name + " " + profileData.last_name}
                  </MDBTypography>
                </div>
              </div>
            </div>

            <div className="text-black" style={{ paddingTop: "100px" }}>
              <div className="mb-5">
                <p className="lead fw-normal mb-1">Details</p>
                <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                  <MDBCardText className="font-italic mb-1">
                    <span className="fw-bolder">User Name :</span>{" "}
                    {profileData.username}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-1">
                    <span className="fw-bolder">Email :</span>{" "}
                    {profileData.email}
                  </MDBCardText>{" "}
                  <MDBCardText className="font-italic mb-1">
                    <span className="fw-bolder">Phone :</span>{" "}
                    {profileData.phone}
                  </MDBCardText>{" "}
                  <MDBCardText className="font-italic mb-1">
                    <span className="fw-bolder">Address :</span>{" "}
                    {profileData.address}
                  </MDBCardText>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBCardText className="lead fw-normal mb-0">
                  Orders
                </MDBCardText>
                <MDBCardText className="mb-0">
                  <Link to="/orders" className="text-muted">
                    Show all
                  </Link>
                </MDBCardText>
              </div>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  );
}
