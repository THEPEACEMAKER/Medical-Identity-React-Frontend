import { useState } from "react";

import { MDBInput, MDBIcon, MDBBtn, MDBRow, MDBCol } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function SecondStep(props) {
  const [animate, setAnimate] = useState(false);
  const [showError, setshowError] = useState(false);

  const next = () => {
    if (
      Object.keys(props.form.errors).filter((el) =>
        ["address", "phone"].includes(el)
      ).length === 0 &&
      Object.keys(props.form.touched).length !== 0
    ) {
      props.onClick({ index: 3 });
    } else {
      console.log(props.form.touched.phone);
      if (!props.form.touched.phone) {
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

  // const skip = () => {
  //   props.onClick({ index: 3 });
  // };

  const prev = () => {
    props.onClick({ index: 1 });
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center my-1" data-aos="fade-left">
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
          <MDBIcon fas icon="location-arrow me-3" size="lg" />{" "}
          <span>
            Address <span className="text-muted">(optional)</span>
          </span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mb-5 w-100 gap-1">
        <div className="p-md-3 text-black">
          <MDBInput
            label="Street"
            type="text"
            size="lg"
            id="street"
            value={props.form.values.street}
            onChange={props.form.handleChange}
            className={`mb-4 ${
              props.form.touched.street &&
              props.form.errors.street &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.street && props.form.errors.street && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.street}
            </p>
          )}

          <MDBRow>
            <MDBCol md="6" className="mb-4">
              <MDBInput
                label="Building Number"
                type="text"
                size="lg"
                id="building_number"
                value={props.form.values.building_number}
                onChange={props.form.handleChange}
                className={`${
                  props.form.touched.building_number &&
                  props.form.errors.building_number &&
                  styles.inputErr
                } `}
                onBlur={props.form.handleBlur}
              />
              {props.form.touched.building_number &&
                props.form.errors.building_number && (
                  <p
                    className={`${styles.error} ${
                      animate ? styles.animate : ""
                    }`}
                  >
                    {props.form.errors.building_number}
                  </p>
                )}
            </MDBCol>
            <MDBCol md="6" className="mb-4">
              <MDBInput
                label="District"
                type="text"
                size="lg"
                id="district"
                value={props.form.values.district}
                onChange={props.form.handleChange}
                className={`${
                  props.form.touched.district &&
                  props.form.errors.district &&
                  styles.inputErr
                } `}
                onBlur={props.form.handleBlur}
              />
              {props.form.touched.district && props.form.errors.district && (
                <p
                  className={`${styles.error} ${animate ? styles.animate : ""}`}
                >
                  {props.form.errors.district}
                </p>
              )}
            </MDBCol>
          </MDBRow>

          <MDBInput
            label="Country	"
            type="text"
            size="lg"
            id="country"
            value={props.form.values.country}
            onChange={props.form.handleChange}
            className={`mb-4 ${
              props.form.touched.country &&
              props.form.errors.country &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.country && props.form.errors.country && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.country}
            </p>
          )}

          <MDBInput
            label="City"
            type="text"
            size="lg"
            id="city"
            value={props.form.values.city}
            onChange={props.form.handleChange}
            className={` mb-4 ${
              props.form.touched.city &&
              props.form.errors.city &&
              styles.inputErr
            } `}
            onBlur={props.form.handleBlur}
          />
          {props.form.touched.city && props.form.errors.city && (
            <p className={`${styles.error} ${animate ? styles.animate : ""}`}>
              {props.form.errors.city}
            </p>
          )}
        </div>
      </div>

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
