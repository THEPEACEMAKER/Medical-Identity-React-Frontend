import React from "react";

import "./fotter.css";
export default function App() {
  return (
    <div className="container-fluid bg-dark text-secondary">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-4">
            No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
            et dolor sed dolor. Rebum tempor no vero est magna amet no
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i> 123
            Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>{" "}
            info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i> +012 345 67890
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
              <div className="d-flex flex-column justify-content-start">
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Home
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Our Shop
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Shop Detail
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Shopping Cart
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Checkout
                </span>
                <span className="text-secondary">
                  <i className="fa fa-angle-right mr-2"></i> Contact Us
                </span>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
              <div className="d-flex flex-column justify-content-start">
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Home
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Our Shop
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Shop Detail
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Shopping Cart
                </span>
                <span className="text-secondary mb-2">
                  <i className="fa fa-angle-right mr-2"></i> Checkout
                </span>
                <span className="text-secondary">
                  <i className="fa fa-angle-right mr-2"></i> Contact Us
                </span>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
              <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
              <form action="">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email Address"
                  />
                  <button className="btn btn-primary w-50">Sign Up</button>
                </div>
              </form>
              <h6 className="text-secondary text-uppercase mt-4 mb-3">
                Follow Us
              </h6>
              <div className="d-flex">
                <span className="btn btn-primary btn-square">
                  <i className="fab fa-twitter"></i>
                </span>
                <span className="btn btn-primary btn-square">
                  <i className="fab fa-facebook-f"></i>
                </span>
                <span className="btn btn-primary btn-square">
                  <i className="fab fa-linkedin-in"></i>
                </span>
                <span className="btn btn-primary btn-square">
                  <i className="fab fa-instagram"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row border-top mx-xl-5 py-4"
        style={{ borderColor: "rgba(256, 256, 256, .1)" }}
      >
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-start text-secondary">
            &copy; <span className="text-primary">Domain</span>. All Rights
            Reserved. Designed by{" "}
            <span className="text-primary"> Ali Saad</span>
          </p>
        </div>

        <div className="col-md-6 px-xl-0  d-flex justify-content-center justify-content-md-end">
          <img
            className="img-fluid"
            src={process.env.PUBLIC_URL + "assets/payments.png"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
