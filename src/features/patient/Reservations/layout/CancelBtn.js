import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { cancelReservation } from "../ReservationsSlice";
import { useDispatch } from "react-redux";

export default function CancelBtn({ id }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(cancelReservation(id)).catch((error) => {
      console.error("Error canceling reservation:", error);
    });
  };

  return (
    <MDBBtn
      className="btn-close"
      color="none"
      aria-label="Cancel"
      onClick={handleCancel}
    />
  );
}
