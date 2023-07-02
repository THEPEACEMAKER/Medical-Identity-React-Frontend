import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import api from "../../../../api/api";
import moment from "moment-timezone";

export default function GenerateCodeBtn({ reservation }) {
  const [basicModal, setBasicModal] = useState(false);
  // session code
  const [sessionCode, setSessionCode] = useState(null);

  const toggleShow = async () => {
    try {
      //   const response = await api.get("/code/");
      // TODO: connect to server, and handle what gets sent
      //   const sessionCode = response.data.result;
      const sessionCode = "M1231XAQW";

      setSessionCode(sessionCode);
      localStorage.setItem("sessionCode", sessionCode);
      setBasicModal(!basicModal);
    } catch (error) {
      console.error("Error generating session code:", error);
    }
  };

  useEffect(() => {
    setSessionCode(localStorage.getItem("sessionCode"));
  }, []);

  // check timeRange to render the code generation button
  const appointmentDateTime = moment.tz(
    reservation.appointment_date + " " + reservation.appointment_time,
    "YYYY-MM-DD hh:mm A",
    "Africa/Cairo"
  );

  const isWithinSessionTime = moment().isBetween(
    appointmentDateTime,
    appointmentDateTime.clone().add(reservation.appointment_duration, "minutes")
  );

  return (
    <>
      {isWithinSessionTime ? (
        sessionCode ? (
          <MDBBtn color="primary" size="sm" disabled>
            {sessionCode}
          </MDBBtn>
        ) : (
          <MDBBtn className={`btn btn-primary`} size="lg" onClick={toggleShow}>
            Code
          </MDBBtn>
        )
      ) : (
        <p>--------</p>
      )}

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="border-bottom-0">
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-start text-black px-4 pb-2">
              <MDBTypography
                tag="h4"
                className="mb-5"
                style={{ color: "#35558a" }}
              >
                Dr. {reservation.doctor.last_name} will need this code to access
                your medical history
              </MDBTypography>
              <hr
                className="mt-2 mb-4"
                style={{
                  height: "0",
                  backgroundColor: "transparent",
                  opacity: ".75",
                  borderTop: "2px dashed #9e9e9e",
                }}
              />
            </MDBModalBody>

            <MDBModalFooter className="d-flex justify-content-center border-top-0 pt-0 pb-4">
              <MDBBtn
                size="lg"
                style={{ backgroundColor: "#35558a" }}
                className="mb-1"
                disabled
              >
                {sessionCode}
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
