import React, { useState } from "react";

import { MDBBtn, MDBInput, MDBIcon } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function ThirdStep({ formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRPassword, setShowRPassword] = useState(false);

  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickRPassword = () => setShowRPassword(!showRPassword);

  return (
    <div className="w-100 d-flex flex-column align-items-center my-1">
      <div className="d-flex flex-row align-items-center mb-5 justify-content-between w-100 gap-1 ">
        <MDBIcon fas icon="lock me-3" size="lg" />

        <div className="w-100 position-relative">
          <MDBInput
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`${
              formik.touched.password &&
              formik.errors.password &&
              styles.inputErr
            } `}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={`${styles.error} `}>{formik.errors.password}</p>
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

      {formik.touched.password && (
        <div className="d-flex flex-row align-items-center mb-5 justify-content-between w-100">
          <MDBIcon fas icon="key me-3" size="lg" />
          <div className="w-100 position-relative">
            <MDBInput
              label="Repeat your password"
              id="confirm_password"
              type={showRPassword ? "text" : "password"}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              className={`${
                formik.touched.confirm_password &&
                formik.errors.confirm_password &&
                styles.inputErr
              } `}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <p className={`${styles.error} `}>
                  {formik.errors.confirm_password}
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
      )}
    </div>
  );
}

export default ThirdStep;
