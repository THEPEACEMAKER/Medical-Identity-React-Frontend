/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";

import { MDBSpinner, MDBIcon, MDBBtn, MDBInput } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function FirstStep({ formik }) {
  const [show, setShow] = useState(false);

  const onImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setShow(true);

    reader.onload = () => {
      formik.values.image = file;
      setShow(false);
    };
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center my-1">
      <div className={`${styles.parent}`}>
        <img
          src={`https://res.cloudinary.com/ddk98mjzn/${formik.values.image}`}
          className={`${styles.img}`}
        />

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

      <div className="d-flex flex-row align-items-center mb-5 gap- w-100">
        <MDBIcon fas icon="user me-3" size="lg" />

        <div className="d-flex gap-2 w-100">
          <div className="w-100 position-relative">
            <MDBInput
              label="First Name"
              id="first_name"
              type="text"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              className={`${
                formik.touched.first_name &&
                formik.errors.first_name &&
                styles.inputErr
              } `}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <p className={`${styles.error} `}>{formik.errors.first_name}</p>
            )}
          </div>

          <div className="w-100 position-relative">
            <MDBInput
              label="Last Name"
              id="last_name"
              type="text"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              className={`${
                formik.touched.last_name &&
                formik.errors.last_name &&
                styles.inputErr
              }`}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className={`${styles.error}`}>{formik.errors.last_name}</p>
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
            value={formik.values.username}
            onChange={formik.handleChange}
            className={`${
              formik.touched.username &&
              formik.errors.username &&
              styles.inputErr
            }`}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <p className={`${styles.error} `}>{formik.errors.username}</p>
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
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`${
              formik.touched.email && formik.errors.email && styles.inputErr
            } `}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={`${styles.error}`}> {formik.errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FirstStep;
