/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";

import { MDBSpinner, MDBIcon, MDBBtn, MDBInput } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function FirstStep(props) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showError, setshowError] = useState(false);

  const onImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setShow(true);

    reader.onload = () => {
      props.form.values.imagePath = reader.result;
      props.form.values.image = file;
      setShow(false);
    };
  };

  const onClick = () => {
    if (
      Object.keys(props.form.errors).filter((el) =>
        ["first_name", "last_name", "username", "email"].includes(el)
      ).length === 0 &&
      Object.keys(props.form.touched).length !== 0
    ) {
      props.onClick({ index: 2 });
    } else {
      if (
        Object.keys(props.form.errors).filter((el) =>
          ["first_name", "last_name", "username", "email"].includes(el)
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
      <div className={`${styles.parent}`}>
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
            name="image"
            onChange={onImgChange}
          />
        </label>
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
        <MDBIcon fas icon="at me-3" size="lg" />
        <div className="w-100 position-relative">
          <MDBInput
            label="User Name"
            id="username"
            type="text"
            value={props.form.values.username}
            onChange={props.form.handleChange}
            className={`${
              props.form.touched.username &&
              props.form.errors.username &&
              styles.inputErr
            }`}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.username && props.form.errors.username && (
            <p className={`${styles.error}  ${animate ? styles.animate : ""}`}>
              {props.form.errors.username}
            </p>
          )}
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
