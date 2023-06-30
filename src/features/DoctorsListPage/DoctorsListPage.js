import { React, useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";
import styles from "./stylee.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import DoctorCard from "../layout/DoctorCard/DoctorCard";
import { fetchDoctorsBySpecializations } from "./DoctorsListSlice";
import PlaceSelect_DoctorsListPage from "./layout/PlaceSelect-DoctorsListPage";

function DoctorsListPage() {
  const { specializationId } = useParams();
  const dispatch = useDispatch();
  const { doctors, status, error, totaldoctorsCount } = useSelector(
    (state) => state.doctorsPage
  );

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  useEffect(() => {
    dispatch(
      fetchDoctorsBySpecializations({ specializationId, pageSize, page })
    );
  }, [specializationId, dispatch, page, pageSize]);

  useEffect(() => {
    // calculate the total number of pages
    const totalPages = Math.ceil(totaldoctorsCount / pageSize);

    setPagesQuantity(totalPages);
  }, [pageSize, totaldoctorsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (status === "failed") {
      console.log("DoctorsListPage Error:", error);
    }
  }, [status, error]);

  return (
    <MDBContainer fluid className="my-5">
      <PlaceSelect_DoctorsListPage specializationId={specializationId} />

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
            <nav aria-label="..." className={`${styles.pagination}`}>
              <MDBPagination center size="lg" className="mb-0">
                {Array.from({ length: pagesQuantity }, (_, index) => (
                  <MDBPaginationItem key={index} active={index + 1 === page}>
                    <MDBPaginationLink
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                      {index + 1 === page && (
                        <span className="visually-hidden">(current)</span>
                      )}
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                ))}
              </MDBPagination>
            </nav>
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
