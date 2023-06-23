import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import api from "../../../../api/api";
import { useDispatch } from "react-redux";
import { login } from "../../authSlice";

import styles from "./stylee.module.css";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api
      .post("/auth/login", data)
      .then((res) => {
        const { token, user } = res.data;
        dispatch(login({ token, user }));
        // redirect to Home page
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${styles.body}`}>
      <MDBContainer className="my-5" data-aos="zoom-in">
        <MDBCard>
          <div className="d-flex flex-row m-auto my-3 ">
            <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
            <span className="h1 fw-bold mb-0">Login</span>
          </div>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <MDBValidation
                  className="text-center"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h5>

                  <MDBValidationItem
                    feedback={errors.email ? errors.email?.message : ""}
                    invalid={!!errors.email}
                  >
                    <MDBInput
                      wrapperClass={!errors.email ? "mb-4" : "mb-5"}
                      label="email"
                      id="emailInput"
                      type="email"
                      size="lg"
                      required
                      {...register("email", {
                        required: {
                          value: true,
                          message: "email is required.",
                        },
                      })}
                    />
                  </MDBValidationItem>

                  <MDBValidationItem
                    feedback={errors.password ? errors.password?.message : ""}
                    invalid={!!errors.password}
                  >
                    <MDBInput
                      wrapperClass={!errors.password ? "mb-4" : "mb-5"}
                      label="Password"
                      id="passwordInput"
                      type="password"
                      size="lg"
                      required
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required.",
                        },
                      })}
                    />
                  </MDBValidationItem>

                  <MDBBtn
                    className="mt-2 mb-4 px-5 mx-auto"
                    color="dark"
                    size="lg"
                    type="submit"
                  >
                    Login
                  </MDBBtn>

                  <p className="small fw-bold mt-2 pt-1 mb-2">
                    Don't have an account?{" "}
                    <Link to="/register" className="link-danger">
                      Register Here
                    </Link>
                  </p>
                </MDBValidation>{" "}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Login;
