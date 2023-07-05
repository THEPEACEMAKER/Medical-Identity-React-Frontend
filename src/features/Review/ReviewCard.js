import React from "react";

import { useEffect } from "react";
import { fetchReview } from "./ReviewSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MDBTypography } from "mdb-react-ui-kit";

export default function ReviewCard() {
  const URL = process.env.REACT_APP_IMGE_API_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReview({ id }));
  }, [id, dispatch]);
  const { reviews, status, error, totaldoctorsCount } = useSelector(
    (state) => state.doctorReview
  );
  const DoctorReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <>
      {DoctorReviews.map((review) => (
        <div className="d-flex mb-3">
          <a href="#!">
            <img
              src={URL + review.patient.profileImgUrl}
              className="border rounded-circle me-2"
              alt="Avatar"
              style={{ height: "40px" }}
            />
          </a>
          <div>
            <div className="bg-light rounded-3 px-3 py-1">
              <a href="#!" className="text-dark mb-0">
                <strong>
                  {review.patient.first_name} {review.patient.last_name}
                </strong>
              </a>
              <a href="#!" className="text-muted d-block">
                <small>{review.comment}</small>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
