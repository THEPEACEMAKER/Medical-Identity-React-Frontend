/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";

import {
  MDBSpinner,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBRadio,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import styles from "./stylee.module.css";
import { Input } from "@chakra-ui/react";

function FirstStep(props) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showError, setshowError] = useState(false);

  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  const maxDate = today.toISOString().split("T")[0];

  const onImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setShow(true);

    reader.onload = () => {
      props.form.values.imagePath = reader.result;
      props.form.values.profileImgUrl = file;
      setShow(false);
      props.form.setTouched({ profileImgUrl: true });
    };
  };

  const onClick = () => {
    props.form.setTouched({ profileImgUrl: true });
    if (
      Object.keys(props.form.errors).filter((el) =>
        [
          "profileImgUrl",
          "first_name",
          "last_name",
          "email",
          "gender",
          "date_of_birth",
        ].includes(el)
      ).length === 0 &&
      Object.keys(props.form.touched).length !== 0
    ) {
      props.onClick({ index: 2 });
    } else {
      if (
        Object.keys(props.form.errors).filter((el) =>
          [
            "profileImgUrl",
            "first_name",
            "last_name",
            "email",
            "gender",
            "date_of_birth",
          ].includes(el)
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
      <div className={`${styles.parent} `}>
        <img src={props.form.values.imagePath} className={`${styles.img}`} />

        <div
          className={show ? `${styles.wait} ${styles.visible}` : styles.wait}
        >
          <MDBSpinner grow size="sm"></MDBSpinner>
          <MDBSpinner grow size="sm"></MDBSpinner>
          <MDBSpinner grow size="sm"></MDBSpinner>
        </div>
        <label htmlFor="inputTag" className={`${styles.addImage}`}>
          <i className="fa fa-camera"></i>
          <input
            id="inputTag"
            type="file"
            name="profileImgUrl"
            onChange={onImgChange}
            onBlur={props.form.handleBlur}
          />
        </label>
      </div>
      <div className="w-100 mb-5 position-relative d-flex justify-content-center">
        {props.form.touched.profileImgUrl &&
          props.form.errors.profileImgUrl && (
            <p
              className={`${styles.error} ${animate ? styles.animate : ""}`}
              style={{
                left: "auto",
              }}
            >
              {props.form.errors.profileImgUrl}
            </p>
          )}
      </div>

      <div className="d-flex flex-row align-items-center mb-5 gap-1">
        <MDBIcon fas icon="user me-3" size="lg" />

        <div className="d-flex gap-2">
          <div className="w-50 position-relative">
            <MDBInput
              label="First Name"
              id="first_name"
              type="text"
              value={props.form.values.first_name}
              onChange={props.form.handleChange}
              className={`${
                props.form.touched.first_name &&
                props.form.errors.first_name &&
                styles.inputErr
              } `}
              onBlur={props.form.handleBlur}
            />
            {props.form.touched.first_name && props.form.errors.first_name && (
              <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
                {props.form.errors.first_name}
              </p>
            )}
          </div>

          <div className="w-50 position-relative">
            <MDBInput
              label="Last Name"
              id="last_name"
              type="text"
              value={props.form.values.last_name}
              onChange={props.form.handleChange}
              className={`${
                props.form.touched.last_name &&
                props.form.errors.last_name &&
                styles.inputErr
              }`}
              onBlur={props.form.handleBlur}
            />
            {props.form.touched.last_name && props.form.errors.last_name && (
              <p
                className={`${styles.error}  ${animate ? styles.animate : ""}`}
              >
                {props.form.errors.last_name}
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

      <div className="d-flex flex-row align-items-center mb-5 w-100 ">
        <h6 className="fw-bold mb-0">Gender: </h6>
        <div className="w-100 position-relative">
          <div className="d-flex flex-fill justify-content-around">
            <MDBRadio
              name="gender"
              id="inlineRadio2"
              value="male"
              label="Male"
              inline
              onChange={props.form.handleChange}
              onBlur={props.form.handleBlur}
              checked={props.form.values.gender === "male"}
            />
            <MDBRadio
              name="gender"
              id="inlineRadio1"
              value="female"
              label="Female"
              inline
              onChange={props.form.handleChange}
              onBlur={props.form.handleBlur}
              checked={props.form.values.gender === "female"}
            />
          </div>
          {props.form.touched.gender && props.form.errors.gender && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.gender}
            </p>
          )}
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-5 w-100 ">
        <h6 className="fw-bold mb-0">Birth Date: </h6>
        <div className="w-100 position-relative">
          <Input
            placeholder="Your Birth Date"
            size="md"
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={props.form.values.date_of_birth}
            onChange={props.form.handleChange}
            onBlur={props.form.handleBlur}
            min="1910-01-01"
            max={maxDate}
            className={`${
              props.form.touched.date_of_birth &&
              props.form.errors.date_of_birth &&
              styles.inputErr
            }`}
          />
          {props.form.touched.date_of_birth &&
            props.form.errors.date_of_birth && (
              <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
                {props.form.errors.date_of_birth}
              </p>
            )}
        </div>
      </div>

      <div className="mb-4">
        <MDBCheckbox
          name="isDoctor"
          value=""
          id="flexCheckDefault"
          label="Register as a Doctor."
          checked={props.form.values.isDoctor}
          onChange={props.form.handleChange}
        />
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
