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
import SecondStep from "./secondStep";

function Register() {
  const navigate = useNavigate();
  const [resError, setResError] = useState([]);
  const [loading, setLoding] = useState(false);

  const formik = useFormik({
    initialValues: {
      profileImgUrl: "",
      imagePath:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      date_of_birth: "",
      isDoctor: false,
      phone: "",
      national_id: "",
      profLicenseNo: "",
      specialization: "",
      city_id: "",
      district_id: "",
      street: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      profileImgUrl: Yup.mixed().required("Image is required"),
      first_name: Yup.string()
        .max(10, "must be 20 Char or Less")
        .min(3, "must be 3 Char or More")
        .matches(/^[A-Za-z]+$/, "must not contain numbers.")
        .required("First Name is required"),
      last_name: Yup.string()
        .max(10, "must be 20 Char or Less")
        .min(3, "must be 3 Char or More")
        .matches(/^[A-Za-z]+$/, "must not contain numbers.")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is required"),
      gender: Yup.string().required("Gender is required"),
      date_of_birth: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future.")
        .required("Date of birth is required.")
        .test(
          "minimum-age",
          "You must be at least 18 years old to register.",
          function (value) {
            const today = new Date();
            const minimumAgeDate = new Date();
            minimumAgeDate.setFullYear(today.getFullYear() - 18);
            return value <= minimumAgeDate;
          }
        ),
      phone: Yup.string()
        .matches(/^01[0-9]{9}$/, "Invalid phone number")
        .required("Phone number is required"),
      national_id: Yup.string()
        .matches(/^[2|3|5][0-9]{13}$/, "Invalid national ID")
        .required("National ID is required"),
      profLicenseNo: Yup.string().when("isDoctor", {
        is: true,
        then: (schema) =>
          Yup.string()
            .matches(
              /^[02468]{2}[13579]{2}\d{2}$/,
              "Invalid profession License Number"
            )
            .required("Profession License Number is required for doctors"),
      }),
      specialization: Yup.string().when("isDoctor", {
        is: true,
        then: (schema) =>
          Yup.string().required("Specialization is required for doctors"),
      }),
      city_id: Yup.string().when("isDoctor", {
        is: true,
        then: (schema) => Yup.string().required("City is required for doctors"),
      }),
      street: Yup.string().when("isDoctor", {
        is: true,
        then: (schema) =>
          Yup.string()
            .min(5, "Street address must be at least 5 characters")
            .max(100, "Street address must be 100 Char or less")
            .required("Street address is required for doctors"),
      }),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: (values) => {
      console.log("values: " + JSON.stringify(values));
      setLoding(true);
      // api
      //   .post("/patientregister/", values, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((res) => {
      //     setLoding(false);

      //     setPieces(200);

      //     setTimeout(() => {
      //       navigate("/login");
      //     }, 3000);
      //   })
      //   .catch((err) => {
      //     setLoding(false);

      //     setResError([]);
      //     console.log(err.originalError.response.data);
      //     for (let na of Object.values(err.originalError.response.data)) {
      //       setResError((data) => [...data, na[0]]);
      //     }
      //   });
    },
  });

  const onChange = (e) => {
    setIndex(e.index);
  };

  const [index, setIndex] = useState(1);
  const [pieces, setPieces] = useState(0);

  return (
    <div className={`${styles.body}`}>
      <Confetti gravity={0.2} numberOfPieces={pieces} />
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
                  ) : index === 2 ? (
                    <SecondStep onClick={onChange} form={formik} />
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
