import React from "react";
import moment from "moment-timezone";
import { MDBBtn } from "mdb-react-ui-kit";

export default function StartSessionBtn({ appointment, toggleShow }) {
  const appointmentDateTime = moment.tz(
    appointment.date + " " + appointment.start_time,
    "YYYY-MM-DD hh:mm A",
    "Africa/Cairo"
  );

  const isWithinSessionTime = moment().isBetween(
    appointmentDateTime,
    appointmentDateTime.clone().add(appointment.duration, "minutes")
  );

  return (
    <>
      {!isWithinSessionTime && appointment.status !== "A" ? (
        <MDBBtn
          onClick={() => toggleShow(appointment)}
          type="button"
          className="me-1"
          color="success"
        >
          Start Session
        </MDBBtn>
      ) : (
        `Available during session time`
      )}
    </>
  );
}
