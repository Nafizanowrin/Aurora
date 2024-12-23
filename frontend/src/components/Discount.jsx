import React, { useEffect, useState } from "react";
import "./Discount.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Feedback from "./Feedback";

const Discount = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/img/back11.jpg",
    "/img/back12.jpg",
    "/img/back13.jpg",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section
      className="discount"
      style={{
        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
      }}
    >
      <div className="container">
        <div className="discount_wrapper">
          {/* Left Section */}
          <div className="left_content" data-aos="fade-right">
            <div className="discount_uptitle">Flat Discount</div>
            <div className="discount_title">
              Claim up to 50% offer on the most popular services...
            </div>
            <div className="discount_text">
              Our Retreat is not meant to be an occasional treat, but rather a
              part of your routine that restores balance to your daily life.
            </div>
            <img
              className="discount_photo"
              src="/img/get_3.png"
              alt="Discount Offer"
            />
          </div>

          {/* Right Section */}
          <div className="right_content" data-aos="fade-left">
            <Feedback />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
