import React, { useEffect } from "react";
import "./Updates.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

const Updates = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS animation
  }, []);

  return (
    <section className="updates">
      <div className="container">
        <div className="benefits_uptitle" data-aos="fade-down">
          Our Blog
        </div>
        <div className="benefits_title" data-aos="fade-down">
          Latest Updates
        </div>
        <div className="updates_items">
          <div className="first_item" data-aos="fade-right" data-aos-delay="100">
            <img className="blog_photo" src="/img/face.jpg" alt="Blog 1" />
            <div className="first_info">
              <div className="data">March 23, 2024 - Honey Bergson</div>
              <div className="first_uptitle">How to make the make-up stay last</div>
              <div className="first_title">
                Therapeutic aromatherapy can help bring balance both mentally and physically.
              </div>
            </div>
          </div>

          <div className="first_item" data-aos="fade-up" data-aos-delay="200">
            <img className="blog_photo" src="/img/foot.jpg" alt="Blog 2" />
            <div className="first_info">
              <div className="data">June 16, 2024 - Kitte Walker</div>
              <div className="first_uptitle">Tips to improve your body via cleansing</div>
              <div className="first_title">
                Whether you’re looking to de-stress, boost energy, or improve sleep.
              </div>
            </div>
          </div>

          <div className="first_item" data-aos="fade-left" data-aos-delay="300">
            <img className="blog_photo" src="/img/cucum.jpg" alt="Blog 3" />
            <div className="first_info">
              <div className="data">September 29, 2024 - Christina John</div>
              <div className="first_uptitle">Experience the beauty at our beauty spa</div>
              <div className="first_title">
                Enhance your massage or skin therapy with proprietary aromatherapy blends.
              </div>
            </div>
          </div>
        </div>
        <button className="stories" data-aos="zoom-in" data-aos-delay="400">
          <NavLink to="/blogs">View More Stories</NavLink>
        </button>
      </div>
    </section>
  );
};

export default Updates;
