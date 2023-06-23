import { MDBInput, MDBIcon, MDBCol, MDBRow } from "mdb-react-ui-kit";

import styles from "./stylee.module.css";

function SecondStep({ formik }) {
  return (
    <div className="w-100 d-flex flex-column align-items-center my-1">
      <div className="d-flex flex-row align-items-center mb-5 w-100">
        <MDBIcon fas icon="phone-alt me-3" size="lg" />
        <div className="w-100 position-relative">
          <MDBInput
            label="Phone"
            id="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className={`${
              formik.touched.phone && formik.errors.phone && styles.inputErr
            } `}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className={`${styles.error} `}>{formik.errors.phone}</p>
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
            value={formik.values.street}
            onChange={formik.handleChange}
            className={`mb-4 ${
              formik.touched.street && formik.errors.street && styles.inputErr
            } `}
            onBlur={formik.handleBlur}
          />
          {formik.touched.street && formik.errors.street && (
            <p className={`${styles.error}`}>{formik.errors.street}</p>
          )}

          <MDBRow>
            <MDBCol md="6" className="mb-4">
              <MDBInput
                label="Building Number"
                type="text"
                size="lg"
                id="building_number"
                value={formik.values.building_number}
                onChange={formik.handleChange}
                className={`${
                  formik.touched.building_number &&
                  formik.errors.building_number &&
                  styles.inputErr
                } `}
                onBlur={formik.handleBlur}
              />
              {formik.touched.building_number &&
                formik.errors.building_number && (
                  <p className={`${styles.error} `}>
                    {formik.errors.building_number}
                  </p>
                )}
            </MDBCol>
            <MDBCol md="6" className="mb-4">
              <MDBInput
                label="District"
                type="text"
                size="lg"
                id="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                className={`${
                  formik.touched.district &&
                  formik.errors.district &&
                  styles.inputErr
                } `}
                onBlur={formik.handleBlur}
              />
              {formik.touched.district && formik.errors.district && (
                <p className={`${styles.error}`}>{formik.errors.district}</p>
              )}
            </MDBCol>
          </MDBRow>

          <MDBInput
            label="Country	"
            type="text"
            size="lg"
            id="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            className={`mb-4 ${
              formik.touched.country && formik.errors.country && styles.inputErr
            } `}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country && formik.errors.country && (
            <p className={`${styles.error}`}>{formik.errors.country}</p>
          )}

          <MDBInput
            label="City"
            type="text"
            size="lg"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            className={` mb-4 ${
              formik.touched.city && formik.errors.city && styles.inputErr
            } `}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city && (
            <p className={`${styles.error}`}>{formik.errors.city}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecondStep;
