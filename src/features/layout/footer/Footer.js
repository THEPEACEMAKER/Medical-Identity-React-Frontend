import React from "react";
import "./footer.css";
import footerLogo from "../../../assets/logo2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <img src={footerLogo} alt="logo" className="footerImg" />
            <p className="parag">Comprehensive medical services that prioritize your well-being,
              offering personalized care and advanced treatments for a healthier life
            </p>

          </div>
          <div className="col-md-4 col-sm-6 full-height">
            <h2> Our Services</h2>
            <ul>
              <li><a href="#"> Dental Care </a></li>
              <li><a href="#"> Cardiac Clinic </a></li>
              <li><a href="#"> Massege Therapy </a></li>
              <li><a href="#"> Abmbulance Services </a></li>
            </ul>

          </div>
          <div className="col-md-4 col-sm-6">
            <h2>Subscribe</h2>
            <form>
              <input type="email" /><br></br>
              <button type="Submit">Subscribe now</button>
            </form>
            <ul className="social">
              <a href="#" ><FontAwesomeIcon icon={faSquareFacebook} beat size="2xl" /></a>
              <a href="#" ><FontAwesomeIcon icon={faInstagram} beat size="2xl" /></a>
              <a href="#" ><FontAwesomeIcon icon={faTwitter} beat size="2xl" /></a>
              <a href="#" ><FontAwesomeIcon icon={faLinkedin} beat size="2xl" /></a>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
