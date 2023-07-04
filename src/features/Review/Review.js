import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ReviewCard from "./ReviewCard";

export default function Review() {
  const user = localStorage.getItem("user");
  const URL = process.env.REACT_APP_IMGE_API_URL;

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
          <div className="d-flex mb-3">
            <MDBTextArea
              label="Message"
              id="textAreaExample"
              rows={2}
              wrapperClass="w-100"
            />
          </div>
          <ReviewCard />
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
