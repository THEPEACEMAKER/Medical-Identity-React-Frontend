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
      image: "",
      imagePath:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      first_name: "",
      last_name: "",
      uname: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",

      street: "",
      city: "",
      district: "",
      country: "",
      building_number: "",
    },
    validationSchema: Yup.object({
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
      username: Yup.string()
        .max(10, "User Name must be 20 Charracters or Less")
        .min(3, "User Name must be 3 Charracters or More")
        .matches(
          /^[a-zA-Z][a-zA-Z0-9]*$/,
          "User Name must start with a letter."
        )
        .required("User Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is required"),
      phone: Yup.string()
        .matches(/^01[0-9]{9}$/, "Invalid phone number")
        .required("Phone number is required"),
      address: Yup.string().max(265, "Address must be 265 Char or less"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),

      street: Yup.string().test({
        name: "address",
        test: function (value) {
          const { city, district, country, building_number } = this.parent;
          return (
            !city ||
            !district ||
            !country ||
            !building_number ||
            !!value ||
            this.createError({ message: "Please fill in all address fields" })
          );
        },
      }),
      city: Yup.string().test({
        name: "address",
        test: function (value) {
          const { street, district, country, building_number } = this.parent;
          return (
            !street ||
            !district ||
            !country ||
            !building_number ||
            !!value ||
            this.createError({ message: "Please fill in all address fields" })
          );
        },
      }),
      district: Yup.string().test({
        name: "address",
        test: function (value) {
          const { street, city, country, building_number } = this.parent;
          return (
            !street ||
            !city ||
            !country ||
            !building_number ||
            !!value ||
            this.createError({ message: "Please fill in all address fields" })
          );
        },
      }),
      country: Yup.string().test({
        name: "address",
        test: function (value) {
          const { street, city, district, building_number } = this.parent;
          return (
            !street ||
            !city ||
            !district ||
            !building_number ||
            !!value ||
            this.createError({ message: "Please fill in all address fields" })
          );
        },
      }),
      building_number: Yup.string().test({
        name: "address",
        test: function (value) {
          const { street, city, district, country } = this.parent;
          return (
            !street ||
            !city ||
            !district ||
            !country ||
            !!value ||
            this.createError({ message: "Please fill in all address fields" })
          );
        },
      }),
    }),

    onSubmit: (values) => {
      setLoding(true);
      api
        .post("/auth/register/", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoding(false);

          setPieces(200);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setLoding(false);

          setResError([]);
          console.log(err.originalError.response.data);
          for (let na of Object.values(err.originalError.response.data)) {
            setResError((data) => [...data, na[0]]);
          }
        });
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
