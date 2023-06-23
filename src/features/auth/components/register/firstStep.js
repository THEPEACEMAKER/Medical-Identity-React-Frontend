/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";

import { MDBSpinner, MDBIcon, MDBBtn, MDBInput } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function FirstStep(props) {
  const [animate, setAnimate] = useState(false);
  const [showError, setshowError] = useState(false);

  const onClick = () => {
    if (
      Object.keys(props.form.errors).filter((el) =>
        ["firstName", "lastName", "email"].includes(el)
      ).length === 0 &&
      Object.keys(props.form.touched).length !== 0
    ) {
      props.onClick({ index: 2 });
    } else {
      if (
        Object.keys(props.form.errors).filter((el) =>
          ["firstName", "lastName", "email"].includes(el)
        ).length !== 4
      ) {
        setshowError(true);
        setTimeout(() => {
          setshowError(false);
        }, 2000);
      }
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 800);
    }
  };

  return (
    <div
      className="w-10 d-flex flex-column align-items-center my-1"
      data-aos="zoom-in-down"
    >
      <div className="d-flex flex-row align-items-center mb-5 gap-1">
        <MDBIcon fas icon="user me-3" size="lg" />

        <div className="d-flex gap-2">
          <div className="w-50 position-relative">
            <MDBInput
              label="First Name"
              id="firstName"
              type="text"
              value={props.form.values.firstName}
              onChange={props.form.handleChange}
              className={`${
                props.form.touched.firstName &&
                props.form.errors.firstName &&
                styles.inputErr
              } `}
              onBlur={props.form.handleBlur}
            />
            {props.form.touched.firstName && props.form.errors.firstName && (
              <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
                {props.form.errors.firstName}
              </p>
            )}
          </div>

          <div className="w-50 position-relative">
            <MDBInput
              label="Last Name"
              id="lastName"
              type="text"
              value={props.form.values.lastName}
              onChange={props.form.handleChange}
              className={`${
                props.form.touched.lastName &&
                props.form.errors.lastName &&
                styles.inputErr
              }`}
              onBlur={props.form.handleBlur}
            />
            {props.form.touched.lastName && props.form.errors.lastName && (
              <p
                className={`${styles.error}  ${animate ? styles.animate : ""}`}
              >
                {props.form.errors.lastName}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-5 w-100 ">
        <MDBIcon fas icon="envelope me-3" size="lg" />
        <div className="w-100 position-relative">
          <MDBInput
            label="Your Email"
            id="email"
            type="email"
            value={props.form.values.email}
            onChange={props.form.handleChange}
            className={`${
              props.form.touched.email &&
              props.form.errors.email &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.email && props.form.errors.email && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="d-flex flex-row flex-row-reverse mb-4 w-100">
        <MDBBtn type="button" className="mb-4" size="lg" onClick={onClick}>
          Next
        </MDBBtn>
      </div>
      {showError && (
        <div className="alert alert-danger">
          <p className={`m-0 ${animate ? styles.animate : ""}`}>
            Fill All input by correct way
          </p>
        </div>
      )}
    </div>
  );
}

export default FirstStep;
