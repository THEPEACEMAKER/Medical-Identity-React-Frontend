import { useState } from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import api from "../../../../api/api";
import { useNavigate } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

import StepperComp from "./stepper";
import FirstStep from "./firstStep";
import ThirdStep from "./thirdStep";

function Register() {
  const navigate = useNavigate();
  const [resError, setResError] = useState([]);
  const [loading, setLoding] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(10, "must be 20 Char or Less")
        .min(3, "must be 3 Char or More")
        .matches(/^[A-Za-z]+$/, "must not contain numbers.")
        .required("First Name is required"),
      lastName: Yup.string()
        .max(10, "must be 20 Char or Less")
        .min(3, "must be 3 Char or More")
        .matches(/^[A-Za-z]+$/, "must not contain numbers.")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: (values) => {
      setLoding(true);
      api
        .post("/auth/signup/", values)
        .then((res) => {
          setLoding(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setLoding(false);

          setResError([]);

          setResError((data) => [
            ...data,
            err.originalError.response.data.details[0].message,
          ]);
        });
    },
  });

  const onChange = (e) => {
    setIndex(e.index);
  };

  const [index, setIndex] = useState(1);

  return (
    <div className={`${styles.body}`}>
      <MDBContainer fluid>
        <MDBCard
          className="text-black w-75 m-auto"
          style={{ borderRadius: "25px", maxWidth: "1100px" }}
        >
          <MDBCardBody>
            <h2 style={{ textAlign: "center" }}>Sign up</h2>
            <StepperComp index={index} />

            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <form className="w-100" onSubmit={formik.handleSubmit}>
                  {index === 1 ? (
                    <FirstStep onClick={onChange} form={formik} />
                  ) : (
                    <ThirdStep onClick={onChange} form={formik} />
                  )}
                </form>

                {loading && <span className={styles.loader}></span>}

                {resError.length !== 0 &&
                  resError.map((el) => (
                    <div className="alert alert-danger">
                      <p className="m-0">{el}</p>
                    </div>
                  ))}
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  I have an account?
                  <Link to="/login" className="link-danger">
                    Login Here
                  </Link>
                </p>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className={`order-1 order-lg-2 d-flex align-items-center ${styles.cover}`}
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Register;
