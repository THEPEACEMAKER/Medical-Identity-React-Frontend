import { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../api/api";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import PasswordInfo from "./PasswordInfo";
import MainProfile from "./mainprofile";

function Profile() {
  const [resError, setResError] = useState([]);
  const [loading, setLoding] = useState(false);
  const [profileData, setProfileData] = useState();
  const [switchComp, setSwitchComp] = useState(true);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

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
      address: "",
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
      console.log(values);

      setLoding(true);
      api
        .patch("/auth/", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoding(false);
          toggleShow();
          setResError([]);
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

  useEffect(() => {
    api
      .get("/auth")
      .then((res) => {
        setProfileData(res.data);

        const { city, country, district, street, building_number } =
          res.data.addresses[0];
        const { first_name, last_name, username, email, phone } = res.data;

        formik.setValues({
          ...formik.values,
          first_name,
          last_name,
          username,
          email,
          phone,
          city,
          country,
          district,
          street,
          building_number,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`${styles.body}`}>
      <MDBContainer fluid>
        <MDBCard
          className="text-black w-100 m-auto"
          style={{ borderRadius: "25px" }}
        >
          <MDBCardBody className="py-1">
            {switchComp ? (
              <MainProfile
                profileData={profileData}
                setSwitchComp={setSwitchComp}
              />
            ) : (
              <div className="w-50 m-auto border">
                <h2 className="my-3 mb-2" style={{ textAlign: "center" }}>
                  Profile
                </h2>
                <p style={{ textAlign: "center" }}>
                  Edit your profile information
                </p>
                <hr />
                <MDBRow className="w-100 m-auto">
                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-2 order-lg-1 d-flex flex-column align-items-center w-100 px-4"
                  >
                    <form onSubmit={formik.handleSubmit}>
                      <PersonalInfo formik={formik} />
                      <ContactInfo formik={formik} />
                      <PasswordInfo formik={formik} />

                      <div className="d-flex flex-row justify-content-between mb-4 w-100">
                        <MDBBtn
                          type="button"
                          className="mb-4"
                          size="lg"
                          onClick={() => {
                            setSwitchComp(true);
                          }}
                        >
                          Back
                        </MDBBtn>
                        {loading && <span className={styles.loader}></span>}
                        <MDBBtn type="submit" className="mb-4" size="lg">
                          Edit
                        </MDBBtn>
                      </div>
                    </form>
                    {resError.length !== 0 &&
                      resError.map((el) => (
                        <div className="alert alert-danger">
                          <p className="m-0">{el}</p>
                        </div>
                      ))}
                  </MDBCol>
                </MDBRow>
              </div>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Congratulation</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="d-flex flex-column align-items-center gap-4">
                <div style={{ height: "80px" }}>
                  <span className={styles.loader2}></span>
                </div>{" "}
                <p>Congratulation Your Data information is Updated</p>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  onClick={() => {
                    toggleShow();
                    setSwitchComp(true);
                  }}
                >
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>{" "}
    </div>
  );
}

export default Profile;
