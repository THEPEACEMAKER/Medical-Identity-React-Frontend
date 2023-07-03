import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import DoctorsData from "../DoctorsData/DoctorsData";
import { DoctorsSlicing, responsive } from "../DoctorsSlicing/DoctorsSlicing";
import { useState } from "react";

function DoctorsCarousel() {
  const products = DoctorsSlicing();
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = products.map((item) => (
    <DoctorsData
      key={item.id}
      id={item.id}
      first_name={item.first_name}
      profileImgUrl={item.profileImgUrl}
      phone={item.phone}
      city={item.city}
      specialization={item.specialization}
    />
  ));

  const handleBeforeChange = (previousIndex, nextIndex) => {
    if (nextIndex === product.length - 1) {
      setTimeout(() => {
        setCurrentIndex(0);
      }, 3000);
    } else {
      setCurrentIndex(nextIndex);
    }
  };
  return (
    <div style={{ margin: "2rem 0" }}>
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
          color: "#1a202c",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#1a202c",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Our Doctors
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "2rem",
            color: "#6b7280",
          }}
        >
          Our team of doctors are highly qualified medical professionals with
          years of experience in their respective fields.
        </p>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Carousel
          showDots={true}
          responsive={responsive}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          beforeChange={handleBeforeChange}
          dotListClass="custom-dot-list-style"
        >
          {product}
        </Carousel>
      </div>
    </div>
  );
}

export default DoctorsCarousel;
