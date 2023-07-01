import Carousel from "react-bootstrap/Carousel";

import styles from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import DoctorCard from "../layout/DoctorCard/DoctorCard";
function Home() {
  return (
    <div className={`${styles.body}`}>
      {" "}
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
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + "assets/carousel-2.webp"}
                alt="Second slide"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + "assets/carousel-3.jpg"}
                alt="Third slide"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
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
            <MDBRow>
              <DoctorCard
                doctor={{
                  id: 10,
                  first_name: "Adel",
                  last_name: "Kenawy",
                  email: "adel@doctor.com",
                  date_of_birth: "2005-06-03",
                  phone: "01013552661",
                  national_id: "21232324243231",
                  profileImgUrl:
                    "image/upload/v1688068062/vv7drw0atyjwofhpufmx.webp",
                  gender: "male",
                  specialization: 2,
                  profLicenseNo: "221112",
                  city: 5,
                  district: 161,
                  address: null,
                }}
              />
              <DoctorCard
                doctor={{
                  id: 7,
                  first_name: "Adel",
                  last_name: "Kenawy",
                  email: "adel@doctor.com",
                  date_of_birth: "2005-06-03",
                  phone: "01013552661",
                  national_id: "21232324243231",
                  profileImgUrl:
                    "image/upload/v1688068062/vv7drw0atyjwofhpufmx.webp",
                  gender: "male",
                  specialization: 2,
                  profLicenseNo: "221112",
                  city: 5,
                  district: 161,
                  address: null,
                }}
              />
              <DoctorCard
                doctor={{
                  id: 7,
                  first_name: "Adel",
                  last_name: "Kenawy",
                  email: "adel@doctor.com",
                  date_of_birth: "2005-06-03",
                  phone: "01013552661",
                  national_id: "21232324243231",
                  profileImgUrl:
                    "image/upload/v1688068062/vv7drw0atyjwofhpufmx.webp",
                  gender: "male",
                  specialization: 2,
                  profLicenseNo: "221112",
                  city: 5,
                  district: 161,
                  address: null,
                }}
              />
              <DoctorCard
                doctor={{
                  id: 7,
                  first_name: "Adel",
                  last_name: "Kenawy",
                  email: "adel@doctor.com",
                  date_of_birth: "2005-06-03",
                  phone: "01013552661",
                  national_id: "21232324243231",
                  profileImgUrl:
                    "image/upload/v1688068062/vv7drw0atyjwofhpufmx.webp",
                  gender: "male",
                  specialization: 2,
                  profLicenseNo: "221112",
                  city: 5,
                  district: 161,
                  address: null,
                }}
              />
            </MDBRow>
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
