import { useState } from "react";

import { MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";
import SpecializationSelect from "./layout/SpecializationSelect";
import PlaceSelect from "./layout/PlaceSelect";

function SecondStep(props) {
  const [animate, setAnimate] = useState(false);
  const [showError, setshowError] = useState(false);

  const next = () => {
    if (
      Object.keys(props.form.errors).filter((el) =>
        [
          "address",
          "phone",
          "national_ID",
          "profLicenseNo",
          "specialization",
          "street",
          "city_id",
        ].includes(el)
      ).length === 0 &&
      Object.keys(props.form.touched).length !== 0
    ) {
      props.onClick({ index: 3 });
    } else {
      if (
        !props.form.touched.phone ||
        !props.form.touched.national_ID ||
        !props.form.touched.profLicenseNo ||
        !props.form.touched.specialization ||
        !props.form.touched.street ||
        !props.form.touched.city_id
      ) {
        setshowError(true);
        setTimeout(() => {
          setshowError(false);
        }, 1500);
      }
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 800);
    }
  };

  const prev = () => {
    props.onClick({ index: 1 });
  };

  return (
    <div
      className="w-100 d-flex flex-column align-items-center my-1"
      data-aos="fade-left"
    >
      <div className="d-flex flex-row align-items-center mb-5 w-100">
        <MDBIcon fas icon="phone-alt me-3" size="lg" />
        <div className="w-100 position-relative">
          <MDBInput
            label="Phone"
            id="phone"
            type="text"
            value={props.form.values.phone}
            onChange={props.form.handleChange}
            className={`${
              props.form.touched.phone &&
              props.form.errors.phone &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.phone && props.form.errors.phone && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.phone}
            </p>
          )}
        </div>
      </div>

      <div
        className={`d-flex align-items-center justify-content-strat w-100 ${styles.sectionTitle}`}
      >
        <div className={styles.elem}>
          <MDBIcon fas icon="user me-3" size="lg" /> <span>Identity</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center w-100 gap-1">
        <div className="p-md-3 text-black w-100">
          <div className="w-100 position-relative">
            <MDBInput
              label="National ID"
              type="text"
              size="lg"
              id="national_id"
              value={props.form.values.national_id}
              onChange={props.form.handleChange}
              className={`mb-2 ${
                props.form.touched.national_id &&
                props.form.errors.national_id &&
                styles.inputErr
              } `}
              onBlur={props.form.handleBlur}
            />
            {props.form.touched.national_id &&
              props.form.errors.national_id && (
                <p
                  className={`${styles.error} ${animate ? styles.animate : ""}`}
                >
                  {props.form.errors.national_id}
                </p>
              )}
          </div>
        </div>
      </div>
      {props.form.values.isDoctor && (
        <>
          <div className="d-flex flex-row align-items-center w-100 gap-1">
            <div className="p-md-3 text-black w-100">
              <div className="w-100 position-relative">
                <MDBInput
                  label="Profession License Number"
                  type="text"
                  size="lg"
                  id="profLicenseNo"
                  value={props.form.values.profLicenseNo}
                  onChange={props.form.handleChange}
                  className={`mb-2 ${
                    props.form.touched.profLicenseNo &&
                    props.form.errors.profLicenseNo &&
                    styles.inputErr
                  } `}
                  onBlur={props.form.handleBlur}
                />
                {props.form.touched.profLicenseNo &&
                  props.form.errors.profLicenseNo && (
                    <p
                      className={`${styles.error} ${
                        animate ? styles.animate : ""
                      }`}
                    >
                      {props.form.errors.profLicenseNo}
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-5 w-100 gap-1">
            <div className="p-md-3 text-black w-100">
              <div className="w-100 position-relative">
                <SpecializationSelect
                  value={props.form.values.specialization}
                  onChange={props.form.setFieldValue}
                  onBlur={props.form.setFieldTouched}
                  error={
                    props.form.touched.specialization &&
                    props.form.errors.specialization
                  }
                />
                {props.form.touched.specialization &&
                  props.form.errors.specialization && (
                    <p
                      className={`${styles.error} ${
                        animate ? styles.animate : ""
                      }`}
                    >
                      {props.form.errors.specialization}
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div
            className={`d-flex align-items-center justify-content-strat w-100 ${styles.sectionTitle}`}
          >
            <div className={styles.elem}>
              <MDBIcon fas icon="location-arrow me-3" size="lg" />{" "}
              <span>
                Address <span className="text-muted">(Clinic / Hospital)</span>
              </span>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center w-100 gap-1">
            <div className="p-md-3 text-black w-100">
              <div className="w-100 position-relative">
                <PlaceSelect
                  value={{
                    city_id: props.form.values.city_id,
                    district_id: props.form.values.district_id,
                  }}
                  onChange={props.form.setFieldValue}
                  onBlur={props.form.setFieldTouched}
                  error={
                    props.form.touched.city_id && props.form.errors.city_id
                      ? props.form.errors.city_id
                      : props.form.touched.district_id &&
                        props.form.errors.district_id
                      ? props.form.errors.district_id
                      : ""
                  }
                />
                {(props.form.touched.city_id ||
                  props.form.touched.district_id) &&
                  (props.form.errors.city_id ||
                    props.form.errors.district_id) && (
                    <p
                      className={`${styles.error} ${
                        animate ? styles.animate : ""
                      }`}
                    >
                      {props.form.errors.city_id ||
                        props.form.errors.district_id}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-5 w-100">
            <div className="p-md-3 text-black w-100">
              <div className="w-100 position-relative">
                <MDBInput
                  label="Street"
                  type="text"
                  size="lg"
                  id="street"
                  value={props.form.values.street}
                  onChange={props.form.handleChange}
                  className={` ${
                    props.form.touched.street &&
                    props.form.errors.street &&
                    styles.inputErr
                  } `}
                  onBlur={props.form.handleBlur}
                />
                {props.form.touched.street && props.form.errors.street && (
                  <p
                    className={`${styles.error} ${
                      animate ? styles.animate : ""
                    }`}
                  >
                    {props.form.errors.street}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={`d-flex flex-row align-items-center mb-4 justify-content-between w-100 ${styles.bttn}`}
      >
        <MDBBtn type="button" className="mb-4" size="lg" onClick={prev}>
          prev
        </MDBBtn>

        <div className="d-flex align-items-center gap-2 bttn">
          {/* <button type="button" className="btn btn-link mb-4" onClick={skip}>
            Skip Address
          </button>}*/}

          <MDBBtn type="button" className="mb-4" size="lg" onClick={next}>
            Next
          </MDBBtn>
        </div>
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

export default SecondStep;
