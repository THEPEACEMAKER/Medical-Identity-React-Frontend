import Carousel from "react-bootstrap/Carousel";

import styles from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import DoctorCard from "../layout/DoctorCard/DoctorCard";
import DoctorsCarousel from "../doctors/DoctorsCarousel/DoctorsCarousel";
import headerImg from "../../assets/doctor1.png"
import PicOne from "../../assets/pic-1.jpg"
import PicTwo from "../../assets/pic-2.jpg"
import PicThree from "../../assets/pic-3.jpg"
import PicFour from "../../assets/pic-1.jpg"

function Home() {
  return (
    <div className={`${styles.body}`}>
      {" "}
      <div>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <h5>We Provide All Health Care Solutions</h5>
                <h2>Protect Your Health And Take Care To Your Health</h2>
                <h6>Our Expert Team is Here to Support You Every Step of the Way!</h6>
                <h6>Experience Personalized Care Tailored to Your Unique Needs</h6>
              </div>
              <div className="col-md-6 col-lg-6">
                <img src={headerImg} alt="doctor-1" />
              </div>
            </div>
          </div>
        </header>
        <header>
          <div class="container">
            <div class="row">
            <div className="col-md-4 col-lg-4">
                <Carousel className="align-self-stretch">
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src={PicOne}
                      alt="First slide"
                    />
                    <div
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    >
                    </div>
                  </Carousel.Item>
                  <Carousel.Item interval={500}>
                    <img
                      className="d-block w-100"
                      src={PicTwo}
                      alt="Second slide"
                    />
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    >
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={PicThree}
                      alt="Third slide"
                    />
                    <div
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    >
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
              <div class="col-md-8 col-lg-8">
                <h5>About Us</h5>
                <h2>The Great Place Of Medical Hospital Center</h2>
                <h6>Our Expert Team is Here to Support You Every Step of the Way!</h6>
              </div>
              
            </div>
          </div>
        </header>

      </div>
      <div className={`container-fluid py-5`}>
        <div className="d-flex gap-2 align-items-center">
          {
            // Carousel
          }
          <Carousel className="align-self-stretch">
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + "assets/carousel-1.webp"}
                alt="First slide"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Carousel.Caption>
                  <h3>Treatment</h3>
                  <p>
                    Advanced treatments and compassionate care
                    for your optimal health and well-being.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + "assets/surgy1.jpeg"}
                alt="Second slide"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Carousel.Caption>
                  <h3>Surgery</h3>
                  <p>
                    State-of-the-art surgical interventions,
                    guided by expertise and precision, to restore health and improve lives.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + "assets/vaccine.jpeg"}
                alt="Third slide"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Carousel.Caption>
                  <h3>Vaccine</h3>
                  <p>
                    Protect yourself and others with safe and effective vaccines,
                    safeguarding communities and promoting a healthier future.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + "assets/emergency.jpeg"}
                alt="Third slide"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Carousel.Caption>
                  <h3>Emergency</h3>
                  <p>
                    Rapid response to emergencies,
                    ensuring swift and effective healthcare solutions when time is critical.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          </Carousel>
          {
            // ofers top
          }
          <div className="col-md-4 ">
            <div
              className={`${styles.productOffer}`}
              style={{ height: "185px" }}
            >
              <img
                className="img-fluid"
                src={process.env.PUBLIC_URL + "assets/offer-1.jpg"}
                alt=""
              />
              <div className={styles.offerText}>
                <h6 className="text-white text-uppercase">Learn More</h6>
                <h3 className="text-white mb-3">Cardiology</h3>
                <span className="btn btn-primary">Find Doctors</span>
              </div>
            </div>
            <div
              className={`${styles.productOffer} mt-2`}
              style={{ height: "185px" }}
            >
              <img
                className="img-fluid"
                src={process.env.PUBLIC_URL + "assets/offer-2.jpg"}
                alt=""
              />
              <div className={styles.offerText}>
                <h6 className="text-white text-uppercase">Learn More</h6>
                <h3 className="text-white mb-3">Ocular oncology</h3>
                <span className="btn btn-primary">Find Doctors</span>
              </div>
            </div>
          </div>
        </div>

        {
          // penifits
        }

        <div className="container-fluid pt-5">
          <div className="row px-xl-5 pb-3">
            <div
              className="col-lg-3 col-md-6 col-sm-12 pb-1"
              data-aos="fade-up-right"
            >
              <div
                className="d-flex align-items-center bg-light mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-check text-primary m-0 mx-3"></h1>
                <h5 className="font-weight-semi-bold m-0">Accessible</h5>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12 pb-1"
              data-aos="fade-down-right"
            >
              <div
                className="d-flex align-items-center bg-light mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-history text-primary m-0 mx-2"></h1>
                <h5 className="font-weight-semi-bold m-0">Medical History</h5>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12 pb-1"
              data-aos="fade-down-left"
            >
              <div
                className="d-flex align-items-center bg-light mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fas fa-exchange-alt text-primary m-0 mx-3"></h1>
                <h5 className="font-weight-semi-bold m-0">Appointments</h5>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12 pb-1"
              data-aos="fade-up-left"
            >
              <div
                className="d-flex align-items-center bg-light mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-phone-volume text-primary m-0 mx-3"></h1>
                <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
              </div>
            </div>
          </div>
        </div>

        {
          // Doctors
        }

        <div className="container-fluid pt-5">
          <h2
            className={`${styles.sectionTitle} position-relative text-uppercase mx-xl-5 mb-4`}
            data-aos="fade-right"
          >
            <span className="p-3 ps-0">Doctors</span>
          </h2>

          <MDBContainer fluid className="my-5 text-center">
            <DoctorsCarousel />
          </MDBContainer>

          <div className="row px-xl-5 pb-3">
            {/* {categories.map((category) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 p-2"
                key={category.id}
                data-aos="zoom-in-up"
              >
                <Link
                  to={`/category/${category.id}`}
                  className="text-decoration-none bg-light"
                >
                  <div
                    className={`${styles.catItem} d-flex align-items-center`}
                  >
                    <div
                      className="overflow-hidden d-flex align-items-center"
                      style={{
                        width: "140px",
                        height: "100px",
                        padding: "8px",
                      }}
                    >
                      <img
                        className="img-fluid"
                        src={`https://res.cloudinary.com/ddk98mjzn/${category.image}`}
                        alt=""
                      />
                    </div>
                    <div className="flex-fill mx-1">
                      <h6>{category.name}</h6>
                      <small className="text-body">100 Products</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))} */}
          </div>
        </div>

        {
          // FEATURED PRODUCTS<
        }

        <div className="container-fluid pt-5">
          <h2
            className={`${styles.sectionTitle} position-relative text-uppercase mx-xl-5 mb-4`}
            data-aos="fade-right"
          >
            <span className="p-3 ps-0">Departments</span>
          </h2>
          <div className="row px-xl-5"></div>
        </div>

        {
          // offers
        }

        <div className="container-fluid pt-5 pb-3">
          <div className="row px-xl-5">
            <div className="col-md-6" data-aos="zoom-out-right">
              <div
                className={`${styles.productOffer}`}
                style={{ height: "300px" }}
              >
                <img
                  className="img-fluid"
                  src={process.env.PUBLIC_URL + "assets/offer-1.jpg"}
                  alt=""
                />
                <div className={styles.offerText}>
                  <h6 className="text-white text-uppercase">Learn More</h6>
                  <h3 className="text-white mb-3">Cardiology</h3>
                  <span className="btn btn-primary">Find Doctors</span>
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="zoom-out-left">
              <div
                className={`${styles.productOffer}`}
                style={{ height: "300px" }}
              >
                <img
                  className="img-fluid"
                  src={process.env.PUBLIC_URL + "assets/offer-2.jpg"}
                  alt=""
                />
                <div className={styles.offerText}>
                  <h6 className="text-white text-uppercase">Learn More</h6>
                  <h3 className="text-white mb-3">Ocular oncology</h3>
                  <span className="btn btn-primary">Find Doctors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          // RECENT COLLABORATIONS
        }

        <div className="container-fluid pt-5">
          <h2
            className={`${styles.sectionTitle} position-relative text-uppercase mx-xl-5 mb-4`}
            data-aos="fade-right"
          >
            <span className="p-3 ps-0">RECENT COLLABORATIONS</span>
          </h2>
          <div className="row px-xl-5"></div>
        </div>

        {
          // vendor
        }
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          data-aos="flip-down"
          data-aos-duration="1500"
        >
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-1.png"}
                alt=""
                className="m-auto"
                style={{ width: "200px", height: "150px" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-2.png"}
                alt="image1"
                className="m-auto"
                style={{ width: "200px", height: "150px" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-3.jpg"}
                alt="image2"
                className="m-auto"
                style={{ width: "200px", height: "150px" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-4.jpg"}
                alt="image3"
                className="m-auto"
                style={{ width: "200px", height: "150px" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-5.jpg"}
                alt="image4"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-6.jpg"}
                alt="image5"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4 ">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-7.jpg"}
                alt="image6"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-light p-4">
              <img
                src={process.env.PUBLIC_URL + "assets/vendor-8.jpg"}
                alt="image7"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
