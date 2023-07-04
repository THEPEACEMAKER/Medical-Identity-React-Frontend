import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTypography,
} from "mdb-react-ui-kit";
import ReviewCard from "./ReviewCard";
import ReviewInput from "./ReviewInput";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Review() {
  const { id } = useParams();
  const { isLoggedIn, user, isPatient } = useSelector((state) => state.auth);
  return (
    <MDBContainer className="py-5">
      <MDBCard style={{ maxWidth: "42rem" }}>
        <MDBCardBody>
          {/* <div>
            <div>
              <a href="#!" className="text-muted">
                8 comments
              </a>
            </div>
          </div> */}
          {isLoggedIn ? (
            isPatient && (
              <div className="d-flex mb-3">
                <ReviewInput id={id} />
              </div>
            )
          ) : (
            <MDBTypography className="text-center">
              Please log in to leave a review.
            </MDBTypography>
          )}
          <ReviewCard />
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
