import React, { useState } from "react";

import { MDBBtn, MDBInput, MDBIcon } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function ThirdStep(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRPassword, setShowRPassword] = useState(false);

  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickRPassword = () => setShowRPassword(!showRPassword);

  const [animate, setAnimate] = useState(false);
  const [showError, setshowError] = useState(false);

  const registertien = () => {
    if (!props.form.touched.confirm_password) {
      setshowError(true);
      setTimeout(() => {
        setshowError(false);
      }, 1500);
    }
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 800);
  };

  const prev = () => {
    props.onClick({ index: 2 });
  };

  return (
    <div
      className="w-100 d-flex flex-column align-items-center my-1"
      data-aos="fade-left"
    >
      <div className="d-flex flex-row align-items-center mb-5 justify-content-between w-100 gap-1 ">
        <MDBIcon fas icon="lock me-3" size="lg" />

        <div className="w-100 position-relative">
          <MDBInput
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={props.form.values.password}
            onChange={props.form.handleChange}
            className={`${
              props.form.touched.password &&
              props.form.errors.password &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.password && props.form.errors.password && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.password}
            </p>
          )}
          <button
            type="button"
            onClick={handleClickPassword}
            className={`${styles.icon}`}
          >
            <i
              className={
                showPassword
                  ? "fa-regular fa-eye-slash"
                  : "fa-sharp fa-regular fa-eye"
              }
            ></i>
          </button>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-5 justify-content-between w-100">
        <MDBIcon fas icon="key me-3" size="lg" />
        <div className="w-100 position-relative">
          <MDBInput
            label="Repeat your password"
            id="confirm_password"
            type={showRPassword ? "text" : "password"}
            value={props.form.values.confirm_password}
            onChange={props.form.handleChange}
            className={`${
              props.form.touched.confirm_password &&
              props.form.errors.confirm_password &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.confirm_password &&
            props.form.errors.confirm_password && (
              <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
                {props.form.errors.confirm_password}
              </p>
            )}{" "}
          <button
            type="button"
            onClick={handleClickRPassword}
            className={`${styles.icon}`}
          >
            <i
              className={
                showRPassword
                  ? "fa-regular fa-eye-slash"
                  : "fa-sharp fa-regular fa-eye"
              }
            ></i>
          </button>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-4 justify-content-between w-100 bttn">
        <MDBBtn className="mb-4" size="lg" onClick={prev}>
          prev
        </MDBBtn>

        <MDBBtn type="submit" className="mb-4" size="lg" onClick={registertien}>
          Register
        </MDBBtn>
      </div>
      {showError && (
        <div className="alert alert-danger">
          <p className={`m-0 ${animate ? styles.animate : ""}`}>
            Please confirm your password
          </p>
        </div>
      )}
    </div>
  );
}

export default ThirdStep;
